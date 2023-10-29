"use client";
import React, { useMemo } from "react";

import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
	value: string;
	onDoubleClick: () => void;
}

const Preview = ({ value, onDoubleClick }: PreviewProps) => {
	const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

	return (
		<div
			className="border"
			onDoubleClick={onDoubleClick}
		>
			<ReactQuill
				theme="bubble"
				value={value}
				readOnly={true}
			/>
		</div>
	);
};

export default Preview;
