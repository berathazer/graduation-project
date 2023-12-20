import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/cart",
        "/categories/:path*",
        "/courses/:path*",
        "/setup-profile",
        "/search:path*",
        "/api/uploadthing:path*",
        "/basket:path*",
        "/deneme",
        "/api/profile/setup",
        "/instructor/:path*",
        "/api/webhook"
    ], debug: false,

});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
