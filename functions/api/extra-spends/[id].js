export async function onRequestDelete(context) {
  const { env, params, data } = context;
  const { userId } = data;
  const id = params.id;
  
  await env.DB.prepare('DELETE FROM extra_spends WHERE id = ? AND user_id = ?').bind(id, userId).run();
  
  return Response.json({ success: true, id });
}
