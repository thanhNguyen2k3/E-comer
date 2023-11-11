import { Category, ExtraOption, Product } from '@prisma/client';

export type ExtandProduct = Product & {
    category: Category | null;
    extraOption: ExtraOption[];
};
