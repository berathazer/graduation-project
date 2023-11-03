import React from "react";

interface SearchPageProps {
	searchParams: { [key: string]: string | string[] | undefined };
}
const SearchPage = ({ searchParams }: SearchPageProps) => {
	const { q } = searchParams;
	console.log("searchParams: ", searchParams);

	return <div>SearchPage: {q}</div>;
};

export default SearchPage;
