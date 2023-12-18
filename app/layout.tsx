import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar/navbar";

import Footer from "@/components/layout/footer/footer";

import ControlNavbar from "@/components/layout/navbar/control-navbar";
import { Toaster } from "react-hot-toast";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

import { trTR } from "@clerk/localizations";

import CookieProvider from "@/components/providers/cookie-provider";
import PageLoadingProvider from "@/components/providers/page-loading-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider localization={trTR}>
			<html
				lang="en"
				suppressHydrationWarning
			>
				<body className={inter.className}>
					<Toaster />
					<ConfettiProvider />
					<PageLoadingProvider />

					<CookieProvider />
					{/* Öğretmen panelinde navbarı iptal etmek için bu componenti kullanıyorum */}
					<ControlNavbar>
						<Navbar />
					</ControlNavbar>

					{children}
					<ControlNavbar>
						<Footer />
					</ControlNavbar>
				</body>
			</html>
		</ClerkProvider>
	);
}
