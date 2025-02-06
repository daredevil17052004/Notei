import { User } from "@/model/UserModel";


export async function createUser(user){
    try {
        const user = await User.create(user);
    } catch (error) {
        throw new Error(error)
    }
}