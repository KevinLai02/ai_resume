import React from "react";

interface PropsT {
    title: string
    iconColor: string
}

export default function AreaTitle(props:PropsT) {
    const {title, iconColor} = props
    return(
        <div className="flex flex-row items-center">
            <div className={`h-7 w-7 bg-${iconColor}`}/>
            <p className="flex-1 text-2xl ml-5 font-bold">{title.toUpperCase()}</p>
        </div>
    )
}