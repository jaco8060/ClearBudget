export async function onRequestPost() {
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      "Set-Cookie": "session_id=; HttpOnly; Path=/; Max-Age=0",
      "Content-Type": "application/json",
    },
  });
}
