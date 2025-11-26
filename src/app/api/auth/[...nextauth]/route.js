import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await connectToDB();   
        const db = client.db("testDBUser");   
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password!");
        }

        // ✅ don't close client, keep connection alive
        return { email: user.email, name: user.name, id: user._id.toString() };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
