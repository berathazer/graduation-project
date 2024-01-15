import AdminContainer from "@/containers/AdminContainer";
import AdminCategoriesSkeleton from "@/skeletons/AdminCategoriesSkeleton";
import { Suspense } from "react";

const AdminPage = () => {
	return (
		<Suspense fallback={<AdminCategoriesSkeleton />}>
			<AdminContainer />
		</Suspense>
	);
};

export default AdminPage;
