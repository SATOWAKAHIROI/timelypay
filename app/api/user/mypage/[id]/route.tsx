import { NextResponse, NextRequest } from "next/server";
import mysql from "mysql2/promise";

export async function GET(request: NextRequest, context: any) {

    try{
        const db = await mysql.createConnection(process.env.DATABASE_URL!);
        const params = await context.params;
        const id: number = await params.id;
        const sql: string = "SELECT * FROM USER WHERE id = ?";
        const [rows]: any = await db.query(sql, [id]);
        if(!rows[0].name){
            throw new Error("user not found");
        }
        return NextResponse.json({result: "アクセス成功", name: rows[0].name, email: rows[0].email, password: rows[0].password});
    }catch{
        return NextResponse.json({result: "アクセス失敗"});
    }
}
    
    
