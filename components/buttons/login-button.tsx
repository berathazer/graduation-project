"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { without_focus } from "@/lib/constant";
import { useRouter } from "next/navigation";

const LoginButton = () => {
	const router = useRouter();

	const onClick = () => {
		router.push("/sign-in");
	};

	return (
		<Button
			variant={"default"}
			size={"xs"}
			className={cn(without_focus, "text-xs")}
			onClick={onClick}
		>
			Giriş Yap
		</Button>
	);
};

export default LoginButton;
