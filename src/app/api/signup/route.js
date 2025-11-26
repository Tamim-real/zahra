import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("testDBUser");

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashed,
      createdAt: new Date(),
    });

    return Response.json({ message: "User registered", userId: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error("Register error:", err);
    return Response.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
