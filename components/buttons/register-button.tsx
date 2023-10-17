"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { without_focus } from "@/lib/constant";
import { useRouter } from "next/navigation";

const RegisterButton = () => {
	const router = useRouter();

	const onClick = () => {
		router.push("/sign-up");
	};
	return (
		<Button
			variant={"outline"}
			size={"xs"}
			className={cn(without_focus, "text-xs")}
			onClick={onClick}
		>
			Kaydol
		</Button>
	);
};

export default RegisterButton;
