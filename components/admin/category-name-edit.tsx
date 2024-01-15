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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CourseWithCategory } from "@/types/global.types";
import { formatCategoryNameToUrl } from "@/lib/helpers";

interface TitleFormProps {
	initialName: string;
	categoryId: string;
}

const formSchema = z.object({
	name: z.string().min(3, {
		message: "Kategori İsmi Zorunludur",
	}),
});

export const CategoryNameEdit = ({ initialName, categoryId }: TitleFormProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialName,
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/admin/category/${categoryId}`, values);
			toast.success("Kategori İsmi Güncellendi");
			toggleEdit();
			router.refresh();
		} catch (err: any) {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4 grid-cols-1">
			<div className="font-medium flex items-center justify-between">
				<span className="flex items-center gap-x-2">
					Kategori İsmi
					{initialName ? <Check className="w-5 h-5 text-green-600" /> : "*"}
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
							İsmi Düzenle
						</>
					)}
				</Button>
			</div>
			{!isEditing && <p className="text-sm mt-2">{initialName}</p>}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. 'Yazılım Geliştirme'"
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
