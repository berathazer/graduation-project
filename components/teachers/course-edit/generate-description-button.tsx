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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
	content: z.string().min(1, {
		message: "Kurs Açıklaması Zorunludur",
	}),
});

interface GenerateDescriptionButtonProps {
	setDescription: (description: string) => void;
}

const GenerateDescriptionButton = ({ setDescription }: GenerateDescriptionButtonProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: "",
		},
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { isValid } = form.formState;

	const disabled = !isValid || isSubmitting;
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsSubmitting(true);
			const res = await axios.post("/api/openai/description", values);

			const description = res.data.description;
			setDescription(description);
			toast.success("Açıklama güncellendi");
			document.getElementById("descriptionDialog")?.click();
		} catch (err: any) {
			console.log("beklenmeyen bir hata oluştu..!:", err.message);

			toast.error("Beklenmeyen Bir Hata Oluştu");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="ml-auto"
				>
					Yapay Zekaya Sor?
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Yapay Zeka Açıklama Oluştursun</DialogTitle>
					<DialogDescription>
						Kursunuz hakkında kısa bir açıklama yazın ve bırakın yapay zeka sizin için
						kursunuza açıklama oluştursun.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							e.stopPropagation();
							const content = form.getValues().content;
							await onSubmit({ content });

							console.log("form submitted:", content);
						}}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex flex-col gap-y-4">
											<Label>Açıklama</Label>
											<Textarea
												disabled={isSubmitting}
												placeholder="'Bu kurs ... hakkındadır.'"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center justify-end gap-x-2">
							{isSubmitting ? (
								<Loader2 className="w-8 h-8 animate-spin" />
							) : (
								<Button
									disabled={disabled}
									type="submit"
								>
									Oluştur
								</Button>
							)}
						</div>
					</form>
				</Form>
			</DialogContent>
			<DialogClose id="descriptionDialog"></DialogClose>
		</Dialog>
	);
};

export default GenerateDescriptionButton;
