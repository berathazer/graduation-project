import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/containers/PageWrapper";
import { instructorNavigations } from "@/lib/navigations";

const InstructorIdPageSkeleton = () => {
	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title={"Eğitmen"}
				navigations={instructorNavigations}
			/>
			<div className="grid grid-cols-4 lg:px-12 lg:container gap-x-4">
				{/* Left Side */}
				<div className="col-span-3 flex flex-col gap-y-6">
					<div className="flex flex-col">
						<p
							className="text-xs text-muted-foreground uppercase
                       font-bold"
						>
							EĞİTMEN
						</p>
						<div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-400 tracking-wider">
							<Skeleton className="w-80 h-8"></Skeleton>
						</div>
						<p className="py-3 font-bold text-black/80">
							<Skeleton className="w-64 h-6"></Skeleton>
						</p>
						<div className="flex items-center gap-x-6">
							<div className="flex flex-col gap-y-1">
								<span className="text-xs tracking-tighter font-bold text-muted-foreground">
									Toplam öğrenci sayısı
								</span>
								<Skeleton className="w-24 h-6"></Skeleton>
							</div>

							<div className="flex flex-col gap-y-1">
								<span className="text-xs tracking-tighter font-bold text-muted-foreground">
									Yorumlar
								</span>
								<Skeleton className="w-24 h-6"></Skeleton>
							</div>
						</div>
					</div>

					{/* Bio */}
					<Skeleton className="w-full border flex justify-center h-80 "></Skeleton>

					{/* Kurslarım */}
					<div className="grid grid-cols-2 pt-6 gap-x-4">
						<p className="font-bold col-span-2 flex items-center gap-x-1 pb-6">
							<span>Kurslarım</span>
							<span>
								<Skeleton className="w-8 h-4"></Skeleton>
							</span>
						</p>
						{[1, 2].map((index) => (
							<div
								className="grid-cols-1"
								key={index}
							>
								<Skeleton className="w-full border flex justify-center h-52"></Skeleton>
							</div>
						))}
					</div>
				</div>

				{/* Right Side */}
				<div className="col-span-1 h-80 ">
					<Skeleton className="w-40 h-40"></Skeleton>
				</div>
			</div>
		</PageWrapper>
	);
};

export default InstructorIdPageSkeleton;
