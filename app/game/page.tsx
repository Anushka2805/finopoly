import GameClient from "./GameClient";

export const dynamic = "force-dynamic";

export default async function GamePage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const params = await searchParams;

  const mode = params?.mode === "multi" ? "multi" : "single";

  // ⭐ KEY FIX HERE
  return <GameClient key={mode} mode={mode} />;
}
