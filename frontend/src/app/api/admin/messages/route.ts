import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFile, writeFile } from "fs/promises";
import path from "path";

async function getLocalMessages() {
  try {
    const filePath = path.join(process.cwd(), "public", "messages", "inbox.json");
    const fileData = await readFile(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (e) {
    return [];
  }
}

export async function GET() {
  try {
    const dbMessages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    }).catch(() => []);

    const localMessages = await getLocalMessages();

    // Merge DB and local backup messages, removing duplicates by ID
    const merged = [...dbMessages];
    for (const msg of localMessages) {
      if (!merged.some((m) => m.id === msg.id)) {
        merged.push(msg);
      }
    }

    // Sort by createdAt descending
    merged.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, messages: merged });
  } catch (error: any) {
    const localMessages = await getLocalMessages();
    return NextResponse.json({ success: true, messages: localMessages });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Message ID missing" }, { status: 400 });
    }

    if (!id.startsWith("local-")) {
      await prisma.message.update({
        where: { id },
        data: { read: Boolean(read) },
      });
    } else {
      const filePath = path.join(process.cwd(), "public", "messages", "inbox.json");
      const localMessages = await getLocalMessages();
      const updated = localMessages.map((m: any) => (m.id === id ? { ...m, read: Boolean(read) } : m));
      await writeFile(filePath, JSON.stringify(updated, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Message ID missing" }, { status: 400 });
    }

    if (!id.startsWith("local-")) {
      await prisma.message.delete({ where: { id } });
    } else {
      const filePath = path.join(process.cwd(), "public", "messages", "inbox.json");
      const localMessages = await getLocalMessages();
      const filtered = localMessages.filter((m: any) => m.id !== id);
      await writeFile(filePath, JSON.stringify(filtered, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
