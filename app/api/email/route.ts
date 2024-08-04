import { render } from "@react-email/components";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export const POST = async (req: NextRequest) => {
    const { name, subject, message, email } = await req.json();

    const transporter = nodemailer.createTransport({
        host: 'smtp.forwardemail.net',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            subject: subject,
            from: email,
            text: message,
            to: process.env.GMAIL_USER,
            html: `<div><p>${name}</p></div>`
        });

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
};
