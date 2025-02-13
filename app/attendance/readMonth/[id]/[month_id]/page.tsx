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
        <div className="p-4 sm:p-6 bg-blue-50 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                {/* タイトル */}
                <h1 className="text-lg sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                {year}年{month}月の勤怠情報
                </h1>
                {/* マイページボタン */}
                <a
                href={`/user/mypage/${id}`}
                className="text-sm sm:text-base bg-stone-300 hover:bg-stone-400 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
                >
                マイページへ移動
                </a>
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
                                <td className="px-3 sm:px-4 py-2 border border-blue-300 text-center text-sm">
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