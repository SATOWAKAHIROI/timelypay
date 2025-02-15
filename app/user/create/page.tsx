"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUser() {

    //ユーザー情報 
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    //登録ボタン送信後の処理
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/create`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });
            const jsonData = await response.json();
            if(jsonData.result === "error"){
                throw new Error;
            }
            const id: number = await jsonData.id;
            alert(jsonData.result);
            router.push(`/user/mypage/${id}`);
        }catch{
            alert("ユーザー登録失敗");
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center w-full max-w-md mt-20">
                <h1 className="font-bold text-3xl sm:text-5xl mb-8">ユーザー登録</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type="text" 
                    name="name" 
                    placeholder="氏名" 
                    required 
                    className="block w-full h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-2 px-3"
                />
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
                    登録
                </button>
                </form>
            </div>
        </div>
    );
}