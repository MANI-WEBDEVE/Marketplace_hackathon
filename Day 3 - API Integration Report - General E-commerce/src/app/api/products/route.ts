import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await client.fetch(`
   *[_type=="products"]{
  _id,
  name,
  price,
  "imageUrl" : image.asset->url,
  category,
  discountPercent,
  "isNew": new,
  
}
    `);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
