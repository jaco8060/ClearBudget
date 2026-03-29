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

    // Look up user
    const stmt = env.DB.prepare("SELECT * FROM users WHERE username = ?");
    const { results } = await stmt.bind(username).all();
    
    if (results.length === 0 || results[0].password !== password) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    const userId = results[0].id;
    const sessionId = crypto.randomUUID();
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days

    // Create session
    await env.DB.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)")
      .bind(sessionId, userId, expiresAt)
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Set-Cookie": `session_id=${sessionId}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), { status: 500 });
  }
}
