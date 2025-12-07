import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are protected
const isProtectedRoute = createRouteMatcher(['/admin(.*)']);

// 1. Add 'async' here
export default clerkMiddleware(async (auth, req) => {
  // 2. Use 'await auth.protect()' (and remove the parentheses from auth if it's the object style, 
  // or use (await auth()).protect() if it's the function style. 
  // The safest modern syntax is below:
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};