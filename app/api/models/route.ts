import { NextResponse } from "next/server";
import { SUPPORTED_MODELS } from "@/lib/constants";

export async function GET() {
  // Return supported Claude models directly since we're using Anthropic SDK
  const models = SUPPORTED_MODELS.map((id) => ({
    id,
    name: formatModelName(id),
  }));

  return NextResponse.json({ models });
}

function formatModelName(modelId: string): string {
  // Convert "claude-sonnet-4-20250514" to "Claude Sonnet 4"
  const parts = modelId.split("-");
  const name = parts
    .slice(0, 3)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return name;
}
