import { connectToDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  let id = params.id?.trim();

  // Remove trailing slash if present
  if (id.endsWith("/")) {
    id = id.slice(0, -1);
  }

  // Validate ID format
  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ message: "Invalid product ID format" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const client = await connectToDB();
    const db = client.db("testDBUser");
    const collection = db.collection("products");

    let product = await collection.findOne({ _id: new ObjectId(id) });

    // Fallback: try string _id if ObjectId fails
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
