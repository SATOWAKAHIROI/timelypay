import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function PUT(request: NextRequest, context: any) {
    const reqBody = await request.json();
    try{
        const db = await mysql.createConnection(process.env.DATABASE_URL!);
        const params: any = await context.params;
        const item_id: number = await params.item_id;
        const sql: string = `UPDATE ATTENDANCE SET date = ?, start_time = ?, end_time = ? WHERE id = ?;`;
        const values: any[] = [reqBody.date, reqBody.start_time, reqBody.end_time, item_id];
        await db.query(sql, values);
        return NextResponse.json({result: "編集完了"});
    }catch{
        return NextResponse.json({result: "編集失敗"});
    }
}