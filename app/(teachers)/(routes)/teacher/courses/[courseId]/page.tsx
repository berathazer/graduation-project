import React from "react";

const SingleCoursePage = ({ params }: { params: { courseId: string } }) => {
	return <div>SingleCoursePage: {params.courseId}</div>;
};

export default SingleCoursePage;
