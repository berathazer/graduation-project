"use client";
import React from "react";
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
}
const AddBasketButton = ({ className, courseId, basket }: AddBasketButtonProps) => {
	const router = useRouter();
	const { isLoaded, isSignedIn } = useAuth();
	const cookieBasket = getBasketFromCookies();

	const isAuthenticated = isLoaded && isSignedIn;

	const addCourseToBasket = async () => {
		try {
			if (!courseId) {
				throw new Error();
			}

			if (!isAuthenticated) {
				addCookies();
			} else {
				const res = await axios.post("/api/profile/basket", { courseId });
				toast.success(res.data.message);
				router.refresh();
			}
		} catch (error) {
			toast.error("Beklenmeyen Bir Hata Oluştu Tekrar Deneyin");
		}
	};

	const addCookies = () => {
		let basket: any[] = [];

		let existingBasket = Cookies.get("basket");

		if (!existingBasket) {
			if (!basket.includes(courseId)) {
				basket.push(courseId);
				Cookies.set("basket", JSON.stringify(basket));
				toast.success("Sepete Eklendi.");
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
	};

	const addDatabase = () => {};

	const goToCart = () => {
		router.push("/cart");
	};

	let courseExistinBasket;
	if (!isAuthenticated) {
		console.log("not-authenticated");
		courseExistinBasket = isExistFromCookies(cookieBasket, courseId);
	} else {
		console.log("authenticated");

		courseExistinBasket = isExistFromDb(basket, courseId);
	}

	return (
		<>
			<SignedOut>
				{!courseExistinBasket ? (
					<Button
						className={className}
						onClick={() => addCourseToBasket()}
					>
						Sepete Ekle
					</Button>
				) : (
					<Button
						className={className}
						onClick={goToCart}
					>
						Sepete Git
					</Button>
				)}
			</SignedOut>

			<SignedIn>
				{!courseExistinBasket ? (
					<Button
						className={className}
						onClick={() => addCourseToBasket()}
					>
						Sepete Ekle
					</Button>
				) : (
					<Button
						className={className}
						onClick={goToCart}
					>
						Sepete Git
					</Button>
				)}
			</SignedIn>
		</>
	);
};

export default AddBasketButton;
