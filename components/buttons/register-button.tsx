import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { without_focus } from "@/lib/constant";
import Link from "next/link";

const RegisterButton = () => {
	return (
		<Link href={"/sign-up"}>
			<Button
				variant={"outline"}
				size={"xs"}
				className={cn(without_focus, "text-xs")}
			>
				Kaydol
			</Button>
		</Link>
	);
};

export default RegisterButton;
