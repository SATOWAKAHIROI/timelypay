import { NextRequest,  NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(request: NextRequest) {
    //フロントエンドからリクエストを受け取る
    const reqBody = await request.json();
    
    try{
        //ユーザーを追加
        const db = await mysql.createConnection(process.env.DATABASE_URL!);
        const sql: string = `INSERT INTO USER (name, email, password) VALUES (?, ?, ?);`;
        const values: string[] = [reqBody.name, reqBody.email, reqBody.password];
        await db.execute(sql, values);

        const sql_select: string = `SELECT * FROM USER WHERE email = ?`;
        const [rows]: any = await db.query(sql_select, [reqBody.email]);

        //フロントエンドに結果を出力
        return NextResponse.json({result: "アカウントの登録完了", id: rows[0].id});
    }catch{
        return NextResponse.json({result: "error"});
    }
}