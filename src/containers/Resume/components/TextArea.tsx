import React, { useRef } from "react";
import classNames from "classnames";

interface IProps {
  value: string;
  rows: number;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea(props: IProps) {
  const { value, rows, className, onChange } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <textarea
      ref={textareaRef}
      className={classNames([
        "w-full outline-none bg-transparent resize-none overflow-hidden",
        className,
      ])}
      value={value}
      rows={rows}
      onChange={(e) => {
        const lines = e.target.value.split("\n");
        if (lines.length <= textareaRef?.current!.rows) {
          onChange(e);
        }
      }}
    />
  );
}
