import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export const POST = async (request:Request, response:Response) => {
    try {
        const {id} = await request.json();

        const data = await client.fetch(`*[_type=="products" && _id=="${id}"]{
            _id,
            name,
            price,
            "imageUrl" : image.asset->url,
            category,
            discountPercent,
            description,
            sizes,
            colors,
        }[0]`);       


        return NextResponse.json({data, message:"success", status:200})
    } catch (error) {
        return NextResponse.json({error, message:"error", status:500})
    }
}