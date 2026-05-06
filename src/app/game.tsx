"use client";
import { useState } from "react";
import Board from "./board";
import {
	attemptMove,
	ChessCell,
	Coordinate,
	createInitialGame,
	Move,
	PieceColor,
} from "@/lib/chess";

export default function Game() {
	const [game] = useState(() => createInitialGame());
	const [selectedCell, setSelectedCellAction] = useState<
		Coordinate | undefined
	>(undefined);

	const cellClick = (cell: ChessCell) => {
		// If we don't have any cells selected, just select
		if (!selectedCell) return setSelectedCellAction(cell.coordinate);

		// If we select currently selected cell, deselect
		if (cell.coordinate.equals(selectedCell))
			return setSelectedCellAction(undefined);

		// We have a source and target cell,
		// let's attempt a move
		const moveSuccessful = attemptMove(game, selectedCell, cell.coordinate);

		if (moveSuccessful) {
			setSelectedCellAction(undefined);
			game.turn =
				game.turn === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

			const move: Move = {
				board: game.board,
				piece: cell.piece!,
				from: selectedCell,
				to: cell.coordinate,
			};
			game.moves.push(move);
		} else setSelectedCellAction(cell.coordinate);
	};

	return (
		<>
			<div className="flex-1 flex justify-center">
				<h1 className="text-4xl self-center">{`move: ${game.moves.length + 1}`}</h1>
			</div>
			<main className="flex flex-3 overflow-hidden p-0 md:p-16">
				<Board
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
