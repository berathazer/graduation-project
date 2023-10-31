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
}

export function ConfirmModal({ children, onConfirm }: ConfirmModalProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Bölümü Silmek İstediğinize Emin misiniz?</AlertDialogTitle>
					<AlertDialogDescription>
						Bu işlem, <strong>bölümü</strong> kursunuzdan kalıcı olarak silecektir ve işlem
						geri alınamaz.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>İptal</AlertDialogCancel>

					<Button
						variant={"destructive"}
						onClick={onConfirm}
					>
						Sil
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
