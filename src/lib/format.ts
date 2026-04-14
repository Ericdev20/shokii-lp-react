export function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatPrice(price: number): string {
  return `${formatNumber(price)} FCFA`;
}
