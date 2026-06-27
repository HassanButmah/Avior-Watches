export function toCurrency(value: number, currency: 'USD' | 'ILS' = 'USD') {
  const locale = currency === 'ILS' ? 'he-IL' : 'en-US';
  const digits = currency === 'ILS' ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: digits,
  }).format(value);
}

