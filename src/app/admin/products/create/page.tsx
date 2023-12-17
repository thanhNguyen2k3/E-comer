import CreateProduct from '@/components/admin/form/product/Create';
import { db } from '@/lib/db';

const Page = async () => {
    const categories = await db.category.findMany();
    const characters = await db.character.findMany();

    const regions = await db.region.findMany();
    const weapons = await db.weapon.findMany();
    const visions = await db.vision.findMany();

    return (
        <CreateProduct
            categories={categories}
            characters={characters}
            regions={regions}
            weapons={weapons}
            visions={visions}
        />
    );
};

export default Page;
