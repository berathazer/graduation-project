import { searchCourses } from "@/actions/search-course";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import SearchCourseCard from "@/components/search/search-course-card";
import { SearchFilters } from "@/components/search/search-filters";
import PageWrapper from "@/containers/PageWrapper";
import { strokeWidth } from "@/lib/constant";
import { searchNavigations } from "@/lib/navigations";
import { ArrowDownWideNarrow, Filter } from "lucide-react";
import React from "react";

interface SearchPageProps {
	searchParams: { [key: string]: string };
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const { q } = searchParams;

	const courses = await searchCourses(q as string);

	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title="Arama"
				navigations={searchNavigations}
			/>
			<div className="grid grid-cols-4 gap-x-6">
				<div className="col-span-4 ">
					<div className=" w-max px-2 py-3 border border-black flex items-center gap-x-2 ">
						<ArrowDownWideNarrow
							strokeWidth={2}
							className="w-4 h-4"
						/>
						<span className="text-sm font-medium">Filtreler</span>
					</div>
				</div>
				<div className="hidden lg:flex col-span-1 px-4  flex-col gap-y-4">
					<SearchFilters />
				</div>

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
