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
            const response = await fetch("http://localhost:3000/api/user/login", {
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
        <div className="h-screen w-screen">
            <div className="flex flex-col items-center justify-center mt-[80px]">
                <h1 className="font-bold text-5xl mb-[50px]">ユーザーログイン</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="email" required className="block block w-80 h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-[8px] pl-[4px]"/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="password" required className="block block w-80 h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-[8px] pl-[4px]" />
                    <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-80">登録</button>
                </form>
            </div>
        </div>
    );
}