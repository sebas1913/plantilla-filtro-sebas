export interface Product {
    id: number;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string,
    rating: Rating;
    isLiked: boolean
}

export interface Rating{
    rate: number,
    count: 120
}