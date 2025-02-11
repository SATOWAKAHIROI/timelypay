"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UpdateAttendance(context: any){

    //勤怠情報
    const [date, setDate] = useState<string>("");
    const [start_time, setStartTime] = useState<string>("");
    const [end_time, setEndTime] = useState<string>("");
    const [id, setId] = useState<number>();
    const [month_id, setMonthId] = useState<string>("")
    const [item_id, setItemId] = useState<number>();
    const router = useRouter();

    useEffect(() => {
        const getAttendanceInfo = async() => {
            const params: any = await context.params;
            const id: number = await params.id;
            const month_id: string = await params.month_id;
            const item_id: number = await params.item_id;
            setId(id);
            setMonthId(month_id);
            setItemId(item_id);
            try{
                const response = await fetch(`http://localhost:3000/api/attendance/readOne/${id}/${month_id}/${item_id}`, {cache: "no-cache"});
                const jsonData = await response.json();
                const rows = await jsonData.rows[0];
                setDate(await rows.date);
                console.log(date);
                setStartTime(await rows.start_time);
                setEndTime(await rows.end_time);
            }catch{
                alert("ユーザー情報の取得に失敗しました。");
                router.push(`/attendance/readMonth/${id}/${month_id}`);
            }
        }
        getAttendanceInfo();
    }, []);

    //登録ボタン送信後の処理
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const params: any = await context.params;
        const id: number = await params.id;
        const month_id: string = await params.month_id;
        const item_id: number = await params.item_id;
        try{
            const response = await fetch(`http://localhost:3000/api/attendance/update/${id}/${month_id}/${item_id}`, {
                method: "PUT",
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
            router.push(`/attendance/readMonth/${id}/${month_id}`);

        }catch{
            alert("勤怠編集失敗");
            router.push(`/attendance/readMonth/${id}/${month_id}`);
        }
    }

    const handleDelete = async(e: React.FormEvent) =>{
        e.preventDefault();
        try{
            const params: any = await context.params;
            const id: number = await params.id;
            const month_id: string = await params.month_id;
            const item_id: number = await params.item_id;
            const response = await fetch(`http://localhost:3000/api/attendance/delete/${id}/${month_id}/${item_id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({})
            });

            const jsonData = await response.json();
            alert(jsonData.result);
            router.push(`/attendance/readMonth/${id}/${month_id}`);
        }catch{
            alert("削除失敗");
        }
    }

    return(
        <div className="h-screen w-screen">
            <div className="flex flex-col items-center justify-center mt-[80px]">
                <h1 className="font-bold text-5xl mb-[50px]">勤怠編集</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                    <input value={date} onChange={(e) => setDate(e.target.value)} type="date" name="date" placeholder="日付" required className="block w-80 h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-[8px]"></input>
                    <input value={start_time} onChange={(e) => setStartTime(e.target.value)} type="time" name="start_time" placeholder="業務開始時間" required className="block block w-80 h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-[8px]"/>
                    <input value={end_time} onChange={(e) => setEndTime(e.target.value)} type="time" name="end_time" placeholder="業務終了時間" required className="block block w-80 h-10 border-2 border-gray-500 rounded-lg bg-white shadow-md mb-[8px]"/>
                    <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-80">送信</button>
                </form>
                <button onClick={handleDelete} className="mt-2 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 w-80">削除</button>
            </div>
        </div>
    )
}