import { NextRequest,  NextResponse } from "next/server";
import db from "@/util/database";

export async function POST(request: NextRequest) {
    //フロントエンドからリクエストを受け取る
    const reqBody = await request.json();
    
    try{
        //ユーザーを追加
        const sql: string = `INSERT INTO USER (name, email, password) VALUES (?, ?, ?);`;
        const values: string[] = [reqBody.name, reqBody.email, reqBody.password];
        await db.execute(sql, values);

        //フロントエンドに結果を出力
        return NextResponse.json({result: "アカウントの登録完了"});
    }catch{
        return NextResponse.json({result: "error"});
    }
}