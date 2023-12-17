import { NextRequest, NextResponse } from 'next/server';
import fs, { writeFile } from 'fs/promises';
import { AxiosError } from 'axios';
import formidable from 'formidable';
import path from 'path';
import { NextApiRequest } from 'next';

export const config = {
    api: {
        bodyParser: false,
    },
};

// const readFile = (
//     req: NextApiRequest,
//     saveLocally?: boolean,
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//     const options: formidable.Options = {};
//     if (saveLocally) {
//         options.uploadDir = path.join(process.cwd(), '/public/images');
//         options.filename = (name, ext, path, form) => {
//             return Date.now().toString() + '_' + path.originalFilename;
//         };
//     }
//     options.maxFileSize = 4000 * 1024 * 1024;
//     const form = formidable(options);
//     return new Promise((resolve, reject) => {
//         form.parse(req, (err, fields, files) => {
//             if (err) reject(err);
//             resolve({ fields, files });
//         });
//     });
// };

export const POST = async (req: NextResponse) => {
    try {
        const data = await req.formData();
        const file: File | null = data.get('file') as unknown as File;
        if (!file) {
            return NextResponse.json({ message: 'image not found', success: false });
        }
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);

        const path = `./public/uploads/${file.name}`;

        await writeFile(path, buffer);

        return NextResponse.json({ url: file.name });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: (error as AxiosError).message }));
    }
};
