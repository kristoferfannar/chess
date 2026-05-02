import Board from "./board";

export default function Home() {
	return (
		<div className="flex flex-1 items-center justify-center font-sans">
			<main className="flex flex-1 items-center justify-center overflow-hidden p-16">
				<Board />
			</main>
		</div>
	);
}
