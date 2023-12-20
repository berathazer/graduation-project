"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Course } from "@prisma/client";

/* interface CompleteOrderButtonProps {
	courses: Course[];
} */

const CompleteOrderButton = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const isAuthenticated = isLoaded && isSignedIn;

	const onCompleteClick = async () => {
		if (!isAuthenticated) {
			return router.push("/sign-in");
		}

		setIsLoading(true);
		try {
			const response = await axios.post(`/api/checkout`);
			window.location.assign(response.data.url);
		} catch (error:any) {
			toast.error("Something went wrong:"+error.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button
			disabled={isLoading}
			onClick={onCompleteClick}
			className="rounded-none"
		>
			Siparişi Tamamla
		</Button>
	);
};

export default CompleteOrderButton;
