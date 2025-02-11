"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function readMonthAttendance(context: any) {

    const [id, setId] = useState<number>();
    const [month_id, setMonthId] = useState<string>("");
    const [attendanceList, setAttendanceList] = useState<any[]>([]);
    const [month, setMonth] = useState<number>();
    const [year, setYear] = useState<number>();
    const router = useRouter();


    useEffect(() => {
        const getAttendanceList = async() => {
            const params = await context.params;
            const id = await params.id;
            const month_id = await params.month_id;
            setId(id);
            setMonthId(month_id);
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/attendance/readMonth/${id}/${month_id}`, {cache: "no-cache"});
            const jsonData = await response.json();
            const attendanceList = await jsonData.rows;
            setAttendanceList(attendanceList);
        }
        getAttendanceList();
        const now = new Date();
        setYear(now.getFullYear());
        setMonth(now.getMonth() + 1);
    }, []);

    return(
        <div className="p-6 bg-blue-50 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">
                {year}年{month}月の勤怠情報
            </h1>
            <table className="w-full border border-blue-300 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-4 py-2 border border-blue-300">日付</th>
                        <th className="px-4 py-2 border border-blue-300">開始時間</th>
                        <th className="px-4 py-2 border border-blue-300">終了時間</th>
                        <th className="px-4 py-2 border border-blue-300">労働時間</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceList.map(item => (
                        <tr key={item.id} onClick={() => router.push(`/attendance/update/${id}/${month_id}/${item.id}`)} className="odd:bg-blue-100 even:bg-white hover:bg-blue-200 transition">
                            <td className="px-4 py-2 border border-blue-300 text-center">{item.day}</td>
                            <td className="px-4 py-2 border border-blue-300 text-center">{item.start_time}</td>
                            <td className="px-4 py-2 border border-blue-300 text-center">{item.end_time}</td>
                            <td className="px-4 py-2 border border-blue-300 text-center">{item.work_duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}