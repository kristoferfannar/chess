import Board from "./board";

export default function Home() {
	return (
		<div className="flex flex-1 flex-col font-sans">
			<main className="flex flex-1 overflow-hidden p-0 md:p-16">
				<Board />
			</main>
		</div>
	);
}
