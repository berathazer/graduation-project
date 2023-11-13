import db from "@/lib/db";
import React from "react";
import PageWrapper from "./PageWrapper";
import InstructorForm from "@/components/teachers/instructor/instructor-form";
import { Profile } from "@prisma/client";
import InstructorInfoCard from "@/components/teachers/instructor/instructor-info-card";

interface InstructorContainerProps {
	profile: Profile;
}

const cardDatas = [
	{
		title: "Kurs Oluşturun",
		description:
			"Uzmanlık alanınıza özel kurslarınızı oluşturun ve dünya genelinde öğrencilere ulaşın.",
	},
	{
		title: "Videolarınızı Yayınlayın",
		description:
			"Kurslarınıza video ekleyerek öğrencilerinize interaktif ve etkili bir öğrenme deneyimi sunun.",
	},
	{
		title: "Analitikleri Gözlemle",
		description:
			"Oluşturduğunuz kursların performansını takip edin, analizlerle öğrenci ilerlemesini gözlemleyin.",
	},
];

const InstructorContainer = async ({ profile }: InstructorContainerProps) => {
	const instructor = await db.instructor.findFirst({
		where: {
			profileId: profile.id || "",
		},
	});

	return (
		<div className="min-h-without_navbar">
			<PageWrapper>
				<div className="grid grid-cols-2 py-12">
					<div className="col-span-2 hidden md:flex py-8 px-2 order-2 md:order-1  md:col-span-1  flex-col shadow-lg border">
						{cardDatas.map((card, index) => (
							<InstructorInfoCard
								key={index}
								title={card.title}
								description={card.description}
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
