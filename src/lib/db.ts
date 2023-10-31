import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

db.$use(async (params, next) => {
    if ((params.action === 'create' || params.action === 'update') && ['Product', 'Category'].includes(params.model!)) {
        let {
            args: { data },
        } = params;
        // Check if slug exists by `findUnique` (did not test)
        data.slug = slugify(`${data.name}`, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
    }

    const result = await next(params);
    return result;
});
