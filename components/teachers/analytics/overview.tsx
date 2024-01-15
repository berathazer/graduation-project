"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
	data: {
		month: string;
		total: number;
	}[];
}
export function Overview({ data }: OverviewProps) {
	return (
		<ResponsiveContainer
			width="100%"
			height={350}
		>
			<BarChart data={data}>
				<XAxis
					dataKey="month"
					stroke="#888888"
					fontSize={12}
					tickLine={true}
					axisLine={true}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={true}
					axisLine={true}
					tickFormatter={(value) => `${value}TL`}
				/>
				<Bar
					dataKey="total"
					fill="#10b981"
					radius={[4, 4, 0, 0]}
					className="hover:cursor-pointer"
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
