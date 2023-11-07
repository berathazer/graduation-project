import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import PageWrapper from "@/containers/PageWrapper";
import { basketNavigation } from "@/lib/navigations";
import React from "react";

const BasketPage = () => {
	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title="Sepet"
				navigations={basketNavigation}
			/>
		</PageWrapper>
	);
};

export default BasketPage;
