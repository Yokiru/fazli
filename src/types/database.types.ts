export interface Project {
    id: number;
    created_at: string;
    title: string;
    category: string;
    image_url: string;
    like_count: number;
}

export interface Tool {
    id: number;
    created_at: string;
    name: string;
    category: string;
    image_url: string;
}

export interface Service {
    id: number;
    created_at: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    features: string[];
}

export interface Experience {
    id: number;
    created_at: string;
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface SiteAsset {
    key: string;
    image_url: string;
    alt_text: string | null;
}
