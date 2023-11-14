import db from "@/lib/db";
import React from "react";
import PageWrapper from "./PageWrapper";
import InstructorForm from "@/components/teachers/instructor/instructor-form";
import { Profile } from "@prisma/client";
import InstructorInfoCard from "@/components/teachers/instructor/instructor-info-card";
import { BarChart3, Clapperboard, FileVideo, LucideIcon } from "lucide-react";

interface InstructorContainerProps {
	profile: Profile;
}

export type CardDataTypes = "course" | "video" | "analytic";
const cardDatas: {
	title: string;
	description: string;
	icon: LucideIcon;
	type: CardDataTypes;
}[] = [
	{
		title: "Kurs Oluşturun",
		description:
			"Uzmanlık alanınıza özel kurslarınızı oluşturun ve dünya genelinde öğrencilere ulaşın.",
		icon: FileVideo,
		type: "course",
	},
	{
		title: "Videolarınızı Yayınlayın",
		description:
			"Kurslarınıza video ekleyerek öğrencilerinize interaktif ve etkili bir öğrenme deneyimi sunun.",
		icon: Clapperboard,
		type: "video",
	},
	{
		title: "Analitikleri Gözlemleyin",
		description:
			"Oluşturduğunuz kursların performansını takip edin, analizlerle öğrenci ilerlemesini gözlemleyin.",
		icon: BarChart3,
		type: "analytic",
	},
];

const InstructorContainer = async ({ profile }: InstructorContainerProps) => {
	return (
		<div className="min-h-without_navbar">
			<PageWrapper>
				<div className="grid grid-cols-2 py-12">
					<div className="col-span-2 hidden md:flex py-8 px-2 order-2 md:order-1  md:col-span-1  flex-col shadow-lg border border-r-0">
						{cardDatas.map((card, index) => (
							<InstructorInfoCard
								key={index}
								title={card.title}
								description={card.description}
								Icon={card.icon}
								type={card.type}
							/>
						))}
					</div>
					<div
						className="col-span-2 order-1 md:order-1 md:col-span-1 flex items-center justify-center"
						id="instructorForm"
					>
						<InstructorForm profile={profile} />
					</div>
				</div>
			</PageWrapper>
		</div>
	);
};

export default InstructorContainer;
