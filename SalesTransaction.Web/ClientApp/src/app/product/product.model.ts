export interface MvProduct {
    productId: number;
    productName: string;
    quantityAvailable: number;
    marketPrice: number;
    startDate: Date;
    endDate: Date;
    manufactureDate: Date;
    expiryDate: Date;
}

export interface MvAddProduct {
    productName: string;
    quantityAvailable: number;
    marketPrice: number;
    startDate: Date;
    endDate: Date;
    manufactureDate: Date;
    expiryDate: Date;

}
