"use client";
import { useState } from "react";
import ReactStars from "react-rating-star-with-type";
interface CourseRatingProps {
	rating?: number;
	size?: number;
	color?: string;
	valueShow?: boolean;
}
const CourseRating = ({ rating, size, color, valueShow }: CourseRatingProps) => {
	const [star, setStar] = useState(5);

	const onChange = (nextValue: number) => {
		setStar(nextValue);
	};

	return (
		<ReactStars
			onChange={onChange}
			value={rating}
			valueShow={valueShow}
			style={{
				cursor: "pointer",
			}}
			isHalf
			size={size || 20}
			activeColor={color || "black"}
		/>
	);
};

export default CourseRating;
