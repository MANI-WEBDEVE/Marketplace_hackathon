import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const data = await client.fetch(`
            *[_type=="products"][0..3]{
           _id,
           name,
           price,
           "imageUrl" : image.asset->url,
           category,
           discountPercent,
          
         }
             `);
    return NextResponse.json({data, status:200,message:"Success"});
  } catch (err) {
    return NextResponse.json({ error: err, status: 500 });
  }
};
