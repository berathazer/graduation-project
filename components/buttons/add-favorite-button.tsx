"use client";
import React from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { strokeWidth } from "@/lib/constant";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface AddFavoriteButtonProps {
	className?: string;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link"
		| "showMore"
		| null
		| undefined;
	courseId: string;
	isFavorite: boolean;
	favoriteId?: string;
}
const AddFavoriteButton = ({
	className,
	variant,
	courseId,
	isFavorite,
	favoriteId,
}: AddFavoriteButtonProps) => {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();

	const addCourseToFavorites = async () => {
		try {
			if (!courseId) {
				throw new Error();
			}

			if (!isLoaded || !isSignedIn) {
				return router.push("/sign-in");
			}

			const res = await axios.post("/api/profile/favorites", { courseId });
			toast.success(res.data.message);
			router.refresh();
		} catch (error) {
			toast.error("Beklenmeyen Bir Hata Oluştu Tekrar Deneyin");
		}
	};

	const removeFromFavorites = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		try {
			if (!favoriteId) {
				throw new Error();
			}
			e.preventDefault();
			const res = await axios.delete(`/api/profile/favorites/${favoriteId}`);
			toast.success(res.data.message);
			router.refresh();
		} catch (error) {
			toast.error("Beklenmeyen Bir Hata Oluştu Tekrar Deneyin");
		}
	};

	return (
		<>
			{isFavorite ? (
				<Button
					variant={"favorite"}
					className={className}
					onClick={(e) => removeFromFavorites(e)}
				>
					<Heart
						className="w-4 h-4"
						strokeWidth={strokeWidth}
					/>
				</Button>
			) : (
				<Button
					variant={variant}
					className={className}
					onClick={() => addCourseToFavorites()}
				>
					<Heart
						className="w-4 h-4"
						strokeWidth={strokeWidth}
					/>
				</Button>
			)}
		</>
	);
};

export default AddFavoriteButton;
