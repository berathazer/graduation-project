import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type CardProps = React.ComponentProps<typeof Card>;

export default function MainBrandCard({ className, ...props }: CardProps) {
	return (
		<Card
			className={cn(className)}
			{...props}
		>
			<CardHeader>
				<CardTitle className="text-2xl md:text-4xl lg:text-5xl xl:text-7xl">
					Limitleri Aşarak Öğrenmeye Başlayın
				</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="text-sm md:text-sm lg:text-base xl:text-xl flex items-center space-x-4 rounded-md">
					Gelin ve Hayalinizdeki Geleceği İnşa Edin! Kaydolun ve bugün öğrenmeye başlayın.
				</div>
			</CardContent>
			<CardFooter className="flex gap-x-4 items-center flex-col lg:flex-row gap-y-2 ">
				<Link
					href={"/sign-in"}
					className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  md:text-xs lg:text-base h-9 md:h-11  px-3 bg-primary-foreground border text-primary hover:bg-primary/10 w-full"
				>
					Öğrenmeye Başlayın
				</Link>
				<Link
					href={"/courses"}
					className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:text-xs lg:text-base h-9 md:h-11  px-3 bg-primary text-primary-foreground hover:bg-primary/90 w-full"
				>
					Kurslara Göz Atın
				</Link>
			</CardFooter>
		</Card>
	);
}
