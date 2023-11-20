import { searchCourses } from "@/actions/search-course";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import SearchCourseCard from "@/components/search/search-course-card";
import { SearchFilters } from "@/components/search/search-filters";
import PageWrapper from "@/containers/PageWrapper";
import { searchNavigations } from "@/lib/navigations";
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
			<div className="grid grid-cols-4 gap-x-6 pb-16">
				<div className="hidden lg:flex col-span-1 px-4 h-80  flex-col gap-y-4">
					<SearchFilters />
				</div>

				<div className="col-span-4 lg:col-span-3  flex flex-col gap-y-6 pt-4">
					<SearchCourseCard />
					<SearchCourseCard />
					<SearchCourseCard />
					<SearchCourseCard />
					<SearchCourseCard />
					<SearchCourseCard />
				</div>
			</div>
		</PageWrapper>
	);
};

export default SearchPage;
