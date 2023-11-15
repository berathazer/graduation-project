import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";

interface AnalysisCardProps {
	title: string;
	Icon: LucideIcon;
	sub_title: string;
	body: string;
}

const AnalysisCard = ({ body, Icon, sub_title, title }: AnalysisCardProps) => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{body}</div>
				<p className="text-xs text-muted-foreground">{sub_title}</p>
			</CardContent>
		</Card>
	);
};

export default AnalysisCard;
