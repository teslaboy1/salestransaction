export interface MvTransaction {
    transactionId: number;
    customerId: number;
    productId: number;
    quantity: number;
    rate: number;
    totalAmount: number;
}

export interface MvAddTransaction {
    customerId: number;
    productId: number;
    quantity: number;
    rate: number;
    totalAmount: number;
}