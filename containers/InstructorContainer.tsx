import db from "@/lib/db";
import React from "react";
import PageWrapper from "./PageWrapper";
import InstructorForm from "@/components/teachers/instructor/instructor-form";
import { Profile } from "@prisma/client";

interface InstructorContainerProps {
	profile: Profile;
}

const InstructorContainer = async ({ profile }: InstructorContainerProps) => {
	const instructor = await db.instructor.findFirst({
		where: {
			profileId: profile.id || "",
		},
	});

	return (
		<div className="min-h-without_navbar">
			<PageWrapper>
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-1">
						<div>
							<span>Kurs Oluşturun</span>
							<p>
								Uzmanlık alanınıza özel kurslarınızı oluşturun ve dünya genelinde
								öğrencilere ulaşın.
							</p>
						</div>

						<div>
							<span>Video Yayınlayın</span>
							<p>
								Kurslarınıza video ekleyerek öğrencilerinize interaktif ve etkili bir
								öğrenme deneyimi sunun.
							</p>
						</div>

						<div>
							<span>Analitikleri Gözlemle</span>
							<p>
								Oluşturduğunuz kursların performansını takip edin, analizlerle öğrenci
								ilerlemesini gözlemleyin.
							</p>
						</div>
					</div>
					<div className="col-span-1 flex items-center justify-center">
						<InstructorForm profile={profile} />
					</div>
				</div>
			</PageWrapper>
		</div>
	);
};

export default InstructorContainer;
