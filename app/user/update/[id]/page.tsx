"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UserUpdate(context: any) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [id, setId] = useState<any>();
    const router = useRouter();

    const getUserById = async(id: any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/mypage/${id}`, {cache: "no-store"});
        const jsonData = await response.json();
        const name: string = jsonData.name;
        const email: string = jsonData.email;
        const password: string = jsonData.password;
        setName(name);
        setEmail(email);
        setPassword(password);
    };

    useEffect(() => {
        const getUser = async() => {
            const params = await context.params;
            const id = await params.id;
            setId(id);
            getUserById(id);
        }
        getUser();
    }, []);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const params: any = await context.params;
        setId(params.id);
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/update/${id}`, {
                method: "PUT",
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
            alert(jsonData.result);
            router.push(`/user/mypage/${id}`);
        }catch{
            alert("ユーザー情報編集失敗");
        }
    };

    

    return (
        <div className="h-screen w-screen">
            <header className="fixed top-0 left-0 w-full h-[60px] sm:h-[100px] bg-zinc-300 z-10 opacity-80">
                <div className="flex justify-between items-center h-full px-4 sm:px-8">
                    <a href="/" className="h-full flex items-center">
                        <Image src="/favicon.png" alt="favicon" width={60} height={60} />
                    </a>
                    <ul className="flex items-center h-full sm:h-[50px]">
                        <li className="flex items-center h-[40px] bg-stone-50 hover:bg-stone-400 p-[8px] sm:h-full p-[10px] rounded-lg transition-all duration-300 cursor-pointer">
                            <a href={`/user/mypage/${id}`}>マイページへ移動</a>
                        </li>
                    </ul>
                </div>
            </header>

            <div className="flex flex-col items-center justify-center mt-40 px-4">
                <h1 className="font-bold text-4xl sm:text-5xl mb-8 text-center">ユーザー情報編集</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full max-w-md">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        required
                        className="block w-full h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-4 p-2"
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        required
                        className="block w-full h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-4 p-2"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        required
                        className="block w-full h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-4 p-2"
                    />
                    <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-full mt-4">
                        登録
                    </button>
                </form>
            </div>
        </div>

    );
}