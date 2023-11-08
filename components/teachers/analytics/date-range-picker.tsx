"use client";
import * as React from "react";
import { addDays, format, subMonths, setDefaultOptions } from "date-fns";
import { DateRange } from "react-day-picker";
import { tr } from "date-fns/locale"; // Türkçe yerel ayarı ekledik
import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export function CalendarDateRangePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: subMonths(new Date(), 1),
		to: new Date(),
	});

	setDefaultOptions({ locale: tr }); // Türkçe yerel ayarı varsayılana ayarla

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-[260px] justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Tarih Seçin</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="w-auto p-0"
					align="end"
				>
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={3}
						locale={tr}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
