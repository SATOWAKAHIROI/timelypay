//ログインしていないユーザーが使用できる機能を制限するもの。
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    const token = await request.headers.get("Authorization")?.split(" ")[1];

    if(!token){
        return NextResponse.json({result: "トークンがありません。"});
    }

    try{
        const secretKey = new TextEncoder().encode("timelypay");
        const decodedJwt = await jwtVerify(token, secretKey);
        return NextResponse.next();
    }catch{
        return NextResponse.json({result: "トークンが正しくないので、ログインし直してください。"});
    }
}

export const config = {
    matcher: ["/api/user/mypage:path*"],
};