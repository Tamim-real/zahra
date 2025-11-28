import { connectToDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid product ID" }), { status: 400 });
    }

    const client = await connectToDB();
    const db = client.db("testDBUser"); // your DB name
    const collection = db.collection("products");

    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to fetch product" }), { status: 500 });
  }
}
