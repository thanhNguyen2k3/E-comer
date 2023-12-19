import { db } from '@/lib/db';
import CharacterData from '@/components/client/admin/CharacterData';

const Page = async () => {
    const characters = await db.character.findMany();

    return <CharacterData characters={characters} />;
};

export default Page;
