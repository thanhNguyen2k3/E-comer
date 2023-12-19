import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { Resend } from 'resend';
import ShopReceiptEmail from '@/components/component/SendEmail';
import { ExtandOrder } from '@/types/extend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
    try {
        const session = await getAuthSession();
        const body = await req.json();
        const { orderId, orderItems } = body;

        if (!session) {
            return NextResponse.json({ message: 'User not found' }, { status: 403 });
        }

        await resend.emails.send({
            from: `Shop Genshin Global Contact <onboarding@resend.dev>`,
            to: session.user.email!,
            subject: 'Hello World',
            reply_to: 'thanhntph21000@fpt.edu.vn',
            react: ShopReceiptEmail({
                orderId: orderId as string,
                order: orderItems as ExtandOrder,
            }),
        });

        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify(error.message), { status: 400 });
    }
};
