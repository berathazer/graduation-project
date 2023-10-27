import React from "react";

const ChapterIdPage = ({ params }: { params: { courseId: string; chapterId: string } }) => {
	return <div>ChapterIdPage:{params.chapterId}</div>;
};

export default ChapterIdPage;
