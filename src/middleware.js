import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/add-products/:path*",
    "/manage-products/:path*",
    "/feed/:path*",
  ],
};
