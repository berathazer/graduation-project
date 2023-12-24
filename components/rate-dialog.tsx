"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import SelectRating from "./courses/select-rating";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "./ui/textarea";

import toast from "react-hot-toast";
import axios from "axios";
import { Review } from "@prisma/client";
import CourseRating from "./courses/course-rating";
import { useRouter } from "next/navigation";
import { Rating } from "@smastrom/react-rating";

interface RateDialogProps {
	courseId: string;
	profileId?: string;
	initialData: Review | null;
}

const formSchema = z.object({
	review: z
		.string()
		.min(10, { message: "Yorumunuz en az 10 karakterden oluşmalı" })
		.max(1000, { message: "Yorumunuz maksimum 1000 karakter olabilir" }),
	rating: z.number().min(1).max(5),
});

const RateDialog = ({ courseId, profileId, initialData }: RateDialogProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			review: initialData?.comment ?? "",
			rating: initialData?.rating,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			const res = await axios.put(`/api/courses/${courseId}/review`, values);

			toast.success("Yorum Eklendi");

			//dialogu manuel kapatma
			document.getElementById("closeDialog")?.click();


			router.refresh();
		} catch (error) {
			toast.error("Beklenmeyen Bir Hata Oluştu.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex flex-col items-end justify-end text-xs gap-y-1 cursor-pointer ">
					{!!initialData ? (
						<>
							<Rating
								value={initialData.rating}
								style={{ maxWidth: 80 }}
								readOnly
							/>

							<span>Oyunuz</span>
						</>
					) : (
						<>
							<Rating
								value={0}
								style={{ maxWidth: 80 }}
								readOnly
							/>

							<span>Kursu oylayın</span>
						</>
					)}
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center text-2xl">
						Bu kursu nasıl değerlendirirsiniz?
					</DialogTitle>
				</DialogHeader>
				<div className="py-4">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="rating"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<SelectRating
												rating={field.value}
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="review"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												rows={4}
												className="rounded-none"
												placeholder="Bize bu kursu almakla ilgili kişisel deneyiminizden bahsedin. Sizin için iyi bir eşleşme miydi?"
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex items-center justify-end">
								<Button
									disabled={isLoading}
									type="submit"
								>
									Gönder
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default RateDialog;
