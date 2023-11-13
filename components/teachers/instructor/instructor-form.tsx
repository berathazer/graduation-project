"use client";
import * as React from "react";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { without_focus } from "@/lib/constant";
import { Textarea } from "@/components/ui/textarea";
import { Profile } from "@prisma/client";
import Editor from "@/components/editor";
import { Checkbox } from "@/components/ui/checkbox";
const formSchema = z.object({
	name: z.string().min(2, {
		message: "Kurs Başlığı Zorunludur",
	}),
	surname: z.string().min(2, {
		message: "Kurs Başlığı Zorunludur",
	}),
	headline: z.string().min(2, {
		message: "Kurs Başlığı Zorunludur",
	}),
	email: z.string().email({ message: "Geçeriz email formatı" }),
	biography: z.string().min(255, { message: "Biyografi minimum 255 karakterden oluşmalı" }),
	termsAccepted: z.boolean().default(false),
});

interface InstructorFormProps {
	profile: Profile;
}

export default function InstructorForm({ profile }: InstructorFormProps) {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: profile.name.split(" ")[0],
			surname: profile.name.split(" ")[1],
			headline: "",
			email: profile.email,
			biography: "",
			termsAccepted: false,
		},
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			console.log("values:", values);
		} catch {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	return (
		<Card className="w-full p-2 rounded-none shadow-lg">
			<CardHeader>
				<CardTitle>Eğitmen Olun</CardTitle>
				<CardDescription>
					Formu hemen doldurarak eğitmenlik kariyerinize başlayın.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid w-full items-center gap-4">
							<div className="flex items-center gap-x-2">
								<div className="flex flex-1 flex-col space-y-1.5">
									<Label htmlFor="name">İsim</Label>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														disabled={isSubmitting}
														className={cn(without_focus)}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="flex flex-1 flex-col space-y-1.5">
									<Label htmlFor="name">Soyisim</Label>
									<FormField
										control={form.control}
										name="surname"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input
														disabled={isSubmitting}
														className={cn(without_focus)}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Uzmanlık Alanı</Label>
								<FormField
									control={form.control}
									name="headline"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													disabled={isSubmitting}
													className={cn(without_focus)}
													{...field}
													placeholder="örn. Android Geliştiricisi"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Email</Label>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													disabled={true}
													className={cn(without_focus)}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Biyografi</Label>
								<FormField
									control={form.control}
									name="biography"
									render={({ field }) => (
										<FormItem className="">
											<FormControl>
												<Editor {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex flex-col space-y-1.5">
								<FormField
									control={form.control}
									name="termsAccepted"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="flex items-center space-x-2">
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
														disabled={isSubmitting}
														className={cn(without_focus)}
														id="terms"
													/>
													<label
														htmlFor="terms"
														className="text-sm   peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														Şartlar ve koşulları kabul ediyormusunuz ?
													</label>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex justify-end">
								<Button>Onayla</Button>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
