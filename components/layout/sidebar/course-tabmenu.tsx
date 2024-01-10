import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Attachment, Chapter, Profile, Review, UserProgress } from "@prisma/client";
import { CourseSidebarItem } from "./course-sidebar-item";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import CourseComment from "@/components/courses/course-comment";
import { ReviewWithProfile } from "@/types/global.types";

interface CourseTabmenuProps {
	courseId: string;
	chapter: Chapter;
	reviews: ReviewWithProfile;
	children: React.ReactNode;
	attachments: Attachment[];
}
const CourseTabmenu = ({ reviews, chapter, courseId, children, attachments }: CourseTabmenuProps) => {
	return (
		<Tabs
			defaultValue="overview"
			className="w-full"
		>
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="overview">Açıklama</TabsTrigger>
				<TabsTrigger value="reviews">Değerlendirmeler</TabsTrigger>
				<TabsTrigger value="sources">Kaynaklar</TabsTrigger>
			</TabsList>
			<TabsContent value="overview">{children}</TabsContent>
			<TabsContent value="reviews">
				<div className="py-4 flex flex-col gap-y-4">
					<p className="text-muted-foreground text-2xl">Kurs Değerlendirmeleri</p>
					{reviews.map((review) => (
						<CourseComment
							key={review.id}
							comment={review.comment!}
							createdAt={review.createdAt}
							imageUrl={review.user.imageUrl}
							name={review.user.name}
							rating={review.rating}
						/>
					))}
				</div>
			</TabsContent>
			<TabsContent value="sources">
				{!!attachments.length && (
					<>
						<div className="py-4 flex flex-col gap-y-4">
							<p className="text-muted-foreground text-2xl">Kurs Belgeleri</p>
							{attachments.map((attachment) => (
								<a
									href={attachment.url}
									target="_blank"
									key={attachment.id}
									className="flex items-center gap-x-4 p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
								>
									<File />
									<p className="line-clamp-1">{attachment.name}</p>
								</a>
							))}
						</div>
					</>
				)}
			</TabsContent>
		</Tabs>
	);
};

export default CourseTabmenu;
