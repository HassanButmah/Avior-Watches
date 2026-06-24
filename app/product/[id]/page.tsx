import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGallery from '@/components/product/ProductGallery';
import ProductSpecs from '@/components/product/ProductSpecs';
import ReviewsSection from '@/components/product/ReviewsSection';
import StickyPurchasePanel, { RelatedProducts } from '@/components/product/StickyPurchasePanel';
import { getWatchById, getRelatedWatches, watches } from '@/lib/watches';
import { env } from '@/lib/env';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return watches.map((watch) => ({ id: watch.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const watch = getWatchById(id);
  if (!watch) return { title: 'Product Not Found' };

  return {
    title: `${watch.name} | Avior Prestige`,
    description: watch.description,
    openGraph: {
      title: `${watch.name} | Avior Prestige`,
      description: watch.description,
      images: [{ url: `${env.NEXT_PUBLIC_SITE_URL}${watch.image}`, width: 600, height: 700, alt: watch.name }],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const watch = getWatchById(id);

  if (!watch) notFound();

  const related = getRelatedWatches(id);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1 pt-24 md:pt-28">
        <section className="px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <ProductGallery images={watch.images} name={watch.name} />
            <StickyPurchasePanel watch={watch} />
          </div>
        </section>

        <ProductSpecs specs={watch.specs} />
        <ReviewsSection reviews={watch.reviewList} rating={watch.rating} totalReviews={watch.reviews} />
        <RelatedProducts products={related} />
      </main>
      <Footer />
    </div>
  );
}
