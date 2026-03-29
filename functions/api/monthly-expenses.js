export async function onRequestGet(context) {
  const { env, data } = context;
  const { userId } = data;
  const { results } = await env.DB.prepare('SELECT * FROM monthly_expenses WHERE user_id = ?').bind(userId).all();
  return Response.json(results);
}

export async function onRequestPost(context) {
  const { env, request, data } = context;
  const { userId } = data;
  const expense = await request.json();
  
  await env.DB.prepare(
    `INSERT INTO monthly_expenses (id, user_id, item, price, payableTo, period, dateModified)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    expense.id,
    userId,
    expense.item,
    expense.price,
    expense.payableTo,
    expense.period,
    expense.dateModified
  ).run();
  
  return Response.json({ success: true, expense });
}
