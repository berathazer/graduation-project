import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { without_focus } from "@/lib/constant";
import Link from "next/link";

const LoginButton = () => {
	return (
		<Link href={"/sign-in"}>
			<Button
				variant={"default"}
				size={"xs"}
				className={cn(without_focus, "text-xs")}
			>
				Giriş Yap
			</Button>
		</Link>
	);
};

export default LoginButton;
