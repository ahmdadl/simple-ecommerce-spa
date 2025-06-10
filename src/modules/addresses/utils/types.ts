export type GovernmentEntity = {
    id: string;
    title: string;
    shipping_fees: number;
};

export type CityEntity = {
    id: string;
    government_id: string;
    title: string;
};

export type AddressEntity = {
    id: string;
    user_id: string;
    government_id: string;
    city_id: string;
    first_name: string;
    last_name: string;
    title: string;
    address: string;
    email: string;
    phone: string;
    government: GovernmentEntity;
    city: CityEntity;
    is_default: boolean;
};
