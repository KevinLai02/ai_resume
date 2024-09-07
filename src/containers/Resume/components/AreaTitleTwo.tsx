import React from "react";

interface PropsT {
  title: string;
}

export default function AreaTitleTwo(props: PropsT) {
  const { title } = props;
  return (
    <div className="bg-custom-blue-400 px-10 py-3">
      <p className="text-2xl text-white font-bold bg-custom-blue-400">
        {title}
      </p>
    </div>
  );
}
