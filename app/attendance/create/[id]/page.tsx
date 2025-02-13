"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { start } from "repl";

export default function createAttendance(context: any) {

    //勤怠情報
    const [date, setDate] = useState<string>("");
    const [start_time, setStartTime] = useState<string>("");
    const [end_time, setEndTime] = useState<string>("");
    const router = useRouter();

    //登録ボタン送信後の処理
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const params: any = await context.params;
        const id: number = await params.id;
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
            <div className="flex flex-col items-center justify-center mt-10 sm:mt-20 w-full max-w-xs sm:max-w-md">
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