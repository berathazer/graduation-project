"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { getBasketFromCookies, isExistFromCookies, isExistFromDb } from "@/lib/basket";
import { Basket } from "@prisma/client";
interface AddBasketButtonProps {
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
	basketId?: string;
	basket: Basket[];
	favoriteId?: string;
}
const AddBasketButton = ({ className, courseId, basket, favoriteId }: AddBasketButtonProps) => {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();
	const cookieBasket = getBasketFromCookies();
	const [isLoading, setIsLoading] = useState(false);
	const isAuthenticated = isLoaded && isSignedIn;

	const addCourseToBasket = async () => {
		setIsLoading(true);
		try {
			if (!courseId) {
				throw new Error();
			}

			if (!isAuthenticated) {
				addCookies();
			} else {
				const res = await axios.post("/api/profile/basket", { courseId, favoriteId });
				toast.success(res.data.message);
				router.refresh();
			}
		} catch (error) {
			toast.error("Beklenmeyen Bir Hata Oluştu Tekrar Deneyin");
		} finally {
			setIsLoading(false);
		}
	};

	const addCookies = () => {
		let basket: any[] = [];

		let existingBasket = Cookies.get("basket");

		if (!existingBasket) {
			if (!basket.includes(courseId)) {
				basket.push(courseId);
				Cookies.set("basket", JSON.stringify(basket));
				router.refresh();
				return;
			}
		}

		basket = JSON.parse(existingBasket!);
		if (!basket.includes(courseId)) {
			basket.push(courseId);
			Cookies.set("basket", JSON.stringify(basket));
			toast.success("Sepete Eklendi.");
		}
		router.refresh();
	};

	const goToBasket = () => {
		router.push("/basket");
	};

	let courseExistingBasket;
	if (!isAuthenticated) {
		courseExistingBasket = isExistFromCookies(cookieBasket, courseId);
	} else {
		courseExistingBasket = isExistFromDb(basket, courseId);
	}

	return (
		<>
			<SignedOut>
				{!courseExistingBasket ? (
					<Button
						className={className}
						onClick={() => addCourseToBasket()}
					>
						Sepete Ekle
					</Button>
				) : (
					<Button
						className={className}
						onClick={goToBasket}
					>
						Sepete Git
					</Button>
				)}
			</SignedOut>

			<SignedIn>
				{!courseExistingBasket ? (
					<Button
						className={className}
						onClick={() => addCourseToBasket()}
						disabled={isLoading}
					>
						Sepete Ekle
					</Button>
				) : (
					<Button
						className={className}
						onClick={goToBasket}
					>
						Sepete Git
					</Button>
				)}
			</SignedIn>
		</>
	);
};

export default AddBasketButton;
