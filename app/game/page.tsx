import GameClient from "./GameClient";

/*
  ✅ Next.js 14 fix
  searchParams is async → must await
*/
export default async function GamePage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const params = await searchParams;

  const mode =
    params.mode === "multi" ? "multi" : "single";

  return <GameClient mode={mode} />;
}
