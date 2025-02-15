"use client";
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { start } from "repl";
import Image from "next/image";

export default function createAttendance(context: any) {

    //勤怠情報
    const [date, setDate] = useState<string>("");
    const [start_time, setStartTime] = useState<string>("");
    const [end_time, setEndTime] = useState<string>("");
    const router = useRouter();
    const [id, setId] = useState<number>();

    useEffect(() => {
        const getId = async() => {
            const params: any = await context.params;
            const id: number = await params.id;
            setId(id);
        }
        getId();
    }, [])

    //登録ボタン送信後の処理
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/attendance/create/${id}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date: date,
                    start_time: start_time,
                    end_time: end_time
                })
            });
            const jsonData = await response.json();
            if(jsonData.result === "error"){
                throw new Error;
            }
            alert(jsonData.result);
            router.push(`/user/mypage/${id}`);

        }catch{
            alert("勤怠登録失敗");
            router.push(`/user/mypage/${id}`);
        }
    }


    return (
        <div className="min-h-screen w-screen flex items-center justify-center px-4">
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
            <div className="flex flex-col items-center justify-center sm:mt-20 w-full max-w-xs sm:max-w-md">
                <h1 className="font-bold text-3xl sm:text-5xl mb-8 sm:mb-12">勤怠登録</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full">
                    <input value={date} onChange={(e) => setDate(e.target.value)} type="date" name="date" required 
                        className="block w-full h-12 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-4 px-3"/>
                    <input value={start_time} onChange={(e) => setStartTime(e.target.value)} type="time" name="start_time" required 
                        className="block w-full h-12 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-4 px-3"/>
                    <input value={end_time} onChange={(e) => setEndTime(e.target.value)} type="time" name="end_time" required 
                        className="block w-full h-12 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-4 px-3"/>
                    <button className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        登録
                    </button>
                </form>
            </div>
        </div>
    );
}