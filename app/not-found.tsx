import Link from "next/link";
import React from "react";

const NotFound = () => {
	return (
		<div className="h-without_navbar flex items-center justify-center">
			<div className="bg-gray-50 dark:bg-slate-900 p-8 flex flex-col rounded shadow-md gap-y-4">
				<h1 className="text-8xl font-bold text-gray-800 dark:text-gray-50/80 text-center">404</h1>
				<p className="text-gray-600 dark:text-gray-200/70 mt-2">
					Aradığınız sayfa bulunamadı. Anasayfaya dönmek için{" "}
					<Link
						href={"/"}
						className="underline text-muted-foreground"
					>
						tıklayınız
					</Link>
				</p>
			</div>
		</div>
	);
};

export default NotFound;
