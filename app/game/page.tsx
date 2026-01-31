import GameClient from "./GameClient";

export const dynamic = "force-dynamic";

export default function GamePage({
  searchParams,
}: {
  searchParams: { mode?: string };
}) {
  const mode =
    searchParams?.mode === "multi" ? "multi" : "single";

  return <GameClient mode={mode} />;
}
