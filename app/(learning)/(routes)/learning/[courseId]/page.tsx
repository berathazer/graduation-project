import db from "@/lib/db";
import { redirect } from "next/navigation";

const LearningCoursePage = async ({
	params,
}: {
	params: {
		courseId: string;
	};
}) => {
	const chapter = await db.chapter.findFirst({
		where: {
			courseId: params.courseId,
		},
		select: {
			id: true,
		},
		orderBy: {
			position: "asc",
		},
	});

	redirect(`/learning/${params.courseId}/chapters/${chapter?.id}`);
};

export default LearningCoursePage;
