export async function onRequestGet(context) {
  const { env, data } = context;
  const { userId } = data;
  const { results } = await env.DB.prepare('SELECT * FROM extra_spends WHERE user_id = ?').bind(userId).all();
  return Response.json(results);
}

export async function onRequestPost(context) {
  const { env, request, data } = context;
  const { userId } = data;
  const spend = await request.json();
  
  await env.DB.prepare(
    `INSERT INTO extra_spends (id, user_id, item, price, date)
     VALUES (?, ?, ?, ?, ?)`
  ).bind(
    spend.id,
    userId,
    spend.item,
    spend.price,
    spend.date
  ).run();
  
  return Response.json({ success: true, spend });
}
