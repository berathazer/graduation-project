"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Editor from "@/components/editor";
import { Instructor } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const editProfileFormSchema = z.object({
	firstName: z
		.string()
		.min(2, {
			message: "Ad en az 2 karakter olmalıdır.",
		})
		.max(30, {
			message: "Ad 30 karakterden uzun olmamalıdır.",
		}),
	lastName: z
		.string()
		.min(2, {
			message: "Soyad en az 2 karakter olmalıdır.",
		})
		.max(30, {
			message: "Soyad 30 karakterden uzun olmamalıdır.",
		}),
	email: z
		.string({
			required_error: "Lütfen görüntülemek için bir e-posta girin.",
		})
		.email(),
	headline: z
		.string()
		.min(2, {
			message: "Başlık en az 2 karakter olmalıdır.",
		})
		.max(30, {
			message: "Başlık 30 karakterden uzun olmamalıdır.",
		}),

	biography: z
		.string()
		.max(5000, { message: "Biyografi maximum 255 karakter olmalıdır." })
		.min(255, { message: "Biyografi minimum 255 karakter olmalıdır." }),
});

type EditProfileFormValues = z.infer<typeof editProfileFormSchema>;

interface EditProfileFormProps {
	instructor: Instructor;
	profileId: string;
}

const EditProfileForm = ({ instructor, profileId }: EditProfileFormProps) => {
	const router = useRouter();
	const form = useForm<EditProfileFormValues>({
		resolver: zodResolver(editProfileFormSchema),
		defaultValues: {
			email: instructor.email,
			firstName: instructor.firstName,
			lastName: instructor.lastName,
			headline: instructor.headline,
			biography: instructor.biography,
		},
		mode: "onChange",
	});

	const onSubmit = async (values: EditProfileFormValues) => {
		try {
			await axios.patch(`/api/profile/instructor/${instructor.id}`, values);
			router.refresh();
			toast.success("Profil Başarıyla Güncellendi");
		} catch (error) {
			toast.error("Beklenmeyen Bir Hata Oluştu");
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>İsim</FormLabel>
							<FormControl>
								<Input
									placeholder="shadcn"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Soyisim</FormLabel>
							<FormControl>
								<Input
									placeholder="shadcn"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="ornek@gmail.com"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="headline"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Uzmanlık Alanı</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="orn: Web Geliştirme"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="biography"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Uzmanlık Alanı</FormLabel>
							<FormControl>
								<Editor {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Profili Güncelle</Button>
			</form>
		</Form>
	);
};

export default EditProfileForm;
