export async function onRequestGet(context) {
  const { env, data } = context;
  const { userId } = data;
  const { results } = await env.DB.prepare('SELECT amount FROM earnings WHERE user_id = ?').bind(userId).all();
  return Response.json({ amount: results[0]?.amount || 0 });
}

export async function onRequestPut(context) {
  const { env, request, data } = context;
  const { userId } = data;
  const { amount } = await request.json();
  
  await env.DB.prepare(
    'INSERT INTO earnings (user_id, amount) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET amount = EXCLUDED.amount'
  ).bind(userId, amount).run();
  
  return Response.json({ success: true, amount });
}
