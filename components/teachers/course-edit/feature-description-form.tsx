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
import { cn } from "@/lib/utils";

import Editor from "../../editor";
import { Chapter, CourseFeature } from "@prisma/client";
import Preview from "../../preview";

interface FeatureDescriptionFormProps {
	initialData?: CourseFeature | null;
	courseId?: string | null;
	featureId?: string | null;
}

const formSchema = z.object({
	description: z.string().min(1, {
		message: "Bölüm Açıklaması Zorunludur",
	}),
});

export const FeatureDescriptionForm = ({
	initialData,
	courseId,
	featureId,
}: FeatureDescriptionFormProps) => {
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
			await axios.patch(`/api/courses/${courseId}/feature/${featureId}`, values);
			toast.success("Kurs Güncellendi");
			toggleEdit();
			router.refresh();
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	const onDoubleClick = () => {
		setIsEditing(true);
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Kursun Ayrıntılı Açıklaması*
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
				<div
					className={cn("text-sm mt-2", !initialData?.description && "text-slate-500 italic")}
				>
					{!initialData?.description && "Açıklama Yok"}
					{initialData?.description && (
						<Preview
							value={initialData?.description.slice(0, 300) + " ..."}
							onDoubleClick={onDoubleClick}
						/>
					)}
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
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Editor {...field} />
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
