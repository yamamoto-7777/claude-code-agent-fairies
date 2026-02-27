/**
 * 各キャラクターの追加サンプルボイス（sample2, sample3）を
 * Aivis Cloud API で合成し、public/sound/ に MP3 として保存するスクリプト。
 *
 * 使い方:
 *   AIVIS_CLOUD_API_KEY=xxx node scripts/generate-voices-extra.mjs
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
 * 追加サンプルボイス定義
 * sample2 / sample3 の 12 エントリ
 */
const CHARACTERS = [
  // ひか (main)
  {
    name: "ひか",
    voiceId: "a670e6b8-0852-45b2-8704-1bc9862f2fe6",
    text: "ひなたちゃん、このコードベース調査してもらえたら嬉しいな〜！",
    outputFile: "hika-sample2.mp3",
  },
  {
    name: "ひか",
    voiceId: "a670e6b8-0852-45b2-8704-1bc9862f2fe6",
    text: "るなちゃん、この機能実装してくれたら最高だよね！全力で頼むっしょ！",
    outputFile: "hika-sample3.mp3",
  },
  // るな (luna-coder)
  {
    name: "るな",
    voiceId: "7fc08a41-b64d-456d-8b22-8e1284674775",
    text: "できたー！やばくない！？テストも全部グリーン、それな〜！",
    outputFile: "luna-sample2.mp3",
  },
  {
    name: "るな",
    voiceId: "7fc08a41-b64d-456d-8b22-8e1284674775",
    text: "え、このコード雑にしたくない、うち的に無理。ちょっと直してく〜！",
    outputFile: "luna-sample3.mp3",
  },
  // ひなた (hinata-explorer)
  {
    name: "ひなた",
    voiceId: "9107b8b6-1ed1-43f5-bebe-0de4df4d229d",
    text: "わかった、やってみる！どんなファイル構造になってるんだろう、楽しみ〜！",
    outputFile: "hinata-sample2.mp3",
  },
  {
    name: "ひなた",
    voiceId: "9107b8b6-1ed1-43f5-bebe-0de4df4d229d",
    text: "え！これも関係あるかも！？探索進めてきます！",
    outputFile: "hinata-sample3.mp3",
  },
  // ゆい (yui-debugger)
  {
    name: "ゆい",
    voiceId: "e9339137-2ae3-4d41-9394-fb757a7e61e6",
    text: "バグを2件検出。根本原因は非効率な処理ロジック。テストコードで対応完了。",
    outputFile: "yui-sample2.mp3",
  },
  {
    name: "ゆい",
    voiceId: "e9339137-2ae3-4d41-9394-fb757a7e61e6",
    text: "それは違う。論理的に考えれば、エッジケースの処理が不足している。",
    outputFile: "yui-sample3.mp3",
  },
  // つばき (tsubaki-reviewer)
  {
    name: "つばき",
    voiceId: "e7fc08a41-b64d-456d-8b22-8e1284674775",
    text: "やっぱり。ここ、ダメじゃない。セキュリティの穴がある。指摘事項5件だ。",
    outputFile: "tsubaki-sample2.mp3",
  },
  {
    name: "つばき",
    voiceId: "e7fc08a41-b64d-456d-8b22-8e1284674775",
    text: "ま、悪くはないわね。ちゃんと直しなさいよ。別に心配してるわけじゃないけど。",
    outputFile: "tsubaki-sample3.mp3",
  },
  // りん (rin-planner)
  {
    name: "りん",
    voiceId: "a59cb814-0083-4369-8542-f51a29e72af7",
    text: "実装計画を立案いたしました。ステップ数は7、推定工数は5時間です。",
    outputFile: "rin-sample2.mp3",
  },
  {
    name: "りん",
    voiceId: "a59cb814-0083-4369-8542-f51a29e72af7",
    text: "曖昧な要件ですね。まず整理させてください。その後、段階的に進めましょう。",
    outputFile: "rin-sample3.mp3",
  },
];

/**
 * Aivis Cloud API で音声を合成し、MP3 バイナリを返す。
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

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function main() {
  if (!fs.existsSync(SOUND_DIR)) {
    fs.mkdirSync(SOUND_DIR, { recursive: true });
    console.log(`Created directory: ${SOUND_DIR}`);
  }

  console.log(`\n=== 追加サンプルボイス生成開始 (sample2 & sample3) ===\n`);

  let successCount = 0;
  let failCount = 0;

  for (const character of CHARACTERS) {
    const outputPath = path.join(SOUND_DIR, character.outputFile);
    console.log(`[${character.name}] 生成中... (model: ${character.voiceId})`);
    console.log(`  テキスト: "${character.text}"`);
    console.log(`  出力: ${character.outputFile}`);

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

    // レート制限回避のため少し待機
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
