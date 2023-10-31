import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';

export const config = {
    api: {
        bodyParser: false,
    },
};

export const POST = async (req: NextRequest) => {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;
    if (!file) {
        return NextResponse.json({ message: 'image not found', success: false });
    }
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    const path = `./public/uploads/${file.name}`;

    await writeFile(path, buffer);

    return NextResponse.json({ message: 'Success', success: true });
};
