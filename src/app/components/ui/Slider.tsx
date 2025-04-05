"use client";

import React from "react";

type SliderProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Slider = ({ min = 0, max = 100, step = 1, ...props }: SliderProps) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      {...props}
    />
  );
};
