import { NextRequest, NextResponse } from "next/server"
import db from "@/util/database";

export async function GET(request: NextRequest, context: any) {
    try{
        const params: any = await context.params;
        const item_id: number = await params.item_id;
        const sql: string = "SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, start_time, end_time FROM ATTENDANCE WHERE id = ?;";
        const [rows] = await db.query(sql, [item_id]);
        return NextResponse.json({result: "取得成功", rows: rows});
    }catch{
        return NextResponse.json({result: "取得失敗"});
    }
}