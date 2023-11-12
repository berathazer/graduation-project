"use client";
import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CompleteOrderButton = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const router = useRouter();

	const isAuthenticated = isLoaded && isSignedIn;

	const onCompleteClick = () => {
		try {
			if (!isAuthenticated) {
				return router.push("/sign-in");
			}

			return router.push("/checkout");
		} catch (error) {}
	};
	return (
		<Button
			onClick={onCompleteClick}
			className="rounded-none"
		>
			Siparişi Tamamla
		</Button>
	);
};

export default CompleteOrderButton;
