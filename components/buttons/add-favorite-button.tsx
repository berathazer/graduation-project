"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { strokeWidth } from "@/lib/constant";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { getBasketFromCookies, isIdExistFromDb } from "@/lib/basket";
import { Basket } from "@prisma/client";

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
	basket: Basket[];
}
const AddFavoriteButton = ({
	className,
	variant,
	courseId,
	isFavorite,
	favoriteId,
	basket,
}: AddFavoriteButtonProps) => {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const cookieBasket = getBasketFromCookies();

	const isAuthenticated = isLoaded && isSignedIn;

	let existingBasketId = "";
	if (isAuthenticated) {
		existingBasketId = isIdExistFromDb(basket, courseId);
	}

	const addCourseToFavorites = async () => {
		setIsLoading(true);
		try {
			if (!courseId) {
				throw new Error();
			}

			if (!isLoaded || !isSignedIn) {
				return router.push("/sign-in");
			}

			const res = await axios.post("/api/profile/favorites", {
				courseId,
				basketId: existingBasketId,
			});

			toast.success(res.data.message);
			router.refresh();
		} catch (error) {
			toast.error("Beklenmeyen Bir Hata Oluştu Tekrar Deneyin");
		} finally {
			setIsLoading(false);
		}
	};

	const removeFromFavorites = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setIsLoading(true);
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
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{isFavorite ? (
				<Button
					variant={"favorite"}
					className={className}
					onClick={(e) => removeFromFavorites(e)}
					disabled={isLoading}
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
					disabled={isLoading}
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
