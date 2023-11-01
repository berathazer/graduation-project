"use client";

import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/hooks/use-confetti";

export const ConfettiProvider = () => {
	const isOpen = useConfettiStore().isOpen;
	const onClose = useConfettiStore().onClose;
	if (!isOpen) return null;

	return (
		<ReactConfetti
			className="pointer-events-none z-[100]"
			numberOfPieces={500}
			recycle={false}
			onConfettiComplete={() => {
				onClose();
			}}
		/>
	);
};
