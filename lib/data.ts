import { promises as fs } from 'fs';
import path from 'path';
import { Pool } from 'pg';
import type { Product, Settings } from './types';

const dataDir = path.join(process.cwd(), 'data');
const productsPath = path.join(dataDir, 'products.json');
const settingsPath = path.join(dataDir, 'settings.json');
const databaseUrl = process.env.DATABASE_URL;

type DatabaseState = {
  pool: Pool | null;
  ready: Promise<Pool | null> | null;
};

const globalForDb = globalThis as typeof globalThis & {
  aviorDb?: DatabaseState;
};

const dbState: DatabaseState = globalForDb.aviorDb ?? { pool: null, ready: null };

if (!globalForDb.aviorDb) {
  globalForDb.aviorDb = dbState;
}

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

async function writeJson(filePath: string, data: unknown) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function toNumber(value: unknown) {
  return typeof value === 'number' ? value : Number(value);
}

function normalizeProduct(row: Record<string, unknown>): Product {
  return {
    id: Number(row.id),
    name: String(row.name),
    nameAr: String(row.name_ar ?? row.nameAr ?? ''),
    category: String(row.category),
    price: toNumber(row.price),
    image: String(row.image),
    description: String(row.description),
    descriptionAr: String(row.description_ar ?? row.descriptionAr ?? ''),
    features: Array.isArray(row.features)
      ? row.features.map((feature) => String(feature))
      : typeof row.features === 'string'
        ? JSON.parse(row.features)
        : [],
    inStock: Boolean(row.in_stock ?? row.inStock),
  };
}

function normalizeSettings(row: Record<string, unknown>): Settings {
  const announcementBar = row.announcementBar as
    | {
        enabled?: unknown;
        text?: unknown;
      }
    | undefined;

  return {
    whatsappNumber: String(row.whatsapp_number ?? row.whatsappNumber ?? ''),
    instagramHandle: String(row.instagram_handle ?? row.instagramHandle ?? ''),
    usdToIls: toNumber(row.usd_to_ils ?? row.usdToIls ?? 0),
    freeShippingThreshold: toNumber(row.free_shipping_threshold ?? row.freeShippingThreshold ?? 0),
    announcementBar: {
      enabled: Boolean(row.announcement_enabled ?? announcementBar?.enabled),
      text: String(row.announcement_text ?? announcementBar?.text ?? ''),
    },
  };
}

async function getSeedProducts() {
  return readJson<Product[]>(productsPath);
}

async function getSeedSettings() {
  return readJson<Settings>(settingsPath);
}

