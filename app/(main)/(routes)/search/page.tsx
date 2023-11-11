import { searchCourses } from "@/actions/search-course";
import React from "react";

interface SearchPageProps {
	searchParams: { [key: string]: string };
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const { q } = searchParams;

	const courses = await searchCourses(q);
	return (
		<div className="p-6">
			SearchParams: {q}
			<pre>{JSON.stringify(courses, null, 4)}</pre>
		</div>
	);
};

export default SearchPage;
