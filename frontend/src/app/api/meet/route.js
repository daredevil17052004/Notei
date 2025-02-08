"use server";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        console.log("Received link on server:", body);        
        const acquiredLink = body?.link; 
        console.log("Received link on server:", acquiredLink);

        return NextResponse.json({ link }, { status: 201 });
    } catch (err) {
        console.log("Server error:", err.message);
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
};
