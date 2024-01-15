"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "../file-upload";
import z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	name: z.string().min(2).max(75),
	url: z.string().min(2).max(100),
	imageUrl: z.string().nullable(),
});

const CreateCategoryDialog = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			url: "",
			imageUrl: "",
		},
	});
	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.post(`/api/admin/category`, values);
			toast.success("Kategori Eklendi.");
			document.getElementById("categoryDialog")?.click();
			router.refresh();
		} catch (error) {
			console.log(error);

			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="w-max">
					<Button className="">Kategori Ekle</Button>
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Yeni Kategori Ekle</DialogTitle>
					<DialogDescription>
						Gerekli kategori bilgilerini eksiksiz doldurunuz.
					</DialogDescription>
				</DialogHeader>

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
										<div className="flex flex-col gap-y-2">
											<Label htmlFor="name">Kategori Adı*</Label>
											<Input
												defaultValue="Pedro Duarte"
												className="col-span-3"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex flex-col gap-y-2">
											<Label htmlFor="url">Kategori Url*</Label>
											<Input
												defaultValue="Pedro Duarte"
												className="col-span-3"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{form.getValues().imageUrl ? (
							<div className="flex flex-col gap-y-4">
								<Label htmlFor="name">Kategori Resmi</Label>
								<div className="h-52 w-full relative border rounded-md">
									<Image
										alt="image"
										src={form.getValues().imageUrl!}
										fill
									/>
								</div>
							</div>
						) : (
							<FormField
								control={form.control}
								name="imageUrl"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="flex flex-col">
												<Label htmlFor="name">Kategori Resmi</Label>
												<div className="h-52">
													<FileUpload
														endpoint="courseImage"
														onChange={(url) => {
															if (url) {
																field.onChange(url);
															}
														}}
													/>
													<div className="text-xs text-muted-foreground mt-4">
														16:9 en boy oranı önerilir
													</div>
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}

						<div className="flex items-center justify-end">
							<Button
								disabled={!isValid || isSubmitting}
								type="submit"
							>
								Kategori Oluştur
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
			<DialogClose id="categoryDialog"></DialogClose>
		</Dialog>
	);
};

export default CreateCategoryDialog;
