"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { CourseWithCategory } from "@/types/global.types";

interface ImageFormProps {
	initialData: string | null;
	categoryId: string;
}

const formSchema = z.object({
	imageUrl: z.string().min(1, {
		message: "Kurs Resmi Gereklidir",
	}),
});

export const CategoryImageForm = ({ initialData, categoryId }: ImageFormProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/admin/category/${categoryId}`, values);
			toast.success("Kurs Güncellendi");
			toggleEdit();
			router.refresh();
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				<span className="flex items-center gap-x-2">
					Kategori Resmi
					{initialData ? <Check className="w-5 h-5 text-green-600" /> : "*"}
				</span>
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing && <>İptal</>}
					{!isEditing && !initialData && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Resim Ekleyin
						</>
					)}
					{!isEditing && initialData && (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Resmi Düzenleyin
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData ? (
					<div className="flex items-center justify-center h-52 bg-slate-200 rounded-md">
						<ImageIcon className="h-10 w-10 text-slate-500" />
					</div>
				) : (
					<div className="relative  mt-2 h-52">
						<Image
							alt="Upload"
							fill
							className="object-fill rounded-md"
							src={initialData}
						/>
					</div>
				))}
			{isEditing && (
				<div className="h-52">
					<FileUpload
						endpoint="courseImage"
						onChange={(url) => {
							if (url) {
								onSubmit({ imageUrl: url });
							}
						}}
					/>
					<div className="text-xs text-muted-foreground mt-4">16:9 en boy oranı önerilir</div>
				</div>
			)}
		</div>
	);
};
