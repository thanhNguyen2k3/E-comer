import CharacterData from '@/components/client/admin/CharacterData';
import { db } from '@/lib/db';

const Page = async () => {
    const characters = await db.character.findMany({
        include: {
            region: true,
            vision: true,
            weapon: true,
        },
    });

    const visions = await db.vision.findMany();
    const weapons = await db.weapon.findMany();
    const regions = await db.region.findMany();

    return <CharacterData regions={regions} weapons={weapons} visions={visions} characters={characters} />;
};

export default Page;
