export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Allow login and register endpoints to bypass auth
  if (url.pathname === '/api/login' || url.pathname === '/api/register' || url.pathname === '/api/logout') {
    return next();
  }

  // Only protect /api/ routes
  if (url.pathname.startsWith('/api/')) {
    const cookieHeader = request.headers.get('Cookie') || '';
    const match = cookieHeader.match(/session_id=([^;]+)/);
    const sessionId = match ? match[1] : null;

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
      // Verify session
      const stmt = env.DB.prepare('SELECT user_id FROM sessions WHERE id = ? AND expires_at > ?');
      const { results } = await stmt.bind(sessionId, Date.now()).all();

      if (!results || results.length === 0) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }

      // Pass user_id to downstream functions
      context.data = context.data || {};
      context.data.userId = results[0].user_id;

    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }

  return next();
}
