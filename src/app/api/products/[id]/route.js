import { connectToDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const id = params.id?.trim();

  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ message: "Invalid product ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = await connectToDB();
  const db = client.db("testDBUser");
  const collection = db.collection("products");

  const product = await collection.findOne({ _id: new ObjectId(id) });

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
}
