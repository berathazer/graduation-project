import MainBrandCard from "@/components/main-brand-card";

import BrandAnimation from "@/components/brand-animation";
import { CardContent, CardTitle, CardDescription, CardHeader, Card } from "@/components/ui/card";
import Image from "next/image";
import NodeJs from "public/courses/node-js-course.png";
import CategoryImage from "public/categories/category-software.jpg";

import db from "@/lib/db";

const mockCourseData = [
	{
		title: "Node.js Web Geliştirme Kursu",
		instructors: ["Ahmet Yılmaz", "Elif Demir"],
		price: "₺389.99",
		imageUrl: NodeJs,
	},
	{
		title: "React ile Modern Web Uygulamaları",
		instructors: ["Mehmet Ak", "Zeynep Can"],
		price: "₺299.99",
		imageUrl: NodeJs,
	},
	{
		title: "Python ile Veri Bilimi Temelleri",
		instructors: ["Ayşe Kaya", "Emre Korkmaz"],
		price: "₺429.99",
		imageUrl: NodeJs,
	},
	{
		title: "Figma ile UI/UX Tasarım Masterclass",
		instructors: ["Lara Smith", "David White"],
		price: "₺249.99",
		imageUrl: NodeJs,
	},
	{
		title: "JavaScript Başlangıç Kursu",
		instructors: ["Eren Çetin", "Aslı Yılmaz"],
		price: "₺149.99",
		imageUrl: NodeJs,
	},
	{
		title: "Veritabanı Yönetimi ve SQL",
		instructors: ["Mert Kaymak", "Selin Duran"],
		price: "₺299.99",
		imageUrl: NodeJs,
	},
	{
		title: "Mobil Uygulama Geliştirme (React Native)",
		instructors: ["Emre Yıldırım", "Seda Doğan"],
		price: "₺349.99",
		imageUrl: NodeJs,
	},
	{
		title: "Yapay Zeka ve Makine Öğrenmesi",
		instructors: ["Deniz Arıkan", "Kerem Eren"],
		price: "₺499.99",
		imageUrl: NodeJs,
	},
	{
		title: "Web Güvenliği ve Ethical Hacking",
		instructors: ["Elif Güven", "Kaan Yıldız"],
		price: "₺399.99",
		imageUrl: NodeJs,
	},
	{
		title: "Mobil Oyun Geliştirme (Unity)",
		instructors: ["Ege Taşkın", "Melis Çelik"],
		price: "₺299.99",
		imageUrl: NodeJs,
	},
	{
		title: "Django ile Web Uygulama Geliştirme",
		instructors: ["Ali Cemal", "Sena Demir"],
		price: "₺389.99",
		imageUrl: NodeJs,
	},
	{
		title: "Veri Madenciliği ve Büyük Veri Analitiği",
		instructors: ["Yasin Kaya", "Selin Aslan"],
		price: "₺449.99",
		imageUrl: NodeJs,
	},
	{
		title: "UI/UX Tasarım ve Prototipleme",
		instructors: ["Beril Akçay", "Ahmet Yılmaz"],
		price: "₺249.99",
		imageUrl: NodeJs,
	},
	{
		title: "Frontend Web Geliştirme (Vue.js)",
		instructors: ["Mehmet Can", "Ayşe Yılmaz"],
		price: "₺329.99",
		imageUrl: NodeJs,
	},
	{
		title: "Veritabanı Yönetimi (MongoDB)",
		instructors: ["Sena Çelik", "Ali Demir"],
		price: "₺299.99",
		imageUrl: NodeJs,
	},
	{
		title: "Java Programlama Temelleri",
		instructors: ["Zeynep Yıldız", "Emir Kaya"],
		price: "₺199.99",
		imageUrl: NodeJs,
	},
];

