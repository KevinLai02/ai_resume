import React from "react";
import classNames from "classnames";

interface IProps {
  className?: string;
}

export default function Input({ className, ...props }: IProps) {
  return (
    <input
      {...props}
      className={classNames([
        "w-full border:none rounded-xl p-2 focus:outline-none",
        className,
      ])}
      type="text"
    />
  );
}
