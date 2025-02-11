import { NextRequest, NextResponse } from "next/server";
import db from "@/util/database";

export async function PUT(request: NextRequest, context: any) {
    const reqBody = await request.json();
    try{
        const params = await context.params;
        const id = await params.id;
        const sql: string = "UPDATE USER SET name = ?, email = ?, password = ? WHERE id = ?";
        const values: string[] = [reqBody.name, reqBody.email, reqBody.password, id];
        await db.query(sql, values);
        return NextResponse.json({result: "ユーザー情報編集成功"});
    }catch{
        return NextResponse.json({result: "ユーザー情報編集失敗"});
    }

    
}