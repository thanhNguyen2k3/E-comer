import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

declare global {
    // eslint-disable-next-line no-var, no-unused-vars
    var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}

export const db = prisma;

db.$use(async (params, next) => {
    if (
        (params.action === 'create' || params.action === 'update') &&
        ['Product', 'Category', 'Brand'].includes(params.model!)
    ) {
        let {
            args: { data },
        } = params;
        // Check if slug exists by `findUnique` (did not test)
        data.slug = slugify(`${data.name}`, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
    }

    const result = await next(params);
    return result;
});
