import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className="w-full bg-gray-800 text-white py-8">
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-xl font-bold mb-4">Navigation</h3>
						<ul className="space-y-2">
							<li>
								<Link
									className="hover:underline"
									href="#"
								>
									Courses
								</Link>
							</li>
							<li>
								<Link
									className="hover:underline"
									href="#"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									className="hover:underline"
									href="#"
								>
									Contact Us
								</Link>
							</li>
							<li>
								<Link
									className="hover:underline"
									href="#"
								>
									Blog
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-xl font-bold mb-4">Follow Us</h3>
						<div className="flex space-x-4">
							<Link href="#">
								<svg
									className=" h-6 w-6"
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
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
								</svg>
							</Link>
							<Link href="#">
								<svg
									className=" h-6 w-6"
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
									<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
								</svg>
							</Link>
							<Link href="#">
								<svg
									className=" h-6 w-6"
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
										height="20"
										rx="5"
										ry="5"
										width="20"
										x="2"
										y="2"
									/>
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
									<line
										x1="17.5"
										x2="17.51"
										y1="6.5"
										y2="6.5"
									/>
								</svg>
							</Link>
							<Link href="#">
								<svg
									className=" h-6 w-6"
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
									<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
									<rect
										height="12"
										width="4"
										x="2"
										y="9"
									/>
									<circle
										cx="4"
										cy="4"
										r="2"
									/>
								</svg>
							</Link>
						</div>
					</div>
					<div>
						<h3 className="text-xl font-bold mb-4">Contact Us</h3>
						<p className="text-white">1234 Street Name, City, State</p>
						<p className="text-white">contact@ecommercelearning.com</p>
						<p className="text-white">(123) 456-7890</p>
					</div>
				</div>
				<div className="border-t border-gray-700 mt-8 pt-8 text-center">
					<p className="text-sm text-gray-400">
						© 2023 E-Commerce Learning Platform. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
