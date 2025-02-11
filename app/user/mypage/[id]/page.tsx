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
        const response = await fetch(`http://localhost:3000/api/user/mypage/${id}`, {cache: "no-store"});
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
                    <div className="flex items-center justify-center h-screen w-screen">
                        <header className="fixed top-0 left-0 w-full h-[100px] bg-zinc-300 z-10 opacity-80">
                            <div className="flex justify-between items-center">
                                <a href="/"><Image src="/favicon.png" alt="favicon" width={100} height={100}/></a>
                                <ul className="flex items-center h-[50px]">
                                    <li className="block bg-stone-50 hover:bg-stone-400 p-[10px] rounded-lg transition-all duration-300 cursor-pointer"><Link href={`/user/update/${id}`}>ユーザー情報編集</Link></li>
                                    <li className="block mx-[10px] bg-stone-50 hover:bg-stone-400 p-[10px] rounded-lg transition-all duration-300 cursor-pointer"><Link onClick={() => removeToken()} href="/">ログアウト</Link></li>
                                </ul>
                            </div>
                        </header>
                        <h1 className="fixed top-60">お帰りなさい。{name}さん</h1>
                        <div>
                            <ul>
                                <li className="block bg-sky-200 hover:bg-sky-300 p-[10px] rounded-lg transition-all duration-300 cursor-pointer mb-[5px]"><a href={`/attendance/create/${id}`}>勤怠情報の入力</a></li>
                                <li className="block bg-sky-200 hover:bg-sky-300 p-[10px] rounded-lg transition-all duration-300 cursor-pointer"><a href={`/attendance/readMonth/${id}/${month}`}>勤怠情報の閲覧</a></li>
                            </ul>

                        </div>
                        
                    </div>
                   
                )}
                {!loaded && (
                    <motion.div
                        initial={{opacity: 1}}
                        animate={{opacity: 0}}
                        transition={{duration: 1.5}}
                        className="flex items-center justify-center h-screen w-screen"
                    >
                        <Image src="/loading.png" alt="loading" width={200} height={200}></Image>
                    </motion.div>
                )}
            </>
        );
    }
}