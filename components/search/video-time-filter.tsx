"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
	items: z.array(z.string()).optional(),
});

const items = [
	{
		filter: "0_1",
		label: "0-1 Saat",
	},
	{
		filter: "1_6",
		label: "1-6 Saat",
	},
	{
		filter: "6_12",
		label: "6-12 Saat",
	},
	{
		filter: "12_+",
		label: "12+ Saat",
	},
];
const VideoTimeFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams().getAll("duration");
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
									key={item.filter}
									control={form.control}
									name="items"
									render={({ field }) => {
										return (
											<FormItem
												key={item.filter}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														checked={field.value?.includes(item.filter)}
														onCheckedChange={(checked) => {
															let videoItems;

															if (checked) {
																videoItems = field.onChange([
																	...field.value!,
																	item.filter,
																]);
															} else {
																videoItems = field.onChange(
																	field.value?.filter(
																		(value) => value !== item.filter
																	)
																);
															}

															const currentSearchParams =
																new URLSearchParams(
																	window.location.search
																);
															const values = form.getValues().items;

															currentSearchParams.delete("duration");
															values?.map((value) =>
																currentSearchParams.append(
																	"duration",
																	value
																)
															);
															const newUrl = `/search?${currentSearchParams.toString()}`;

															// Yeni URL ile sayfayı değiştir
															router.replace(newUrl);

															return videoItems;
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal">
													{item.label}
												</FormLabel>
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

export default VideoTimeFilter;
