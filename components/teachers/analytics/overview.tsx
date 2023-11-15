"use client";

import { formatProductPrice } from "@/lib/helpers";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
	{
		month: "Oca",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "Şub",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "Mar",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "Nis",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "May",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "Haz",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "Tem",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "Ağu",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "Eyl",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "Eki",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "Kas",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		month: "Ara",
		total: Math.floor(Math.random() * 5000) + 1000,
	},
];

export function Overview() {
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
