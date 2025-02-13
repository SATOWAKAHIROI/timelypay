import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(request: NextRequest, context: any) {
    try{
        const db = await mysql.createConnection(process.env.DATABASE_URL!);
        const params: any = await context.params;
        const id: number = await params.id;
        const month_id: string = await params.month_id;

        //指定のid、月の全勤怠データを取得
        const sql: string = "SELECT id, DATE_FORMAT(date, '%Y-%m-%d') as day, start_time, end_time, work_duration FROM ATTENDANCE WHERE user_id = ? AND DATE_FORMAT(date, '%Y-%m') = ? ORDER BY day;";
        const values: any[] = [id, month_id];
        const [rows]: any = await db.query(sql, values);
        return NextResponse.json({result: "取得完了", rows: rows});
    }catch{
        return NextResponse.json({result: "取得失敗"});
    }
}