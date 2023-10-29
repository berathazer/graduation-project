"use client";
import React from "react";

import MuxPlayer from "@mux/mux-player-react";

const DenemePage = () => {
	const videoUrl = "https://uploadthing.com/f/768805a4-0505-414b-ba9d-82dd8accff39-z1hsq5.mp4";

	return (
		<div className="min-h-without_navbar p-6">
			<div className="w-80 h-80">
				<MuxPlayer
					playbackId="955BNlSl00HadeRZpYk6MHpeojzj01SNBWdNVWZzVYeqc"
					metadata={{
						video_id: "video-id-123456",
						video_title: "Bick Buck Bunny",
						viewer_user_id: "user-id-bc-789",
					}}
					streamType="on-demand"
				/>
			</div>
		</div>
	);
};

export default DenemePage;
