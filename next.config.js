/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ["github.com"],
	},
};

module.exports = nextConfig;
