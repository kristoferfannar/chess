"use client";
import {
	ChessCell,
	Coordinate,
	createInitialBoard,
	getPieceAssetPath,
} from "@/lib/chess";
import { useState } from "react";

export default function Board() {
	const [board] = useState(() => createInitialBoard());
	const [selected, setSelected] = useState<Coordinate | undefined>(undefined);

	const attemptMove = (source: Coordinate, target: Coordinate): boolean => {
		console.log(
			`move from \n${JSON.stringify(source)}\n to \n${JSON.stringify(target)}`,
		);

		return false;
	};

	const cellClick = (cell: ChessCell) => {
		// If we don't have any cells selected, just select
		if (!selected) return setSelected(cell.coordinate);

		// If we select currently selected cell, deselect
		if (cell.coordinate.equals(selected)) return setSelected(undefined);

		// We have a source and target cell,
		// let's attempt a move
		const moveSuccessful = attemptMove(selected, cell.coordinate);

		if (moveSuccessful) setSelected(undefined);
		else setSelected(cell.coordinate);
	};

	const cellColor = (cell: ChessCell) => {
		const isSelected = cell.coordinate === selected;
		if (cell.color === "dark") {
			if (isSelected) return "bg-sky-700";
			return "bg-gray-700";
		} else {
			if (isSelected) return "bg-sky-300";
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
					key={cell.coordinate.key()}
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
