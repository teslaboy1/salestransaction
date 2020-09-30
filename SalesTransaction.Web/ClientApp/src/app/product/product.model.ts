export interface MvProduct {
    productId: number;
    productName: string;
    quantityAvailable: number;
    actualPrice: number;
    startDate: Date;
    endDate: Date;
    manufactureDate: Date;
    expiryDate: Date;
}

export interface MvAddProduct {
    productName: string;
    quantityAvailable: number;
    actualPrice: number;
    startDate: Date;
    endDate: Date;
    manufactureDate: Date;
    expiryDate: Date;

}
