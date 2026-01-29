import { BoardTile } from "../data/board";

type Props = {
  tile: BoardTile;
};

export default function Tile({ tile }: Props) {
  return (
    <div className="h-20 w-20 bg-white border rounded-md flex items-center justify-center text-xs font-medium text-center shadow">
      {tile.label}
    </div>
  );
}
