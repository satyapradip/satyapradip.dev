import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.replace(/^["']|["']$/g, "").trim();
    const apiKey = process.env.CLOUDINARY_API_KEY?.replace(/^["']|["']$/g, "").trim();
    const apiSecret = process.env.CLOUDINARY_API_SECRET?.replace(/^["']|["']$/g, "").trim();

    // 1. Primary: Cloudinary Cloud CDN Upload (for production deployment & Vercel)
    if (cloudName && apiKey && apiSecret) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const timestamp = Math.floor(Date.now() / 1000);

        // Generate Cloudinary SHA-1 upload signature
        const paramsToSign = `folder=portfolio&timestamp=${timestamp}${apiSecret}`;
        const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");

        const uploadFormData = new FormData();
        const blob = new Blob([buffer], { type: file.type });
        uploadFormData.append("file", blob, file.name);
        uploadFormData.append("api_key", apiKey);
        uploadFormData.append("timestamp", timestamp.toString());
        uploadFormData.append("signature", signature);
        uploadFormData.append("folder", "portfolio");

        // Determine resource type: 'raw' for PDFs/Documents, 'image' for Images
        const isDocument = file.type.includes("pdf") || file.type.includes("doc") || file.name.endsWith(".pdf");
        const resourceType = isDocument ? "raw" : "image";

        const cdnRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        const cdnData = await cdnRes.json();

        if (cdnData.secure_url) {
          console.log("✅ File uploaded to Cloudinary CDN:", cdnData.secure_url);
          return NextResponse.json({ success: true, url: cdnData.secure_url });
        } else {
          const errMsg = cdnData.error?.message || JSON.stringify(cdnData);
          console.error("Cloudinary error:", errMsg);
          return NextResponse.json(
            { success: false, error: `Cloudinary error: ${errMsg}` },
            { status: 400 }
          );
        }
      } catch (cloudErr: any) {
        console.error("Cloudinary request failed:", cloudErr);
        return NextResponse.json(
          { success: false, error: `Cloudinary request failed: ${cloudErr.message}` },
          { status: 500 }
        );
      }
    }

    // 2. Fallback for Local Development ONLY (Vercel filesystem is read-only)
    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) missing in Vercel Environment Variables.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${cleanName}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
