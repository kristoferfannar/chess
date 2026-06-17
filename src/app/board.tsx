"use client";
import {
	type ChessBoard,
	type ChessCell,
	type Coordinate,
	getPieceAssetPath,
	getValidSquares,
} from "@/lib/chess";

type Props = {
	board: ChessBoard;
	selectedCell: ChessCell | undefined;
	setSelectedCellAction: (selected: ChessCell | undefined) => void;
	handleCellClickAction: (cell: ChessCell) => void;
};

export default function Board({
	board,
	selectedCell,
	handleCellClickAction,
}: Props) {
	const cellColor = (cell: ChessCell) => {
		const isSelected = cell.coordinate === selectedCell?.coordinate;
		if (cell.color === "dark") {
			if (isSelected) return "bg-sky-700";
			return "bg-gray-700";
		} else {
			if (isSelected) return "bg-sky-300";
			return "bg-gray-300";
		}
	};

	let validSquares: Coordinate[] = [];
	if (selectedCell?.piece) {
		validSquares = getValidSquares(
			board,
			selectedCell.piece,
			selectedCell.coordinate,
		);
	}

	const movableColor = (cell: ChessCell) => {
		if (cell.piece) {
			if (cell.color === "dark") return "border-gray-300";
			return "border-gray-700";
		}

		if (cell.color === "dark") return "bg-gray-300";
		return "bg-gray-700";
	};

	return (
		<div className="flex flex-1 items-center justify-center @container-[size]">
			<div className="grid grid-cols-8 grid-rows-8 w-[min(100cqw,100cqh)] h-[min(100cqw,100cqh)]">
				{board.flat().map((cell) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: click-only chess UI
					// biome-ignore lint/a11y/noStaticElementInteractions: click-only chess UI
					<div
						key={cell.coordinate.key()}
						className={`relative flex items-center justify-center ${cellColor(cell)}`}
						onClick={() => handleCellClickAction(cell)}
					>
						{cell.piece ? (
							<img
								src={getPieceAssetPath(cell.piece)}
								alt={`${cell.piece.color} ${cell.piece.type}`}
								className="h-[90%] w-[90%] z-10 relative select-none"
								draggable={false}
							/>
						) : null}
						{validSquares.some((c) => c.equals(cell.coordinate)) && (
							<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
								{cell.piece ? (
									<div
										className={`w-31/32 h-31/32 rounded-full border-[1.2cqmin] ${movableColor(cell)}`}
									/>
								) : (
									<div
										className={`w-1/4 h-1/4 rounded-full ${movableColor(cell)}`}
									/>
								)}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
