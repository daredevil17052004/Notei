import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/UserModel";

const users = [
    {
        email : "ansh@gmail.com",
        password : "password",
        image : '/att.jpg'
    },
    {
        email : "po@gmail.com",
        password : "password"
    },
    {
        email : "kl@gmail.com",
        password : "password"
    }
]



export async function getUserByEmail(email) {
    try {
        await dbConnect();
        const found = User.find({ email: email });
        return found;
    } catch (error) {
        console.error("Error fetching user by email:", error);
    }
}

