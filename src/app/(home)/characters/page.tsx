import CharacterCardItem from '@/components/component/CharacterCardItem';

import { db } from '@/lib/db';

const Page = async () => {
    const characters = await db.character.findMany({
        include: {
            region: true,
            vision: true,
            weapon: true,
        },
    });

    return (
        <div className="grid  mt-4 grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-1.5">
            {characters.map((character) => (
                <CharacterCardItem key={character.id} character={character} />
            ))}
        </div>
    );
};

export default Page;
