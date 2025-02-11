import { NextResponse, NextRequest } from "next/server";
import db from "@/util/database";
import { error } from "console";
import { SignJWT } from "jose";

export async function POST(request: NextRequest) {
    //emailアドレスとパスワードを取得
    const reqBody = await request.json();
    
    //メールアドレスが入力されていなかった場合はじく
    if(!reqBody.email){
        return NextResponse.json({result: "メールアドレスを入力してください"});
    }

    try{
        const sql: string = `SELECT * FROM USER WHERE email = ?`;
        const [rows]: any = await db.query(sql, [reqBody.email]);

        //ユーザが見つかった場合、パスワードの照合を行う。
        if(rows.length > 0){
            if(rows[0].password === reqBody.password){
                //トークンの作成
                const secretKey = new TextEncoder().encode("timelypay");
                const payload = {
                    email: reqBody.email
                };
                const token = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime("1d").sign(secretKey);
                return NextResponse.json({result: "ログイン完了", token: token, id: rows[0].id});
            }else{
                throw new Error("password error");
            }
        }else{
            throw new Error("user not found");
        }
    }catch{
        console.error("正しく動作していません", error);
        return NextResponse.json({result: "ログインできません"});
    }
}

    