import {
    Category,
    Option,
    Order,
    Product,
    User,
    Character,
    Region,
    Vision,
    Weapon,
    GroupCharacter,
} from '@prisma/client';

export type ExtandProduct = Product & {
    quantity: number;
    category: Category | null;
    options: Option[];
    groupCharacter?: {
        character: Character & {
            region: Region;
            weapon: Weapon;
            vision: Vision;
        };
    }[];
};

export type ExtandOrder = Order & {
    orderItems: {
        product: Product;
        quantity: number;
        name: string;
    }[];
    user?: User;
};

export type ExtandCharacter = Character & {
    region: Region;
    vision: Vision;
    weapon: Weapon;
};
