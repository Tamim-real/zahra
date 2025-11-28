import { connectToDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  let id = params.id?.trim();

  // remove trailing slash if any
  if (id.endsWith("/")) {
    id = id.slice(0, -1);
  }

  const client = await connectToDB();
  const db = client.db("testDBUser");
  const collection = db.collection("products");

  let product = null;

  // First try with ObjectId
  if (ObjectId.isValid(id)) {
    product = await collection.findOne({ _id: new ObjectId(id) });
  }

  // Fallback: if product not found, try string _id
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
}
