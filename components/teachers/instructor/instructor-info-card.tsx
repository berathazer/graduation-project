import React from "react";

interface InstructorInfoCardProps {
	title: string;
	description: string;
	imageUrl?: React.ReactNode;
}

const InstructorInfoCard = ({ title, description, imageUrl }: InstructorInfoCardProps) => {
	return (
		<div className="flex flex-1  gap-x-4">
			<div className="w-40 relative border flex"></div>
			<div className="flex flex-1 flex-col justify-center gap-y-4">
				<span className="text-black/80 text-lg font-medium">{title}</span>
				<p className="text-muted-foreground text-sm ">{description}</p>
			</div>
		</div>
	);
};

export default InstructorInfoCard;
