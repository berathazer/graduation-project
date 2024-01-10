"use client";

import * as React from "react";
import { Grip } from "lucide-react";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { useSearchStore } from "@/hooks/use-search-command";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SearchCommandProps {
	categories: Category[];
}

export default function SearchCommand({ categories }: SearchCommandProps) {
	const { open, setOpen } = useSearchStore();
	const router = useRouter();
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen(!open);
			}
		};

		document.addEventListener("keydown", down);
		return () => {
			document.removeEventListener("keydown", down);
		};
	}, [open, setOpen]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const search = inputRef.current?.value;
		if (e.key === "Enter" && search !== "") {
			router.push(`/search?q=${search}`);
			inputRef.current!.value = "";
			setOpen(false);
		}
	};

	const parentCategories = categories.filter((c) => c.parentId === null);

	return (
		<>
			<p
				className="text-sm text-muted-foregroundh-screen  cursor-pointer hidden md:flex"
				onClick={() => setOpen(true)}
			>
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>K
				</kbd>
			</p>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
			>
				<CommandInput
					placeholder="Bir komut yazın veya arama yapın..."
					ref={inputRef}
					onKeyDown={handleKeyDown}
				/>
				<CommandList>
					<CommandEmpty>Hiç Sonuç Bulunamadı.</CommandEmpty>
					<CommandGroup heading="Kategoriler">
						{parentCategories.map((category) => (
							<Link
								key={category.id}
								href={`/courses?categoryId=${category.id}`}
							>
								<CommandItem>
									<Grip
										strokeWidth={"1.1px"}
										className="mr-2 h-4 w-4"
									/>
									<span>{category.name}</span>
								</CommandItem>
							</Link>
						))}
					</CommandGroup>
					<CommandSeparator />
					{/* 	<CommandGroup heading="Settings">
						<CommandItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<CreditCard className="mr-2 h-4 w-4" />
							<span>Billing</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup> */}
				</CommandList>
			</CommandDialog>
		</>
	);
}
