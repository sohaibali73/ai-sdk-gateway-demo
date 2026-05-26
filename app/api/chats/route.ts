import { listChats, createChat } from "@/lib/db";
import { DEFAULT_MODEL, SUPPORTED_MODELS } from "@/lib/constants";

export async function GET() {
  try {
    const chats = await listChats();
    return Response.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return Response.json({ error: "Failed to fetch chats" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { modelId = DEFAULT_MODEL } = await req.json();

    if (!SUPPORTED_MODELS.includes(modelId)) {
      return Response.json(
        { error: `Model ${modelId} is not supported` },
        { status: 400 }
      );
    }

    const chat = await createChat(modelId);
    return Response.json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    return Response.json({ error: "Failed to create chat" }, { status: 500 });
  }
}
