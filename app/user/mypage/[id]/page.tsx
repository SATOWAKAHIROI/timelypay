"use client";
import { useState, useEffect} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import useAuth from "@/util/useAuth";

export default function UserMypage(context: any){

    const [name, setName] = useState<string>("");
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [id, setId] = useState<number>();
    const [month, setMonth] = useState<string>();
    const router = useRouter();

    //ログアウト時に実施
    const removeToken = () => {
        alert("ログアウトします。");
        localStorage.removeItem("token");
    }

    const getTodayMonth = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const formattedDate = `${year}-${month}`;
        return formattedDate;
    }

    const getUserNameById = async(id: number) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/mypage/${id}`, {cache: "no-store"});
        const jsonData = await response.json();
        const name: string = jsonData.name;
        const email: string = jsonData.email;
        if(!name){
            setIsLogin(false);
            alert("ユーザーが存在しません。再度ログインをお願いします。");
            router.push("/user/login");
        }
        setName(name);
        setId(id);
        setMonth(getTodayMonth());
    };

    useEffect(() => {
        const readUser = async() => {
            const params: any = await context.params;
            const id: number = params.id;
            getUserNameById(id);
        };
        readUser();
        const timer = setTimeout(() => {
            setLoaded(true);
          }, 1000);
    }, []);
    
    if(!setIsLogin){
        return (
            <></>
        );
    }else{
        return (
            <>
                {loaded && (
                    <div className="flex flex-col items-center justify-start h-screen w-screen px-4">
                        <header className="fixed top-0 left-0 w-full h-[80px] bg-zinc-300 z-10 opacity-80">
                            <div className="flex justify-between items-center px-4">
                            <a href="/"><Image src="/favicon.png" alt="favicon" width={80} height={80}/></a>
                            <ul className="flex items-center space-x-4">
                                <li className="bg-stone-50 hover:bg-stone-400 p-3 rounded-lg transition-all duration-300 cursor-pointer">
                                <Link href={`/user/update/${id}`}>ユーザー情報編集</Link>
                                </li>
                                <li className="bg-stone-50 hover:bg-stone-400 p-3 rounded-lg transition-all duration-300 cursor-pointer">
                                <Link onClick={() => removeToken()} href="/">ログアウト</Link>
                                </li>
                            </ul>
                            </div>
                        </header>

                        <h1 className="mt-[120px] text-center text-2xl sm:text-3xl font-bold">お帰りなさい。{name}さん</h1>

                        <div className="mt-10 w-full">
                            <ul className="space-y-4">
                            <li className="bg-sky-200 hover:bg-sky-300 p-4 rounded-lg transition-all duration-300 cursor-pointer">
                                <a href={`/attendance/create/${id}`} className="block text-center">勤怠情報の入力</a>
                            </li>
                            <li className="bg-sky-200 hover:bg-sky-300 p-4 rounded-lg transition-all duration-300 cursor-pointer">
                                <a href={`/attendance/readMonth/${id}/${month}`} className="block text-center">勤怠情報の閲覧</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                )}

                {!loaded && (
                    <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="flex items-center justify-center h-screen w-screen"
                    >
                        <Image src="/loading.png" alt="loading" width={200} height={200} />
                    </motion.div>
                )}
            </>

        );
    }
}