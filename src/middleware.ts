// import { NextRequest } from "next/server";
// import { getSessionCookie } from "better-auth";

// export async function middleware(request: NextRequest) {
// TODO: Maybe ask the discord why this is not in the latest version
//   const sessionCookie = getSessionCookie(request);
//   if (!sessionCookie) {
//     return NextResponse.redirect(
//       new URL("/brains/get-started", request.nextUrl)
//     );
//   }
// }

export async function middleware() {
  // TODO: Maybe ask the discord why this is not in the latest version
  //   const sessionCookie = getSessionCookie(request);
  //   if (!sessionCookie) {
  //     return NextResponse.redirect(
  //       new URL("/brains/get-started", request.nextUrl)
  //     );
  //   }
}
// export const config = {
//   matcher: ["/brains"],
// };

// See docs if full session is needed
// https://www.better-auth.com/docs/integrations/next

// Example of how to redirect to the get-started page if the user is not logged in
// if (request.nextUrl.pathname.startsWith("/brains")) {
//     return NextResponse.redirect(new URL("/brains/get-started", request.nextUrl))
// }
// if (request.nextUrl.pathname === "/brains") {
//     return NextResponse.redirect(new URL("/brains/get-started", request.nextUrl))
// }
