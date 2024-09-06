import fs from "fs/promises"; // 使用 fs/promises 提供的 promise API
import { IncomingForm } from "formidable";
import fetch from "node-fetch";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false, // 禁用 Next.js 的內建 bodyParser，以便我們使用 formidable 來處理表單數據
  },
};

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm({
    uploadDir: "./uploads", // 設定文件上傳的臨時目錄
    keepExtensions: true, // 保留文件擴展名
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to parse form" });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = file.filepath;

    try {
      // 使用 fs.readFile 來讀取文件並創建一個 Blob 對象
      const fileBuffer = await fs.readFile(filePath);
      const blob = new Blob([fileBuffer], { type: "audio/wav" });

      const formData = new FormData();
      formData.append("file", blob, "audio.wav");

      const response = await fetch("/api/process-audio", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // 刪除臨時上傳的檔案
      await fs.unlink(filePath);

      // 返回後端處理後的文字
      res.status(200).json({ text: data.text });
    } catch (error) {
      // 如果出現錯誤，返回錯誤信息
      res.status(500).json({ error: "Failed to process audio" });
    }
  });
};

export default upload;
