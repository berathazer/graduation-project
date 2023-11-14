"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormLabel,
	FormMessage,
	FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	title: z.string().min(4, {
		message: "Kurs başlığı en az 4 karakterden oluşmalı",
	}),
});

const CourseCreatePage = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post("/api/courses", values);

			if (!response.data.success) {
				return toast.error(response.data.error);
			}

			if (response.data.success) {
				form.reset();
				router.push(`/teacher/courses/${response.data.course.id}`);
				router.refresh();
				return toast.success("Kurs Oluşturuldu.");
			}
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu.");
		}
	};

	return (
		<div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
			<div className="flex flex-col gap-y-2 md:gap-y-4">
				<h1 className="text-3xl font-medium">Kursunuzu İsimlendirin</h1>
				<p className="text-base text-slate-600">
					Kursunuza hangi ismi vermek istersiniz? Merak etmeyin istediğiniz zaman
					değiştirebilirsiniz.
				</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 mt-8"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Kurs Başlığı</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. 'İleri Seviye Web'"
											{...field}
										/>
									</FormControl>
									<FormDescription>Bu kursta ne öğreteceksiniz?</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center gap-x-2">
							<Link href="/teacher">
								<Button
									type="button"
									variant="ghost"
								>
									İptal
								</Button>
							</Link>
							<Button
								type="submit"
								disabled={!isValid || isSubmitting}
							>
								Devam Et
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default CourseCreatePage;
