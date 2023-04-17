import { Manufacturer } from "./manufacturer.model";

export interface Product {
    id: string,
    title: string,
    product_image: string,
    price: number,
    ref: string,
    description: string,
    category: string,
    manufacturer: string;
    rating: number
}