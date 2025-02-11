//ログイン済みのユーザーのトークンからメールアドレスを解析して返す
import { jwtVerify } from "jose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [loginUserEmail, setLoginUserEmail] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const checkToken = async() => {
            const token: any = localStorage.getItem("token");
            if(!token){
                router.push("/user/login");
            }
            try {
                const secretKey = new TextEncoder().encode("timelyPay");
                const decodedJwt: any = await jwtVerify(token, secretKey);
                if (!decodedJwt.payload.email) {
                    throw new Error("Email is missing in token payload");
                }
                setLoginUserEmail(decodedJwt.payload.email);
            } catch (error) {
                console.error("Token verification failed:", error);
                alert("トークンが正しくありません。");
                router.push("/user/login");
            }
        }
        checkToken();
    }, [router]);
    console.log(loginUserEmail);
    return loginUserEmail;
}

export default useAuth;