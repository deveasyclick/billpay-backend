export interface PayObject {
  customerId: string;
  paymentCode: string;
  amount: number; // in kobo
  requestReference: string;
}
