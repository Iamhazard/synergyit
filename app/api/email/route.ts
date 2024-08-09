import { SendEmailDto } from "@/lib/mail";
import { NextRequest, NextResponse } from "next/server";



export const POST = async (req: NextRequest) => {
    const { name, subject, message, email } = await req.json();

    // const sender = {
    //     name: 'Synergy',
    //     address: 'info.synergyit@gmail.com'
    // }

    const recipients = [{
        name: name,
        address: email,
        subject: subject,
        message: message
    }]
    try {
        const result = await SendEmailDto({
            email: email,
            recipients,
            subject: subject,
            name: name,
            message: message,

        })
        console.log('Message sent: %s', result.messageId);

        return NextResponse.json({
            accepted: result.accepted,
            message: 'Email sent successfully'
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
};
