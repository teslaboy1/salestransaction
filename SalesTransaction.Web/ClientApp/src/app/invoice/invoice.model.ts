export interface MvInvoiceDetail {
    invoiceId: number;
    customerId: number;
    customerName: string;
    amount: number;
    amountAfterDiscount: number;
    insertDate: Date;
  }

export interface MvInvoiceDescription{
    salesTransactionId: number;
    productName: string;
    quantity: number;
    rate: number;
    totalAmount: number;
    invoiceId: number;
  }