/**
 * 各キャラクターのサンプルボイスを Aivis Cloud API で合成し、
 * public/sound/ に MP3 として保存するスクリプト。
 *
 * 使い方:
 *   AIVIS_CLOUD_API_KEY=xxx node scripts/generate-voices.mjs
 *
 * 環境変数:
 *   AIVIS_CLOUD_API_KEY - Aivis Cloud API キー（必須）
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

/**
 * キャラクター定義（characters.ts と同期）
 * 各キャラの voiceSample テキスト / voiceId / 出力ファイル名を保持。
 */
const CHARACTERS = [
  {
    name: "ひか",
    voiceId: "a670e6b8-0852-45b2-8704-1bc9862f2fe6",
    text: "やっほー！ひかだよ〜！今日も全力でいくっしょ！",
    outputFile: "hika-sample.mp3",
  },
  {
    name: "るな",
    voiceId: "7fc08a41-b64d-456d-8b22-8e1284674775",
    text: "るなだよ！実装完了！テストも全部グリーンだよ〜！",
    outputFile: "luna-sample.mp3",
  },
  {
    name: "ひなた",
    voiceId: "9107b8b6-1ed1-43f5-bebe-0de4df4d229d",
    text: "ひなただよ！コードベースの調査が終わったよ！関連ファイルは3つあったよ〜",
    outputFile: "hinata-sample.mp3",
  },
  {
    name: "ゆい",
    voiceId: "a59cb814-0083-4369-8542-f51a29e72af7",
    text: "ゆいです。バグを3件検出、修正しました。テストカバレッジは92%です。",
    outputFile: "yui-sample.mp3",
  },
  {
    name: "つばき",
    voiceId: "e9339137-2ae3-4d41-9394-fb757a7e61e6",
    text: "つばきです。レビュー完了しました。指摘事項は2件、改善推奨が1件あります。",
    outputFile: "tsubaki-sample.mp3",
  },
  {
    name: "りん",
    voiceId: "7fc08a41-b64d-456d-8b22-8e1284674775",
    text: "りんです。実装計画が完成しました。ステップ数は5、推定工数は3時間です。",
    outputFile: "rin-sample.mp3",
  },
];

/**
 * Aivis Cloud API で音声を合成し、MP3 バイナリを返す。
 * API は output_format: "mp3" 指定でストリーミングバイナリを返す仕様。
 */
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

  // レスポンスボディはバイナリ MP3 データ
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function main() {
  // 出力ディレクトリの確認・作成
  if (!fs.existsSync(SOUND_DIR)) {
    fs.mkdirSync(SOUND_DIR, { recursive: true });
    console.log(`Created directory: ${SOUND_DIR}`);
  }

  console.log(`\n=== サンプルボイス生成開始 ===\n`);

  let successCount = 0;
  let failCount = 0;

  // レート制限に配慮して順次実行
  for (const character of CHARACTERS) {
    const outputPath = path.join(SOUND_DIR, character.outputFile);
    console.log(`[${character.name}] 生成中... (model: ${character.voiceId})`);
    console.log(`  テキスト: "${character.text}"`);

    try {
      const startTime = Date.now();
      const mp3Buffer = await synthesize(character.voiceId, character.text);
      const elapsed = Date.now() - startTime;

      fs.writeFileSync(outputPath, mp3Buffer);
      const fileSizeKB = (mp3Buffer.length / 1024).toFixed(1);
      console.log(
        `  -> 完了! ${fileSizeKB} KB (${elapsed}ms) -> ${character.outputFile}`,
      );
      successCount++;
    } catch (error) {
      console.error(`  -> エラー: ${error.message}`);
      failCount++;
    }

    // レート制限回避のため少し待機（定額プランは10リクエスト/単位時間）
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
