"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { CourseWithCategory } from "@/types/global.types";
import GenerateDescriptionButton from "./generate-description-button";

interface DescriptionFormProps {
	initialData: CourseWithCategory | null;
	courseId: string;
}

const formSchema = z.object({
	description: z.string().min(1, {
		message: "Kurs Açıklaması Zorunludur",
	}),
});

export const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: initialData?.description || "",
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/courses/${courseId}`, values);
			toast.success("Kurs Güncellendi");
			toggleEdit();
			router.refresh();
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	const handleDescriptionUpdate = (description: string) => {
		form.setValue("description", description);
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				<span className="flex items-center gap-x-2">
					Kurs Açıklaması
					{initialData?.description ? <Check className="w-5 h-5 text-green-600" /> : "*"}
				</span>
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing ? (
						<>İptal</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Açıklamayı Düzenle
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<p className={cn("text-sm mt-2", !initialData?.description && "text-slate-500 italic")}>
					{initialData?.description || "Açıklama Yok"}
				</p>
			)}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											disabled={isSubmitting}
											placeholder="e.g. 'This course is about...'"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-between gap-x-2">
							<Button
								disabled={!isValid || isSubmitting}
								type="submit"
							>
								Kaydet
							</Button>

							<GenerateDescriptionButton setDescription={handleDescriptionUpdate} />
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};
