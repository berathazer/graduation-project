"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Difficulty } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
	items: z.array(z.string()).optional(),
});

const items = Array.from(Object.keys(Difficulty));
const LevelFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams().getAll("level");
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: [...searchParams],
		},
	});

	return (
		<Form {...form}>
			<form className="space-y-8">
				<FormField
					control={form.control}
					name="items"
					render={() => (
						<FormItem>
							{items.map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="items"
									render={({ field }) => {
										return (
											<FormItem
												key={item}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(item)}
														onCheckedChange={(checked) => {
															let levelItems;

															if (checked) {
																levelItems = field.onChange([
																	...field.value!,
																	item,
																]);
															} else {
																levelItems = field.onChange(
																	field.value?.filter(
																		(value) => value !== item
																	)
																);
															}

															const values = form.getValues().items;

															// Mevcut search parametrelerini al
															const currentSearchParams =
																new URLSearchParams(
																	window.location.search
																);

															currentSearchParams.delete("level");
															values?.forEach((item) => {
																currentSearchParams.append(
																	"level",
																	item
																);
															});

															const newUrl = `/search?${currentSearchParams.toString()}`;

															router.replace(newUrl);

															return levelItems;
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal">{item}</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default LevelFilter;
