export enum PieceColor {
	WHITE = "white",
	BLACK = "black",
}

export enum PieceType {
	KING = "king",
	QUEEN = "queen",
	ROOK = "rook",
	BISHOP = "bishop",
	KNIGHT = "knight",
	PAWN = "pawn",
}

export class Coordinate {
	constructor(
		public row: number,
		public col: number,
	) {}

	key(): string {
		return `${this.row}-${this.col}`;
	}
	equals(other?: Coordinate): boolean {
		if (!other) return false;
		return this.row === other.row && this.col === other.col;
	}
}

export interface ChessPiece {
	color: PieceColor;
	type: PieceType;
}

export interface ChessCell {
	row: number;
	col: number;
	coordinate: Coordinate;
	color: "light" | "dark";
	piece: ChessPiece | null;
	selected: boolean;
}

export type ChessBoard = ChessCell[][];

export type Move = {
	board: ChessBoard;
	piece: ChessPiece;
	from: Coordinate;
	to: Coordinate;
};

export type ChessGame = {
	board: ChessBoard;
	turn: PieceColor;
	moves: Move[];
};

const _fileNames = ["a", "b", "c", "d", "e", "f", "g", "h"];
const backRank: PieceType[] = [
	PieceType.ROOK,
	PieceType.KNIGHT,
	PieceType.BISHOP,
	PieceType.QUEEN,
	PieceType.KING,
	PieceType.BISHOP,
	PieceType.KNIGHT,
	PieceType.ROOK,
];

function getStartingPiece(row: number, col: number): ChessPiece | null {
	if (row === 0) return { color: PieceColor.BLACK, type: backRank[col] };
	if (row === 1) return { color: PieceColor.BLACK, type: PieceType.PAWN };
	if (row === 6) return { color: PieceColor.WHITE, type: PieceType.PAWN };
	if (row === 7) return { color: PieceColor.WHITE, type: backRank[col] };
	return null;
}

export function createInitialBoard(): ChessBoard {
	return Array.from({ length: 8 }, (_, row) =>
		Array.from({ length: 8 }, (_, col) => {
			const _rank = 8 - row;
			const coordinate = new Coordinate(row, col);

			return {
				row,
				col,
				coordinate,
				color: (row + col) % 2 === 1 ? "dark" : "light",
				piece: getStartingPiece(row, col),
				selected: false,
			};
		}),
	);
}

export function createInitialGame(): ChessGame {
	return { board: createInitialBoard(), turn: PieceColor.WHITE, moves: [] };
}

export function getPieceAssetPath(piece: ChessPiece): string {
	const colorPrefix = piece.color === "white" ? "w" : "b";
	const typeCode: Record<PieceType, string> = {
		king: "K",
		queen: "Q",
		rook: "R",
		bishop: "B",
		knight: "N",
		pawn: "P",
	};

	return `/pieces/cburnett/${colorPrefix}${typeCode[piece.type]}.svg`;
}

export const getValidSquares = (
	turn: PieceColor,
	board: ChessBoard,
	piece: ChessPiece,
	coord: Coordinate,
): Coordinate[] => {
	const validSquares: Coordinate[] = [];
	if (piece.color !== turn) return validSquares;

	const row = coord.row;
	const col = coord.col;

	switch (piece.type) {
		case PieceType.PAWN: {
			// TODO: pawns must promote and therefore cannot live on end ranks
			if (row === 7 || row === 0) break;

			const direction = piece.color === PieceColor.WHITE ? -1 : 1;
			const start = piece.color === PieceColor.WHITE ? 6 : 1;

			// Move one straight ahead
			if (!board[row + direction][col].piece)
				validSquares.push(new Coordinate(row + direction, col));

			// If at the start position, move two straight ahead
			if (row === start && !board[row + direction * 2][col].piece)
				validSquares.push(new Coordinate(row + direction * 2, col));

			if (col > 0) {
				const left = board[row + direction][col - 1];

				if (left.piece !== null && left.piece.color !== piece.color)
					validSquares.push(new Coordinate(row + direction, col - 1));
			}

			if (col < 7) {
				const right = board[row + direction][col + 1];

				if (right.piece !== null && right.piece.color !== piece.color)
					validSquares.push(new Coordinate(row + direction, col + 1));
			}

			break;
		}
		case PieceType.KNIGHT: {
			console.log("knight");
			break;
		}
		case PieceType.BISHOP: {
			console.log("bishop");
			break;
		}
		case PieceType.KING: {
			console.log("king");
			break;
		}
		case PieceType.QUEEN: {
			console.log("queen");
			break;
		}
		case PieceType.ROOK: {
			console.log("rook");
			break;
		}
	}

	return validSquares;
};

export const attemptMove = (
	game: ChessGame,
	from: Coordinate,
	to: Coordinate,
): boolean => {
	const fromCell = game.board[from.row][from.col];

	// Move can't be valid if there's no cell
	if (!fromCell.piece) return false;

	// Move can't be valid if it's not that pieces turn
	if (fromCell.piece.color !== game.turn) return false;

	const validSquares = getValidSquares(
		game.turn,
		game.board,
		fromCell.piece,
		fromCell.coordinate,
	);

	const isValid = validSquares.some((c) => c.equals(to));

	if (isValid) {
		game.board[to.row][to.col].piece = game.board[from.row][from.col].piece;
		game.board[from.row][from.col].piece = null;
	}
	return isValid;

	// console.log(
	// 	`move from \n${JSON.stringify(from)}\n to \n${JSON.stringify(to)}`,
	// );
	// console.log(
	// 	`! move from \n${JSON.stringify(fromCell)}\n to \n${JSON.stringify(toCell)}`,
	// );
};
