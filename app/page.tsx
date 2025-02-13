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
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="flex items-center justify-center min-h-screen w-screen"
        >
          <Image src="/loading.png" alt="loading" width={150} height={150} />
        </motion.div>
      )}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeIn" }}
        >
          {/* ヘッダー */}
          <header className="fixed top-0 left-0 w-full h-[80px] sm:h-[100px] bg-zinc-300 z-10 opacity-80">
            <div className="flex justify-between items-center px-4 sm:px-8">
              <a href="/">
                <Image src="/favicon.png" alt="favicon" width={60} height={60} />
              </a>
              <ul className="flex items-center h-[40px] sm:h-[50px]">
                <li className="block bg-stone-50 hover:bg-stone-400 p-[8px] sm:p-[10px] rounded-lg transition-all duration-300 cursor-pointer">
                  <a href="./user/login">ログイン</a>
                </li>
                <li className="block mx-2 sm:mx-4 bg-stone-50 hover:bg-stone-400 p-[8px] sm:p-[10px] rounded-lg transition-all duration-300 cursor-pointer">
                  <a href="./user/create">会員登録</a>
                </li>
              </ul>
            </div>
          </header>

          {/* メインコンテンツ */}
          <div className="flex items-center justify-center min-h-screen w-screen bg-sky-300 bg-[url('/20935.jpg')] bg-cover bg-center px-4 text-center">
            <div>
              <h1 className="font-bold text-4xl sm:text-5xl md:text-8xl mb-6 sm:mb-10">
                TimelyPay
              </h1>
              <p className="text-xl sm:text-3xl text-zinc-500">
                勤怠管理システムへようこそ
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </>

  );
}
