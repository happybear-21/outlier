import { NextResponse } from "next/server"
import db from "@/lib/db/db"
import { workspaces } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title } = body

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    const workspace = await db.insert(workspaces).values({
      title,
      createdAt: new Date().toISOString(),
    }).returning()

    return NextResponse.json(workspace[0])
  } catch (error) {
    console.error("[WORKSPACES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET() {
  try {
    const workspacesList = await db.select().from(workspaces)
    return NextResponse.json(workspacesList)
  } catch (error) {
    console.error("[WORKSPACES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 