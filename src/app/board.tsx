"use client";
import { ChessCell, createInitialBoard, getPieceAssetPath } from "@/lib/chess";
import { useState } from "react";

export default function Board() {
    const [board] = useState(() => createInitialBoard());
    const [selected, setSelected] = useState<string | undefined>(undefined);

    const cellClick = (cell: ChessCell) => {
        if (cell.coordinate === selected) setSelected(undefined);
        else setSelected(cell.coordinate);
    };

    const cellColor = (cell: ChessCell) => {
        const isSelected = cell.coordinate === selected;
        if (cell.color === "dark") {
            if (isSelected) return "bg-gray-600";
            return "bg-gray-700";
        } else {
            if (isSelected) return "bg-gray-400";
            return "bg-gray-300";
        }
    };

    return (
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
                    className={`flex items-center justify-center ${cellColor(cell)}`}
                    onClick={() => cellClick(cell)}
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
    );
}
