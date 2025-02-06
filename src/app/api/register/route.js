"use server"
import { NextResponse } from "next/server";
import { User } from "@/model/UserModel";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";

export const POST = async (req) => {
    try {
        const { name, email, password } = await req.json();

        console.log(name, email, password);

        // Create a DB Connection
        await dbConnect();

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        // Form a DB payload
        const newUser = {
            name,
            email,
            password: hashedPassword,
        };
        console.log(newUser);

        // Update the DB
        try {
            const user = await User.create(newUser);
            console.log(user);
        } catch (err) {
            console.log(err.message);
            return NextResponse.json({ message: err.message }, { status: 500 });
        }

        return NextResponse.json({ message: "User has been created" }, { status: 201 });
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
};
