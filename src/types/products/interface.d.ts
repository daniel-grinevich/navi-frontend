export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    options?: {
        size?: Size[];
        milk?: Milk[];
        flavors?: Flavor[];
        temperature?: Temperature[];
    };
}

interface Size {
    id: number; // Unique identifier
    name: string;
}

interface Milk {
    id: number; // Unique identifier
    name: string;
}

interface Flavor {
    id: number; // Unique identifier
    name: string;
}

interface Temperature {
    id: number; // Unique identifier
    name: string;
}

export interface TempProduct {

    id:number,
    name:string,
    description:string,
    price:number,
    region:string,
    weight:number,
    flavor_profile:[],
    grind_option:[],
    roast_level:number,
    image_url: string,
}