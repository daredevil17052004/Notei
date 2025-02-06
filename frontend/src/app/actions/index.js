'use server';
import { signIn,signOut } from "@/auth";

export async function doSocialLogin(formData){
    const action = formData.get('action')
    await signIn(action,{redirectTo:"/about"})

}

export async function doLogout(){
    await signOut({redirectTo:"/"})
}

export async function doCredentialLogin(credentials) {
    try {
        const email = credentials.get('email')
        const password = credentials.get('password')
        const response = await signIn("credentials", {
            redirect: false,
            email:email,
            password:password,
        });
        return response;
    } catch (error) {
        console.error("Error during credential login:", error);
        throw new Error(error.message || "Unknown error during login");
    }
}