import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

interface ConfirmModalProps {
	children: React.ReactNode;
	onConfirm: () => void;
	title?: string;
	description?: React.ReactNode;
	isLoading?: boolean;
}

export function ConfirmModal({ children, onConfirm, description, title, isLoading }: ConfirmModalProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>İptal</AlertDialogCancel>

					<Button
						variant={"destructive"}
						onClick={onConfirm}
						disabled={isLoading}
					>
						Sil
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
