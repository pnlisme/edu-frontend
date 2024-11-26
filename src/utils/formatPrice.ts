export function formatPrice(
  price: number,
  locale: string = 'vi-VN',
  currency: string = 'VND'
): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price)
}
