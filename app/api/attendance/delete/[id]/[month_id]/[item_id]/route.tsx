import { NextRequest, NextResponse } from "next/server";
import db from "@/util/database";

export async function DELETE(request: NextRequest, context: any) {
    try{
        const params: any = await context.params;
        const item_id: number = await params.item_id;
        const sql: string = "DELETE FROM ATTENDANCE WHERE id = ?;";
        await db.query(sql, [item_id]);
        return NextResponse.json({result: "削除完了"});
    }catch{
        return NextResponse.json({result: "削除失敗"});
    }
}