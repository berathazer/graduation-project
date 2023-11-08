import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
    publicRoutes: [
        "/",
        "/cart",
        "/categories/:path*",
        "/courses/:path*",
        "/setup-profile",
        "/search:path*",
        "/api/uploadthing:path*",
        "/basket:path*"
    ],
});



export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
