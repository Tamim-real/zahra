import { connectToDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  // CRITICAL FIX: params ke await korte hobe
  const resolvedParams = await params; 
  let id = resolvedParams.id?.trim();

  if (!id) {
    return new Response(JSON.stringify({ message: "ID is required" }), { status: 400 });
  }

  if (id.endsWith("/")) id = id.slice(0, -1);

  try {
    const client = await connectToDB();
    const db = client.db("testDBUser");
    const collection = db.collection("products");

    let product = null;

    // 1. Try ObjectId first
    if (ObjectId.isValid(id)) {
      product = await collection.findOne({ _id: new ObjectId(id) });
    }

    // 2. Fallback if stored as string
    if (!product) {
      product = await collection.findOne({ _id: id });
    }

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}