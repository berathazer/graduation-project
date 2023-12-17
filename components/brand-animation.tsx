"use client";
// @ts-ignore
import animationData from "public/animation.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import React, { useEffect, useState } from "react";

const BrandAnimation = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-1 items-start py-4 md:py-12 xl:py-0 2xl:py-0  ">
      <Lottie
        animationData={animationData}
        className="object-contain"
      />
    </div>
  );
};

export default BrandAnimation;
