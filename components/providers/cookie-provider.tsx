"use client";
import { useAuth } from "@clerk/nextjs";
import Cookies from "js-cookie";
const CookieProvider = () => {
	const { isLoaded, isSignedIn } = useAuth();

	const isAuthenticated = isSignedIn && isLoaded;
	const basket = Cookies.get("basket");
	if (isAuthenticated && basket) {
		Cookies.remove("basket");
	}
	return null;
};

export default CookieProvider;
