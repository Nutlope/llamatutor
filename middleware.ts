import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  let country = req.geo?.country;
  // Temporarily blocking traffic from India since I'm seeing abuse from there.
  if (country === "IN") {
    return new NextResponse("Access Denied", { status: 403 });
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Optionally, specify paths to apply the middleware
export const config = {
  matcher: "/:path*", // Apply to all routes
};
