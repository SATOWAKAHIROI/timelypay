import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(request: NextRequest, context: any) {
    const reqBody = await request.json();
    try{
        const db = await mysql.createConnection(process.env.DATABASE_URL!);
        const params = await context.params;
        const id: number = await params.id;
        const sql: string = "INSERT INTO ATTENDANCE (date, start_time, end_time, user_id) VALUES (?, ?, ?, ?);";
        const values: any[] = [reqBody.date, reqBody.start_time, reqBody.end_time, id];
        db.execute(sql, values);
        return NextResponse.json({result: "勤怠登録完了"});
    }catch{
        return NextResponse.json({result: "勤怠登録失敗"});
    }
}