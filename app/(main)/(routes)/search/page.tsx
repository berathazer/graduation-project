import { searchCourses } from "@/actions/search-course";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import MobileFilter from "@/components/search/mobile-filter";
import { SortFilter } from "@/components/search/sort-filter";
import SearchCourseCard from "@/components/search/search-course-card";
import { SearchFilters } from "@/components/search/search-filters";

import PageWrapper from "@/containers/PageWrapper";
import { strokeWidth } from "@/lib/constant";

import { searchNavigations } from "@/lib/navigations";
import { Dot, SearchX } from "lucide-react";
import React from "react";

interface SearchPageProps {
	searchParams: { [key: string]: string | string[] };
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const { q } = searchParams;
	console.log("searchParams: ", searchParams);

	const courses = await searchCourses(q as string);

	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title="Arama"
				navigations={searchNavigations}
			/>
			<div className="grid grid-cols-4 gap-x-6">
				{courses.length === 0 && (
					<div className="flex w-full flex-col gap-y-4 items-center justify-center col-span-4 py-8">
						<div className="p-6 rounded-full flex items-center justify-center bg-slate-50">
							<SearchX
								strokeWidth={strokeWidth}
								className="w-10 h-10 text-muted-foreground"
							/>
						</div>
						<div className="font-semibold text-lg md:text-xl text-black/80 text-center">
							{`'${q}' için herhangi bir sonuç bulamadık.`}
						</div>
						<p className="text-muted-foreground font-light text-[.85rem]  w-auto md:w-[420px]  text-center px-2">
							<span className="flex items-center">
								<Dot className="" /> Tüm kelimelerin doğru yazıldığından emin olun
							</span>
							<span className="flex items-center">
								<Dot className="" /> Farklı arama terimleri deneyin
							</span>
							<span className="flex items-center">
								<Dot className="" /> Daha genel arama terimlerini deneyin
							</span>
						</p>
					</div>
				)}

				{courses.length > 0 && (
					<>
						<div className="col-span-4 flex gap-x-2 ">
							<MobileFilter />
							<SortFilter />
						</div>

						<div className="hidden lg:flex col-span-1 px-4  flex-col gap-y-4">
							<SearchFilters />
						</div>
					</>
				)}

				<div className="col-span-4 lg:col-span-3  flex flex-col gap-y-6 pt-4">
					{courses.map((course) => (
						<SearchCourseCard
							key={course.id}
							course={course}
						/>
					))}
				</div>
			</div>
		</PageWrapper>
	);
};

export default SearchPage;
