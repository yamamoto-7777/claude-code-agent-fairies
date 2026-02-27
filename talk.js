import fs from "fs";

// ① 必要情報をセット
const API_KEY = process.env.AIVIS_CLOUD_API_KEY; // 事前に環境変数などでセット
const MODEL_UUID = "ここにモデルUUIDを入れる"; // 例: "a59cb814-0083-4369-8542-f51a29e72af7"
const text = "こんにちは、音声を生成しています。";

// ② 合成 API 実行
const res = await fetch("https://api.aivis-project.com/v1/tts/synthesize", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model_uuid: MODEL_UUID,
    text: text,
    speaking_rate: 1.2,
  }),
});

if (!res.ok) {
  console.error("Error:", res.status, await res.text());
  process.exit(1);
}

const json = await res.json();

// ③ 音声は Base64 で返ることが多いのでデコード
const audioBase64 = json.audioContent; // 実際のキー名は API のレスポンスに合わせて調整
const buffer = Buffer.from(audioBase64, "base64");

// ④ ファイルとして保存
fs.writeFileSync("output.mp3", buffer);
console.log("生成完了: output.mp3");