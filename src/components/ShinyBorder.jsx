'use client'
import React from 'react'
import ShineBorder from "@/components/magicui/shine-border";
import { useTheme } from "next-themes";

const ShinyBorder = ({children}) => {
    const theme = useTheme();

    return (
        <ShineBorder
            className=""
            color={theme.theme === "dark" ? "white" : "#E33665"}
        >
            {children}
        </ShineBorder>
    )
}

export default ShinyBorder