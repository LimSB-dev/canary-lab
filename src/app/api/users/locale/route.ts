import { auth } from "@/auth";
import { sql } from "@vercel/postgres";

const ALLOWED_LOCALES = ["ko", "en"] as const;

/**
 * 로그인한 사용자의 locale을 DB에 저장합니다.
 * PUT body: { locale: "ko" | "en" }
 */
export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { locale?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const locale = body.locale;
  if (!locale || !ALLOWED_LOCALES.includes(locale as (typeof ALLOWED_LOCALES)[number])) {
    return new Response(JSON.stringify({ error: "locale must be 'ko' or 'en'" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await sql`
      UPDATE users SET locale = ${locale}
      WHERE email = ${session.user.email.trim()}
    `;
    return new Response(JSON.stringify({ ok: true, locale }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("updateUserLocale:", error);
    return new Response(JSON.stringify({ error: "Failed to update locale" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
