import Link from "next/link";
import React from "react";

interface NavigationBreadcrumbProps {
	title: string;
	navigations: { name: string; url: string }[];
}
const NavigationBreadcrumb = ({ title, navigations }: NavigationBreadcrumbProps) => {
	return (
		<section
			id="navigation"
			className="flex flex-col items-center justify-center gap-y-2"
		>
			<p className="text-3xl font-semibold ">{title}</p>
			<p className="font text-muted-foreground flex items-center justify-center gap-x-1">
				{navigations.map((nav, key) => (
					<Link
						key={key}
						href={nav.url}
						replace={true}
					>
						{nav.name} {navigations.length !== key + 1 && "/"}
					</Link>
				))}
			</p>
		</section>
	);
};

export default NavigationBreadcrumb;
