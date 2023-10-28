"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Chapter } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { without_focus } from "@/lib/constant";
import { cn } from "@/lib/utils";

interface ChapterAccessFormProps {
	initialData: Chapter;
	courseId: string;
	chapterId: string;
}

const formSchema = z.object({
	isFree: z.boolean(),
});

export const ChapterAccessForm = ({ initialData, courseId, chapterId }: ChapterAccessFormProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			isFree: initialData.isFree,
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
			toast.success("Bölüm Güncellendi");
			toggleEdit();
			router.refresh();
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Bölüm Erişimi
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing ? (
						<>İptal</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Erişimi Düzenle
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<div className="text-sm mt-2 flex  items-center ">
					{initialData.isFree && "Bu bölüm izlemek için ücretsizdir."}
					{!initialData.isFree && "Bu bölüm izlemek için ücretlidir."}

					<div className="ml-auto">
						{form.getValues().isFree ? (
							<Badge
								className="flex items-center justify-center"
								variant={"destructive"}
							>
								Ücretsiz
							</Badge>
						) : (
							<Badge className="flex items-center justify-center">Ücretli</Badge>
						)}
					</div>
				</div>
			)}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="isFree"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex items-center space-x-2 px-2 py-2">
											<Checkbox
												id="isFree"
												checked={field.value}
												onCheckedChange={field.onChange}
												className={cn(without_focus, "w-5 h-5")}
											/>
											<div className="grid gap-1.5 leading-none">
												<label
													htmlFor="isFree"
													className="text-sm text-muted-foreground cursor-pointer"
												>
													Bölümü ücretsiz olarak göstermek için kutuyu
													işaretleyiniz. Aksi taktirde işareti kaldırınız.
												</label>
											</div>
											<div className="flex flex-col gap-y-2 min-w-max text-center">
												<span className="text-sm font-medium">Bölüm Durumu</span>
												{form.getValues().isFree ? (
													<Badge
														className="flex items-center justify-center"
														variant={"destructive"}
													>
														Ücretsiz
													</Badge>
												) : (
													<Badge className="flex items-center justify-center">
														Ücretli
													</Badge>
												)}
											</div>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Button
								disabled={!isValid || isSubmitting}
								type="submit"
							>
								Kaydet
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};
