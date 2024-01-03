import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,

});

const prompt = "Açıklama maksimum 400 kelimeden oluşsun, açıklama türkçe olsun, ve cevap olarak sadece kursun açıklamasını geriye döndür."


export const POST = async (req: NextRequest) => {

    try {
        const { content } = await req.json();

        if (!content) {
            return new NextResponse(JSON.stringify({ error: "Content not found!" }), { status: 404 })
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "content": `${content} ${prompt}`
                }
            ],
            n: 1,
            temperature: 0.8,
            max_tokens: 500,
            top_p: 1,
        });

        const generatedDescription = response.choices[0].message.content?.trim()


        return new NextResponse(JSON.stringify({ description: generatedDescription, message: "Başarılı" }), { status: 200 });


    } catch (error: any) {
        console.log("chatgpt error: ", error.message);

        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });

    }


}