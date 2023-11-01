import { redirect } from "next/navigation";
import React from "react";

const TeachersPage = () => {
	return redirect("/teacher/courses");
};

export default TeachersPage;
