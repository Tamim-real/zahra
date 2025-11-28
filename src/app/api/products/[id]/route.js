import { connectToDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  let id = params.id?.trim();
  if (id?.endsWith("/")) id = id.slice(0, -1);

  try {
    const client = await connectToDB();
    const db = client.db("testDBUser");
    const collection = db.collection("products");

    let product = null;

    // Try ObjectId first
    if (ObjectId.isValid(id)) {
      product = await collection.findOne({ _id: new ObjectId(id) });
    }

    // Fallback if stored as string
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
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
