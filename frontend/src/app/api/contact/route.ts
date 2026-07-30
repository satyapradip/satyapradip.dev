import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, readFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    let savedMessage = null;

    // Try saving to database first
    try {
      savedMessage = await prisma.message.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        },
      });
    } catch (dbError) {
      console.warn("MongoDB connection offline. Saving message to local backup file.");
      
      // Fallback local file storage if database is offline
      const storageDir = path.join(process.cwd(), "public", "messages");
      await mkdir(storageDir, { recursive: true });

      const filePath = path.join(storageDir, "inbox.json");
      let currentMessages = [];
      try {
        const fileData = await readFile(filePath, "utf-8");
        currentMessages = JSON.parse(fileData);
      } catch (e) {
        currentMessages = [];
      }

      savedMessage = {
        id: `local-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        read: false,
        createdAt: new Date().toISOString(),
      };

      currentMessages.unshift(savedMessage);
      await writeFile(filePath, JSON.stringify(currentMessages, null, 2));
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been received! Satyapradip will get back to you shortly.",
      data: savedMessage,
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process message." },
      { status: 500 }
    );
  }
}
