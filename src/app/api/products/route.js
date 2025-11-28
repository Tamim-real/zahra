import { connectToDB } from "@/lib/db";

export async function GET(req) {
  try {
    const client = await connectToDB();
    const db = client.db("testDBUser"); // your database name
    const products = await db.collection("products").find({}).toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch products" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req) {
  try {
    const client = await connectToDB();
    const db = client.db("testDBUser");

    const body = await req.json();
    const { title, shortDesc, price, imageUrl } = body;

    if (!title || !shortDesc || !price || !imageUrl) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newProduct = await db.collection("products").insertOne({
      title,
      shortDesc,
      price,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to add product" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
