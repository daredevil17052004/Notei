import { doSocialLogin } from "@/app/actions"
import { Button } from "./ui/button"
import Image from "next/image"

const LoginButtons = () => {
    return (
        <form action={doSocialLogin} className=" w-[300px] flex flex-col justify-between ">
            <div className="py-3 w-full">
                <Button className=" text-white w-full border border-myAccent bg-transparent" variant='ghost' value='google' name='action' type='submit'>
                    <div className="flex items-center justify-evenly  w-3/4">
                        <div>
                            <Image src='/google.png' width={20} height={20} />
                        </div>
                        <div>
                            <p>Log in with Google</p>
                        </div>
                    </div>
                </Button>
            </div>
            {/* <div>
                <Button className=" text-white w-full border border-myAccent " variant='ghost' value='github' name='action' type='submit'>
                    <div className="flex items-center justify-evenly  w-3/4">
                        <div>
                            <Image src='/github.png' width={20} height={20} />
                        </div>
                        <div>
                            <p>Log in with Github</p>
                        </div>
                    </div>
                </Button>
            </div> */}
        </form>
    )
}

export default LoginButtons