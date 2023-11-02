"use client";
import { useState } from "react";
import ReactStars from "react-rating-star-with-type";
interface CourseRatingProps {
	rating?: number;
	size?: number;
	color?: string;
}
const CourseRating = ({ rating, size, color }: CourseRatingProps) => {
	const [star, setStar] = useState(5);

	const onChange = (nextValue: number) => {
		setStar(nextValue);
	};
	console.log("rating:", star);

	return (
		<ReactStars
			onChange={onChange}
			value={rating}
			valueShow
			isHalf
			size={size || 20}
			activeColors={["orange"]}
		/>
	);
};

export default CourseRating;
