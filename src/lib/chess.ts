export type PieceColor = "white" | "black";
export type PieceType =
  | "king"
  | "queen"
  | "rook"
  | "bishop"
  | "knight"
  | "pawn";

export interface ChessPiece {
  color: PieceColor;
  type: PieceType;
}

export interface ChessCell {
  row: number;
  col: number;
  coordinate: string;
  color: "light" | "dark";
  piece: ChessPiece | null;
  selected: boolean;
}

export type ChessBoard = ChessCell[][];

const fileNames = ["a", "b", "c", "d", "e", "f", "g", "h"];
const backRank: PieceType[] = [
  "rook",
  "knight",
  "bishop",
  "queen",
  "king",
  "bishop",
  "knight",
  "rook",
];

function getStartingPiece(row: number, col: number): ChessPiece | null {
  if (row === 0) return { color: "black", type: backRank[col] };
  if (row === 1) return { color: "black", type: "pawn" };
  if (row === 6) return { color: "white", type: "pawn" };
  if (row === 7) return { color: "white", type: backRank[col] };
  return null;
}

export function createInitialBoard(): ChessBoard {
  return Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => {
      const rank = 8 - row;
      const coordinate = `${fileNames[col]}${rank}`;

      return {
        row,
        col,
        coordinate,
        color: (row + col) % 2 === 1 ? "dark" : "light",
        piece: getStartingPiece(row, col),
		selected: false
      };
    }),
  );
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
