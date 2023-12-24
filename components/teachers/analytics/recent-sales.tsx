import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatProductPrice } from "@/lib/helpers";
import { Purchase } from "@prisma/client";

interface RecentSalesProps {
	purchases:
		| {
				profile: {
					imageUrl: string;
					name: string;
					email: string;
				};
				price: number;
		  }[]
		| undefined;
}

export function RecentSales({ purchases }: RecentSalesProps) {
	console.log(purchases);

	return (
		<div className="space-y-8">
			{purchases?.map((p, index) => (
				<div
					key={index}
					className="flex items-center"
				>
					<Avatar className="h-9 w-9">
						<AvatarImage
							src={p.profile.imageUrl}
							alt={p.profile.name}
						/>
						<AvatarFallback>{p.profile.name[0]}</AvatarFallback>
					</Avatar>
					<div className="ml-4 space-y-1">
						<p className="text-sm font-medium leading-none">{p.profile.name}</p>
						<p className="text-sm text-muted-foreground">{p.profile.email}</p>
					</div>
					<div className="ml-auto font-medium">{formatProductPrice(p.price)}</div>
				</div>
			))}
		</div>
	);
}

export function RecentSalesSkeleton() {
	return (
		<div className="space-y-8 w-full">
			{[1, 2, 3, 4, 5].map((index) => (
				<div
					key={index}
					className="flex items-center w-full"
				>
					<Skeleton className="h-10 w-full" />
				</div>
			))}
		</div>
	);
}
