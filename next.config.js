/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ["github.com", "utfs.io", "uploadthing.com", "img.clerk.com"],
	},
};

module.exports = nextConfig;
