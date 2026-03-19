import { createInitialBoard, getPieceAssetPath } from "@/lib/chess";

export default function Home() {
  const board = createInitialBoard();

  return (
    <div className="flex flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 items-center justify-center overflow-hidden p-16">
        <div
          className="grid grid-cols-8 grid-rows-8"
          style={{
            width: "calc(min(100vw, 100vh) - 8rem)",
            height: "calc(min(100vw, 100vh) - 8rem)",
          }}
        >
          {board.flat().map((cell) => (
            <div
              key={cell.coordinate}
              className={`flex items-center justify-center ${
                cell.color === "dark" ? "bg-gray-700" : "bg-gray-300"
              }`}
            >
              {cell.piece ? (
                <img
                  src={getPieceAssetPath(cell.piece)}
                  alt={`${cell.piece.color} ${cell.piece.type}`}
                  className="h-[90%] w-[90%] select-none"
                  draggable={false}
                />
              ) : null}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
