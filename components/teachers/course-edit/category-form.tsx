"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";

interface CategoryFormProps {
	initialData: Course | null;
	courseId: string;
	options: { label: string; value: string }[];
}

const formSchema = z.object({
	categoryId: z.string().min(1),
});

export const CategoryForm = ({ initialData, courseId, options }: CategoryFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			categoryId: initialData?.categoryId || "",
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

	const selectedOption = options.find((option) => option.value === initialData?.categoryId);

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				<span className="flex items-center gap-x-2">
					Kurs Kategorisi
					{initialData?.categoryId ? <Check className="w-5 h-5 text-green-600" /> : "*"}
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
							Kategoriyi Düzenle
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<p className={cn("text-sm mt-2", !initialData?.categoryId && "text-slate-500 italic")}>
					{selectedOption?.label || "Kategori Yok"}
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
							name="categoryId"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormControl className="w-full">
										<Combobox
											options={[...options]}
											{...field}
										/>
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