const maxTitleLength = 50;
export default async function Home() {
	const categories = await db.category.findMany();
	return (
		<main className="w-full min-h-without_navbar flex flex-col gap-y-4 ">
			<section
				id="mainBrand"
				className="w-full md:h-[480px] lg:[540px] xl:h-without_navbar lg:px-16  bg-slate-50  flex gap-x-4 lg:py-16"
			>
				<div className="flex-1 flex items-center justify-center px-4 lg:px-0">
					<MainBrandCard className="bg-slate-50 border-none shadow-none" />
				</div>

				<BrandAnimation />
			</section>

			{/* Popüler Kategoriler */}
			<section
				id="popularCategories"
				className="px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-60 flex flex-col gap-y-8 py-24"
			>
				<p className="text-3xl font-bold text-muted-foreground">Popüler Kategoriler</p>
				<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-8">
					{categories.splice(0, 6).map((category) => (
						<div
							key={category.id}
							className="flex flex-col gap-y-2"
						>
							<div className="w-full h-[300px] relative">
								<Image
									alt={category.name}
									src={CategoryImage}
									fill
									className="object-fill"
								/>
							</div>
							<span className="font-medium text-xl">{category.name}</span>
						</div>
					))}
				</div>
			</section>
			{/* Popüler Kurslar */}
			<section
				id="popularCourses"
				className="px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-60 flex flex-col gap-y-8 py-24"
			>
				<p className="text-3xl font-bold text-muted-foreground">Size Özel Kurslar</p>
				<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 place-items-center gap-y-8 gap-x-5">
					{mockCourseData.map((course, i) => (
						<div
							key={i}
							className="w-full flex flex-col gap-y-2 h-[288px]"
						>
							{/* Resim */}
							<div className="w-full flex-1 max-h-44 bg-slate-200 relative object-fill">
								<Image
									alt={course.title}
									src={course.imageUrl}
									fill
								/>
							</div>
							{/* Kurs ismi */}
							<p className="font-bold">
								{course.title.length > maxTitleLength
									? course.title.slice(0, maxTitleLength) + "..."
									: course.title}
							</p>

							<p className="text-[12px] text-black/70">{course.instructors.join(",")}</p>
							<p className="font-bold text-black/80">{course.price}</p>
						</div>
					))}
				</div>
			</section>

			{/* Öne Çıkan Özellikler */}
			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-24">
				<div className="container px-4 md:px-6  md:pt-0">
					<div className="grid gap-2 md:gap-6 items-center">
						<div className="flex flex-col justify-center space-y-8 text-center">
							<div className="">
								<p className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-900 py-6">
									Öne Çıkan Özelliklerimizi Keşfedin
								</p>
								<p className="max-w-[600px]  md:text-xl dark:text-zinc-100 mx-auto">
									Özelliklerimiz üretkenliğinizi artırmak ve işlerinizi kolaylaştırmak
									için tasarlanmıştır.
								</p>
							</div>
							<div className="w-full max-w-full space-y-4 mx-auto">
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
									<div className="flex flex-col items-center space-y-2  p-2 rounded-lg">
										<svg
											className="  h-6 w-6 mb-2   rounded-full"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
											<path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
										</svg>
										<h2 className="text-xl font-bold ">
											Öğrenci İlerleme Analitiği
										</h2>
										<p className=" dark:text-zinc-100">
											İlerleme analitiği sayesinde kurslarınızı takip
											edebilirsiniz.
										</p>
									</div>

									<div className="flex flex-col items-center space-y-2  p-2 rounded-lg">
										<svg
											className="  h-6 w-6 mb-2   rounded-full"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="m8 6 4-4 4 4" />
											<path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
											<path d="m20 22-5-5" />
										</svg>
										<h2 className="text-xl font-bold ">Öğrenci Topluluğu</h2>
										<p className=" dark:text-zinc-100">
											Kursların altında diğer öğrencilerle kurslar hakkında
											yorumlarda bulunun.
										</p>
									</div>

									<div className="flex flex-col items-center space-y-2  p-2 rounded-lg">
										<svg
											className="  h-6 w-6 mb-2   rounded-full"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
											<circle
												cx="12"
												cy="12"
												r="3"
											/>
										</svg>
										<h2 className="text-xl font-bold ">Kişisel Öğrenme Yolculuğu</h2>
										<p className=" dark:text-zinc-100">
											Platformumuz, ilgi alanlarınıza uygun kurslar önererek
											eğitiminizi kişiselleştirir.
										</p>
									</div>

									<div className="flex flex-col items-center space-y-2  p-2 rounded-lg">
										<svg
											className="  h-6 w-6 mb-2   rounded-full"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<circle
												cx="11"
												cy="11"
												r="8"
											/>
											<path d="m21 21-4.3-4.3" />
										</svg>
										<h2 className="text-xl font-bold">Güçlü Arama</h2>
										<p className="dark:text-zinc-100">
											Aradığınız kursu saniyeler içinde bulun.
										</p>
									</div>

									<div className="flex flex-col items-center space-y-2  p-2 rounded-lg">
										<svg
											className="  h-6 w-6 mb-2   rounded-full"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<rect
												height="11"
												rx="2"
												ry="2"
												width="18"
												x="3"
												y="11"
											/>
											<path d="M7 11V7a5 5 0 0 1 10 0v4" />
										</svg>
										<h2 className="text-xl font-bold">Güvenlik</h2>
										<p className="dark:text-zinc-100">
											Verileriniz her zaman güvende ve korunmuş olur.
										</p>
									</div>

									<div className="flex flex-col items-center space-y-2  p-2 rounded-lg">
										<svg
											className="  h-6 w-6 mb-2   rounded-full"
											fill="none"
											height="24"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											width="24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="m8 6 4-4 4 4" />
											<path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
											<path d="m20 22-5-5" />
										</svg>
										<h2 className="text-xl font-bold">Güvenli Ödeme</h2>
										<p className="dark:text-zinc-100">
											Ödeme işlemlerinizde verileriniz her zaman koruma altında.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Yorumlar */}
			<section className="w-full py-16 flex flex-col gap-y-6 px-4 md:px-60">
				<p className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-900 py-6 text-center">
					Topluluktan Güncel Yorumlar
				</p>

				<div className="grid w-full  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="max-w-lg mx-auto  rounded-sm shadow-offset-black ">
						<Card className="p-6 font-poppins ">
							<CardContent className="text-lg relative text-black/80 pt-4">
								<svg
									className=" absolute -top-0 left-0 text-20xl text-muted-foreground"
									fill="none"
									height="24"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
									<path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
								</svg>
								{
									"Generating a testimonial card component with a prompt-driven interface is pretty cool... Well done, Vercel!"
								}
							</CardContent>
							<CardHeader className="pt-0">
								<div className="flex items-center">
									<Image
										alt="John Doe's Avatar"
										className="mr-2 rounded-full"
										height="40"
										src="https://github.com/shadcn.png"
										style={{
											aspectRatio: "40/40",
											objectFit: "cover",
										}}
										width="40"
									/>
									<div>
										<CardTitle className="text-base">John Doe</CardTitle>
										<CardDescription>CEO, Example Corp.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>
					</div>

					<div className="max-w-lg mx-auto  rounded-sm shadow-offset-black ">
						<Card className="p-6 font-poppins ">
							<CardContent className="text-lg relative text-black/80 pt-4">
								<svg
									className=" absolute -top-0 left-0 text-20xl text-muted-foreground"
									fill="none"
									height="24"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
									<path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
								</svg>
								{
									"Generating a testimonial card component with a prompt-driven interface is pretty cool... Well done, Vercel!"
								}
							</CardContent>
							<CardHeader className="pt-0">
								<div className="flex items-center">
									<Image
										alt="John Doe's Avatar"
										className="mr-2 rounded-full"
										height="40"
										src="https://github.com/shadcn.png"
										style={{
											aspectRatio: "40/40",
											objectFit: "cover",
										}}
										width="40"
									/>
									<div>
										<CardTitle className="text-base">John Doe</CardTitle>
										<CardDescription>CEO, Example Corp.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>
					</div>

					<div className="max-w-lg mx-auto  rounded-sm shadow-offset-black ">
						<Card className="p-6 font-poppins ">
							<CardContent className="text-lg relative text-black/80 pt-4">
								<svg
									className=" absolute -top-0 left-0 text-20xl text-muted-foreground"
									fill="none"
									height="24"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
									<path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
								</svg>
								{
									"Generating a testimonial card component with a prompt-driven interface is pretty cool... Well done, Vercel!"
								}
							</CardContent>
							<CardHeader className="pt-0">
								<div className="flex items-center">
									<Image
										alt="John Doe's Avatar"
										className="mr-2 rounded-full"
										height="40"
										src="https://github.com/shadcn.png"
										style={{
											aspectRatio: "40/40",
											objectFit: "cover",
										}}
										width="40"
									/>
									<div>
										<CardTitle className="text-base">John Doe</CardTitle>
										<CardDescription>CEO, Example Corp.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>
		</main>
	);
}
