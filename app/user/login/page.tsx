"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginUser(){

    //ユーザーログイン情報
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    //フォームの動作
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const jsonData = await response.json();
            console.log(jsonData.token);
            localStorage.setItem("token", jsonData.token);
            alert(jsonData.result);
            router.push(`/user/mypage/${jsonData.id}`);
        }catch{
            alert("ログインできませんでした。");
        }
    };
    
    return (
        <div className="h-screen w-screen flex items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center w-full max-w-md mt-20">
                <h1 className="font-bold text-3xl sm:text-5xl mb-8">ユーザーログイン</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        name="email" 
                        placeholder="メールアドレス" 
                        required 
                        className="block w-full h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-2 px-3"
                    />
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        name="password" 
                        placeholder="パスワード" 
                        required 
                        className="block w-full h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-4 px-3"
                    />
                    <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        ログイン
                    </button>
                </form>
            </div>
        </div>

    );
}