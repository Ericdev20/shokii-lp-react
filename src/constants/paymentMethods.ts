export interface PaymentMethod {
  id: string;
  name: string;
  logoClass: string;
  logoContent: string; // HTML/text for the logo
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'mtn',
    name: 'MTN Mobile Money',
    logoClass: 'kiss-form__method-logo--mtn',
    logoContent: 'MTN',
  },
  {
    id: 'moov',
    name: 'Moov Money',
    logoClass: 'kiss-form__method-logo--moov',
    logoContent: 'Moov',
  },
  {
    id: 'wave',
    name: 'Wave',
    logoClass: 'kiss-form__method-logo--wave',
    logoContent: '<i class="fa-solid fa-water"></i>',
  },
  {
    id: 'card',
    name: 'Carte bancaire',
    logoClass: 'kiss-form__method-logo--card',
    logoContent: '<i class="fa-solid fa-credit-card"></i>',
  },
];
