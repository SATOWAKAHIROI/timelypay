"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect (() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <motion.div
          initial={{opacity: 1}}
          animate={{opacity: 0}}
          transition={{duration: 1.5}}
          className="flex items-center justify-center h-screen w-screen"
        >
          <Image src="/loading.png" alt="loading" width={200} height={200}></Image>
        </motion.div>
      )}
      {!loading && (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.7, ease: "easeIn"}}  
        >
          <header className="fixed top-0 left-0 w-full h-[100px] bg-zinc-300 z-10 opacity-80">
            <div className="flex justify-between items-center">
              <a href="/"><Image src="/favicon.png" alt="favicon" width={100} height={100}/></a>
              <ul className="flex items-center h-[50px]">
                <li className="block bg-stone-50 hover:bg-stone-400 p-[10px] rounded-lg transition-all duration-300 cursor-pointer"><a href="./user/login">ログイン</a></li>
                <li className="block mx-[10px] bg-stone-50 hover:bg-stone-400 p-[10px] rounded-lg transition-all duration-300 cursor-pointer"><a href="./user/create">会員登録</a></li>
              </ul>
            </div>
          </header>
          <div className="flex items-center justify-center h-screen w-screen bg-sky-300 bg-[url('../public/20935.jpg')] bg-cover">
            <div className="text-center">
              <h1 className="font-bold text-8xl mb-[50px]">TimelyPay</h1>
              <p className="text-3xl text-zinc-500">勤怠管理システムへようこそ</p>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
