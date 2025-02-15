"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function readMonthAttendance(context: any) {

    const [id, setId] = useState<number>();
    const [month_id, setMonthId] = useState<string>("");
    const [attendanceList, setAttendanceList] = useState<any[]>([]);
    const [month, setMonth] = useState<number>();
    const [year, setYear] = useState<number>();
    const router = useRouter();

    const getPreviousMonth = (ym: string) => {
        let [year, month] = ym.split("-").map(Number);

        if(month === 1){
            year -= 1;
            month = 12;
        }else{
            month -= 1;
        }
        return `${year}-${String(month).padStart(2, '0')}`;
    }

    const getNextMonth = (ym: string) => {
        let [year, month] = ym.split("-").map(Number);

        if(month === 12){
            year += 1;
            month = 1;
        }else{
            month += 1;
        }
        return `${year}-${String(month).padStart(2, '0')}`;
    }


    useEffect(() => {
        const getAttendanceList = async() => {
            const params = await context.params;
            const id = await params.id;
            const month_id = await params.month_id;
            let [year, month] = await month_id.split("-").map(Number);
            setYear(year);
            setMonth(month);
            setId(id);
            setMonthId(month_id);
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/attendance/readMonth/${id}/${month_id}`, {cache: "no-cache"});
            const jsonData = await response.json();
            const attendanceList = await jsonData.rows;
            setAttendanceList(attendanceList);
        }
        getAttendanceList();
        
    }, []);

    return(
        <div className="p-4 sm:p-6 bg-blue-50 rounded-lg shadow-lg mt-[100px]">
            <header className="fixed top-0 left-0 w-full h-[60px] sm:h-[100px] bg-zinc-300 z-10 opacity-80">
                <div className="flex justify-between items-center h-full px-4 sm:px-8">
                    <a href="/" className="h-full flex items-center">
                        <Image src="/favicon.png" alt="favicon" width={60} height={60} />
                    </a>
                    <ul className="flex items-center h-full sm:h-[50px]">
                        <li className="flex items-center h-[40px] bg-stone-50 hover:bg-stone-400 p-[8px] sm:h-full p-[10px] mr-[5px] rounded-lg transition-all duration-300 cursor-pointer">
                            <a href={`/attendance/readMonth/${id}/${getPreviousMonth(month_id)}`} className="text-xs sm:text-base">先月へ</a>
                        </li>
                        <li className="flex items-center h-[40px] bg-stone-50 hover:bg-stone-400 p-[8px] sm:h-full p-[10px] mr-[5px] rounded-lg transition-all duration-300 cursor-pointer">
                            <a href={`/attendance/readMonth/${id}/${getNextMonth(month_id)}`} className="text-xs sm:text-base">翌月へ</a>
                        </li>
                        <li className="flex items-center h-[40px] bg-stone-50 hover:bg-stone-400 p-[8px] sm:h-full p-[10px] rounded-lg transition-all duration-300 cursor-pointer">
                            <a href={`/user/mypage/${id}`} className="text-xs sm:text-base">マイページへ移動</a>
                        </li>
                    </ul>
                </div>
            </header>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                {/* タイトル */}
                <h1 className="text-lg sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                {year}年{month}月の勤怠情報
                </h1>
            </div>

            {/* テーブルのレスポンシブ対応 */}
            <div className="overflow-x-auto">
                <table className="w-full border border-blue-300 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-blue-600 text-white text-sm sm:text-base">
                        <tr>
                            <th className="px-3 sm:px-4 py-2 border border-blue-300">日付</th>
                            <th className="px-3 sm:px-4 py-2 border border-blue-300">開始時間</th>
                            <th className="px-3 sm:px-4 py-2 border border-blue-300">終了時間</th>
                            <th className="px-3 sm:px-4 py-2 border border-blue-300">労働時間</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceList.map((item) => (
                            <tr
                                key={item.id}
                                onClick={() => router.push(`/attendance/update/${id}/${month_id}/${item.id}`)}
                                className="odd:bg-blue-100 even:bg-white hover:bg-blue-200 transition cursor-pointer"
                            >
                                <td className="px-3 sm:px-4 py-2 border border-blue-300 text-center text-sm sm:text-base">
                                {item.day}
                                </td>
                                <td className="px-3 sm:px-4 py-2 border border-blue-300 text-center">
                                {item.start_time}
                                </td>
                                <td className="px-3 sm:px-4 py-2 border border-blue-300 text-center">
                                {item.end_time}
                                </td>
                                <td className="px-3 sm:px-4 py-2 border border-blue-300 text-center">
                                {item.work_duration}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}