import React, { ReactNode } from "react";
import classNames from "classnames";
import { Button } from "@nextui-org/react";

interface IButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

const CustomButton = ({ children, ...props }: IButtonProps) => {
  return (
    <Button
      {...props}
      type="button"
      className={classNames([
        "flex-1 border min-w-[350px] rounded-2xl",
        props.className,
      ])}
    >
      {children}
    </Button>
  );
};
export default CustomButton;
