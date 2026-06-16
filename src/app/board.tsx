"use client";
import {
	type ChessBoard,
	type ChessCell,
	type Coordinate,
	getPieceAssetPath,
} from "@/lib/chess";

type Props = {
	board: ChessBoard;
	selectedCell: Coordinate | undefined;
	setSelectedCellAction: (selected: Coordinate | undefined) => void;
	handleCellClickAction: (cell: ChessCell) => void;
};

export default function Board({
	board,
	selectedCell,
	handleCellClickAction,
}: Props) {
	const cellColor = (cell: ChessCell) => {
		const isSelected = cell.coordinate === selectedCell;
		if (cell.color === "dark") {
			if (isSelected) return "bg-sky-700";
			return "bg-gray-700";
		} else {
			if (isSelected) return "bg-sky-300";
			return "bg-gray-300";
		}
	};

	return (
		<div className="flex flex-1 items-center justify-center @container-[size]">
			<div className="grid grid-cols-8 grid-rows-8 w-[min(100cqw,100cqh)] h-[min(100cqw,100cqh)]">
				{board.flat().map((cell) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: click-only chess UI
					// biome-ignore lint/a11y/noStaticElementInteractions: click-only chess UI
					<div
						key={cell.coordinate.key()}
						className={`flex items-center justify-center ${cellColor(cell)}`}
						onClick={() => handleCellClickAction(cell)}
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
		</div>
	);
}
