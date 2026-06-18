"use client";
import { useState } from "react";
import {
	attemptMove,
	type ChessCell,
	createInitialGame,
	type Move,
	PieceColor,
} from "@/lib/chess";

import { useSounds } from "@/lib/sounds";

import Board from "./board";

export default function Game() {
	const [game] = useState(() => createInitialGame());
	const [selectedCell, setSelectedCellAction] = useState<ChessCell | undefined>(
		undefined,
	);

	const playSound = useSounds();

	const cellClick = (cell: ChessCell) => {
		// If we don't have any cells selected, just select
		if (!selectedCell) return setSelectedCellAction(cell);

		// If we select currently selected cell, deselect
		if (cell.coordinate.equals(selectedCell.coordinate))
			return setSelectedCellAction(undefined);

		// We have a source and target cell,
		// let's attempt a move
		const moveAttempt = attemptMove(
			game,
			selectedCell.coordinate,
			cell.coordinate,
		);

		if (moveAttempt.success) {
			setSelectedCellAction(undefined);
			game.turn =
				game.turn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

			const move: Move = {
				board: game.board,
				piece: cell.piece!,
				from: selectedCell.coordinate,
				to: cell.coordinate,
			};
			game.moves.push(move);
			playSound(moveAttempt.capture ? "capture" : "move");
		} else setSelectedCellAction(cell);
	};

	return (
		<>
			<div className="flex-1 flex justify-center">
				<h1 className="text-4xl self-center">{`move: ${game.moves.length + 1}`}</h1>
			</div>
			<main className="flex flex-3 overflow-hidden p-0 md:p-16">
				<Board
					turn={game.turn}
					board={game.board}
					selectedCell={selectedCell}
					setSelectedCellAction={setSelectedCellAction}
					handleCellClickAction={cellClick}
				/>
			</main>
			<div className="flex-1 flex justify-center">
				<h1 className="text-4xl self-center">{`turn: ${game.turn}`}</h1>
			</div>
		</>
	);
}
