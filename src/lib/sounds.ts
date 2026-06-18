import { useRef, useEffect } from "react";

const SOUNDS = {
	move: "/move.mp3",
	capture: "/capture.mp3",
} as const;

type SoundName = keyof typeof SOUNDS;

export function useSounds() {
	const ctx = useRef<AudioContext | null>(null);
	const buffers = useRef<Record<string, AudioBuffer>>({});
	useEffect(() => {
		const warmup = async () => {
			ctx.current = new AudioContext();
			await Promise.all(
				Object.entries(SOUNDS).map(async ([name, path]) => {
					const b = await fetch(path).then((r) => r.arrayBuffer());
					buffers.current[name] = await ctx.current!.decodeAudioData(b);
				}),
			);

			// Play a zero-volume blip to open the audio device
			const silent = ctx.current.createBufferSource();
			silent.buffer = ctx.current.createBuffer(1, 1, 22050);
			silent.connect(ctx.current.destination);
			silent.start();
			window.removeEventListener("pointerdown", warmup);
			window.removeEventListener("keydown", warmup);
		};
		window.addEventListener("pointerdown", warmup);
		window.addEventListener("keydown", warmup);

		return () => {
			window.removeEventListener("pointerdown", warmup);
			window.removeEventListener("keydown", warmup);
			ctx.current?.close();
		};
	}, []);

	const playMove = (sound: SoundName) => {
		const buffer = buffers.current[sound];

		if (!buffer || !ctx.current) return;
		const src = ctx.current.createBufferSource();
		src.buffer = buffer;
		src.connect(ctx.current.destination);
		src.start();
	};
	return playMove;
}