async function ensureTables(pool: Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      name_ar TEXT NOT NULL,
      category TEXT NOT NULL,
      price NUMERIC NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      description_ar TEXT NOT NULL,
      features JSONB NOT NULL DEFAULT '[]'::jsonb,
      in_stock BOOLEAN NOT NULL DEFAULT true
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY DEFAULT 1,
      whatsapp_number TEXT NOT NULL,
      instagram_handle TEXT NOT NULL,
      usd_to_ils NUMERIC NOT NULL,
      free_shipping_threshold NUMERIC NOT NULL,
      announcement_enabled BOOLEAN NOT NULL DEFAULT true,
      announcement_text TEXT NOT NULL
    );
  `);
}

async function seedFromFiles(pool: Pool) {
  const [{ rowCount: productCount }, { rowCount: settingsCount }] = await Promise.all([
    pool.query('SELECT 1 FROM products LIMIT 1'),
    pool.query('SELECT 1 FROM settings LIMIT 1'),
  ]);

  if (!productCount) {
    const products = await getSeedProducts();
    for (const product of products) {
      await pool.query(
        `INSERT INTO products
         (id, name, name_ar, category, price, image, description, description_ar, features, in_stock)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10)
         ON CONFLICT (id) DO NOTHING`,
        [
          product.id,
          product.name,
          product.nameAr,
          product.category,
          product.price,
          product.image,
          product.description,
          product.descriptionAr,
          JSON.stringify(product.features),
          product.inStock,
        ]
      );
    }
  }

  if (!settingsCount) {
    const settings = await getSeedSettings();
    await pool.query(
      `INSERT INTO settings
       (id, whatsapp_number, instagram_handle, usd_to_ils, free_shipping_threshold, announcement_enabled, announcement_text)
       VALUES (1, $1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO NOTHING`,
      [
        settings.whatsappNumber,
        settings.instagramHandle,
        settings.usdToIls,
        settings.freeShippingThreshold,
        settings.announcementBar.enabled,
        settings.announcementBar.text,
      ]
    );
  }
}

async function getPool() {
  if (!databaseUrl) return null;
  if (dbState.pool) return dbState.pool;
  if (!dbState.ready) {
    dbState.ready = (async () => {
      try {
        const pool = new Pool({ connectionString: databaseUrl });
        await pool.query('SELECT 1');
        await ensureTables(pool);
        await seedFromFiles(pool);
        dbState.pool = pool;
        return pool;
      } catch {
        dbState.pool = null;
        return null;
      }
    })();
  }
  return dbState.ready;
}

async function withPool<T>(handler: (pool: Pool) => Promise<T>): Promise<T | null> {
  const pool = await getPool();
  if (!pool) return null;
  try {
    return await handler(pool);
  } catch {
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  const rows = await withPool(async (pool) => {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    return result.rows.map((row) => normalizeProduct(row));
  });

  if (rows) return rows;
  return readJson<Product[]>(productsPath);
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const product = await withPool(async (pool) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1 LIMIT 1', [id]);
    return result.rows[0] ? normalizeProduct(result.rows[0]) : undefined;
  });

  if (product !== null && product !== undefined) return product;
  const products = await readJson<Product[]>(productsPath);
  return products.find((item) => item.id === id);
}

export async function saveProducts(products: Product[]) {
  const result = await withPool(async (pool) => {
    await pool.query('BEGIN');
    try {
      await pool.query('DELETE FROM products');
      for (const product of products) {
        await pool.query(
          `INSERT INTO products
           (id, name, name_ar, category, price, image, description, description_ar, features, in_stock)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10)`,
          [
            product.id,
            product.name,
            product.nameAr,
            product.category,
            product.price,
            product.image,
            product.description,
            product.descriptionAr,
            JSON.stringify(product.features),
            product.inStock,
          ]
        );
      }
      await pool.query('COMMIT');
      return true;
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }
  });

  if (result) return;
  await writeJson(productsPath, products);
}

export async function getSettings(): Promise<Settings> {
  const settings = await withPool(async (pool) => {
    const result = await pool.query('SELECT * FROM settings WHERE id = 1 LIMIT 1');
    return result.rows[0] ? normalizeSettings(result.rows[0]) : null;
  });

  if (settings) return settings;
  return readJson<Settings>(settingsPath);
}

export async function saveSettings(settings: Settings) {
  const result = await withPool(async (pool) => {
    await pool.query(
      `INSERT INTO settings
       (id, whatsapp_number, instagram_handle, usd_to_ils, free_shipping_threshold, announcement_enabled, announcement_text)
       VALUES (1, $1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE SET
         whatsapp_number = EXCLUDED.whatsapp_number,
         instagram_handle = EXCLUDED.instagram_handle,
         usd_to_ils = EXCLUDED.usd_to_ils,
         free_shipping_threshold = EXCLUDED.free_shipping_threshold,
         announcement_enabled = EXCLUDED.announcement_enabled,
         announcement_text = EXCLUDED.announcement_text`,
      [
        settings.whatsappNumber,
        settings.instagramHandle,
        settings.usdToIls,
        settings.freeShippingThreshold,
        settings.announcementBar.enabled,
        settings.announcementBar.text,
      ]
    );
    return true;
  });

  if (result) return;
  await writeJson(settingsPath, settings);
}

export function toCurrency(value: number, currency: 'USD' | 'ILS' = 'USD') {
  const locale = currency === 'ILS' ? 'he-IL' : 'en-US';
  const digits = currency === 'ILS' ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: digits,
  }).format(value);
}

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/gi, '-')
    .replace(/^-+|-+$/g, '');
}
