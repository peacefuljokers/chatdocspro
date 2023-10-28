import { authMiddleware } from "@clerk/nextjs";
//added for CSP
import { NextRequest, NextResponse } from 'next/server';


function middleware(request: NextRequest) {
  
  //const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const nonce = crypto.randomUUID();
  const cspHeader = `

    default-src 'self' 'unsafe-inline' 'unsafe-eval' https://elegant-ferret-44.clerk.accounts.dev/ https://chatdocspro.s3.ap-southeast-1.amazonaws.com/;
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://elegant-ferret-44.clerk.accounts.dev/ https://clerk.chatdocspro.com/;
    style-src 'self' 'unsafe-inline';
    frame-src https://docs.google.com/;
    worker-src blob:;
    img-src 'self' https://img.clerk.com/;
  `;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set(
    'Content-Security-Policy',
    // Replace newline characters and spaces
    cspHeader.replace(/\s{2,}/g, ' ').trim()
  );

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  });
}



// This example protects all routes including api/trpc
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return middleware(req); //to add CSP above
  },
 
  publicRoutes: ["/", "/api/webhook"],
  //middleware: [middleware], // Add the middleware function here
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],

};
