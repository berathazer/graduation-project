/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ["github.com", "utfs.io", "uploadthing.com"],
	},
};

module.exports = nextConfig;
