export interface EventCardProps {
    id: number;
    title: Title;
    coins: Coin[];
    date_event: string; // ISO 8601 format
    can_occur_before: boolean;
    created_date: string; // ISO 8601 format
    displayed_date: string; // Human-readable date
    description: Description;
    percentage: number;
    is_hot: boolean;
    hot_index: number;
    categories: Category[];
    alert_count: number;
    original_source: string; // URL
    proof: string; // URL
    source: string; // URL
    onClick?: (id: number) => void;
    categoryId?: number;
}

export interface Title {
    en: string;
}

export interface Coin {
    id: string;
    name: string;
    rank: number;
    symbol: string;
    fullname: string;
}

export interface Description {
    en: string;
}

export interface Category {
    id: number;
    name: string;
}
