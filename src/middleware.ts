import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Check if environment variables are set
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If environment variables are missing, skip auth checks but allow routing
  // This prevents middleware from crashing and causing NOT_FOUND errors
  if (!supabaseUrl || !supabaseAnonKey) {
    // In production, log a warning but don't block requests
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "Supabase environment variables are missing. Authentication features will be disabled."
      );
    }
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Protect dashboard and enhance routes
    if (
      (request.nextUrl.pathname.startsWith("/dashboard") ||
        request.nextUrl.pathname.startsWith("/enhance")) &&
      !user
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    // Redirect authenticated users away from auth pages
    if (
      (request.nextUrl.pathname.startsWith("/auth/login") ||
        request.nextUrl.pathname.startsWith("/auth/signup")) &&
      user
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch (error) {
    // If Supabase client creation or auth check fails, log error but don't block routing
    console.error("Middleware error:", error);
    // Return the response to allow the request to proceed
    // This prevents middleware failures from causing NOT_FOUND errors
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
