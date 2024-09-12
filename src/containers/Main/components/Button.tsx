import React, { ReactNode } from "react";
import classNames from "classnames";
import { Button, ButtonProps as NextUIButtonProps } from "@nextui-org/react";

interface IButtonProps extends NextUIButtonProps {
  children: ReactNode;
  className?: string;
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
