"use client";
import React, { useMemo } from "react";

import dynamic from "next/dynamic";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
	value: string;
	onDoubleClick?: () => void;
	className?: string;
}

const Preview = ({ value, onDoubleClick, className }: PreviewProps) => {
	const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);

	return (
		<div
			className={className}
			onDoubleClick={onDoubleClick}
		>
			<ReactQuill
				theme="bubble"
				value={value}
				readOnly={true}
				className="!text-2xl "
			/>
		</div>
	);
};

export default Preview;
