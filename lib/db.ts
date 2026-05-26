import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface Chat {
  id: string;
  title: string | null;
  messages: unknown[];
  model_id: string;
  created_at: Date;
  updated_at: Date;
}

export async function createChat(modelId: string): Promise<Chat> {
  const result = await sql`
    INSERT INTO chats (model_id)
    VALUES (${modelId})
    RETURNING *
  `;
  return result[0] as Chat;
}

export async function getChat(id: string): Promise<Chat | null> {
  const result = await sql`
    SELECT * FROM chats WHERE id = ${id}
  `;
  return (result[0] as Chat) || null;
}

export async function updateChat(
  id: string,
  messages: unknown[],
  title?: string
): Promise<Chat | null> {
  const result = await sql`
    UPDATE chats 
    SET messages = ${JSON.stringify(messages)}, 
        title = COALESCE(${title}, title),
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return (result[0] as Chat) || null;
}

export async function listChats(): Promise<Chat[]> {
  const result = await sql`
    SELECT * FROM chats 
    ORDER BY updated_at DESC
    LIMIT 50
  `;
  return result as Chat[];
}

export async function deleteChat(id: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM chats WHERE id = ${id}
    RETURNING id
  `;
  return result.length > 0;
}
