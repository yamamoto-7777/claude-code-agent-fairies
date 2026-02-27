/**
 * つばきの sample2 / sample3 を Aivis Cloud API で合成し、
 * public/sound/ に MP3 として保存するスクリプト。
 *
 * 使い方:
 *   AIVIS_CLOUD_API_KEY=xxx node scripts/generate-tsubaki-extra.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SOUND_DIR = path.join(PROJECT_ROOT, "public", "sound");

const API_KEY = process.env.AIVIS_CLOUD_API_KEY;
if (!API_KEY) {
  console.error("Error: AIVIS_CLOUD_API_KEY 環境変数が設定されていません。");
  process.exit(1);
}

// つばきの正しい voiceId（generate-voices.mjs の sample1 で成功実績あり）
const TSUBAKI_VOICE_ID = "e9339137-2ae3-4d41-9394-fb757a7e61e6";

const SAMPLES = [
  {
    text: "やっぱり。ここ、ダメじゃない。セキュリティの穴がある。指摘事項5件だ。",
    outputFile: "tsubaki-sample2.mp3",
  },
  {
    text: "ま、悪くはないわね。ちゃんと直しなさいよ。別に心配してるわけじゃないけど。",
    outputFile: "tsubaki-sample3.mp3",
  },
];

async function synthesize(voiceId, text) {
  const res = await fetch("https://api.aivis-project.com/v1/tts/synthesize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model_uuid: voiceId,
      text,
      speaking_rate: 1.0,
      output_format: "mp3",
      use_volume_normalizer: true,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `API エラー (HTTP ${res.status}) for model ${voiceId}: ${errorBody}`,
    );
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function main() {
  if (!fs.existsSync(SOUND_DIR)) {
    fs.mkdirSync(SOUND_DIR, { recursive: true });
  }

  console.log(`\n=== つばき sample2 & sample3 生成開始 ===\n`);
  console.log(`voiceId: ${TSUBAKI_VOICE_ID}\n`);

  let successCount = 0;
  let failCount = 0;

  for (const sample of SAMPLES) {
    const outputPath = path.join(SOUND_DIR, sample.outputFile);
    console.log(`[つばき] 生成中... -> ${sample.outputFile}`);
    console.log(`  テキスト: "${sample.text}"`);

    try {
      const startTime = Date.now();
      const mp3Buffer = await synthesize(TSUBAKI_VOICE_ID, sample.text);
      const elapsed = Date.now() - startTime;

      fs.writeFileSync(outputPath, mp3Buffer);
      const fileSizeKB = (mp3Buffer.length / 1024).toFixed(1);
      console.log(`  -> 完了! ${fileSizeKB} KB (${elapsed}ms)`);
      successCount++;
    } catch (error) {
      console.error(`  -> エラー: ${error.message}`);
      failCount++;
    }

    // レート制限回避
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  console.log(`\n=== 生成完了 ===`);
  console.log(`  成功: ${successCount} / 失敗: ${failCount}`);

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("予期しないエラー:", error);
  process.exit(1);
});
