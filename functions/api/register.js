export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    if (!env || !env.DB) {
      return new Response(JSON.stringify({ error: "Database not connected. Please bind 'DB' in Cloudflare Dashboard." }), { status: 500 });
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(JSON.stringify({ error: "Username and password required" }), { status: 400 });
    }

    const userId = crypto.randomUUID();

    await env.DB.prepare("INSERT INTO users (id, username, password) VALUES (?, ?, ?)")
      .bind(userId, username, password)
      .run();

    // initialize earnings
    await env.DB.prepare("INSERT INTO earnings (user_id, amount) VALUES (?, 0)")
      .bind(userId)
      .run();

    return new Response(JSON.stringify({ success: true, message: "User registered" }));
  } catch (err) {
    if (err.message && err.message.includes("UNIQUE constraint failed")) {
      return new Response(JSON.stringify({ error: "Username might already be taken" }), { status: 400 });
    }
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), { status: 500 });
  }
}
