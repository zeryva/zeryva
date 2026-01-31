import { UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";
import cloudinary from "../../../../utils/cloudinary";

export const runtime = "nodejs";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    // отримуємо всі файли з input name="files"
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) return reject(error);
            if (!result)
              return reject(new Error("Cloudinary returned undefined"));
            resolve(result);
          }
        );
        stream.end(buffer);
      });

      uploadedUrls.push(result.secure_url);
    }

    return NextResponse.json({ urls: uploadedUrls });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Upload error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

// export const POST = async (req: Request) => {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const result: UploadApiResponse = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "products" },
//         (error, result) => {
//           if (error) return reject(error);
//           if (!result)
//             return reject(new Error("Cloudinary returned undefined"));
//           resolve(result);
//         }
//       );
//       stream.end(buffer);
//     });

//     return NextResponse.json({ url: result.secure_url });
//   } catch (err: unknown) {
//     const message = err instanceof Error ? err.message : String(err);
//     console.error("Upload error:", message);
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// };
