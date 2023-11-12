import React from "react";
import PageWrapper from "./PageWrapper";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import { myCoursesNavigation } from "@/lib/navigations";

const MyCoursesContainer = () => {
	return (
		<PageWrapper>
			<NavigationBreadcrumb title="Kurslarım" navigations={myCoursesNavigation}/>
		</PageWrapper>
	);
};

export default MyCoursesContainer;
