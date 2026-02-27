# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

妖精モチーフの美少女アニメキャラクターとリアルタイムでテキストチャットができるWebアプリ。3体のAI VTuberキャラクターから1体を選び、会話を楽しめる。

**MVP スコープ**: キャラクター選択画面・チャット画面・モックバックエンド・モバイル対応。音声・アバターアニメーション・ログイン・課金はスコープ外。

## メインエージェント（ひか）のプロジェクト固有設定

このプロジェクトでのひかの役割：妖精チャットアプリ開発をぐいぐい推し進める、テンション高めなリーダー。

- **このプロジェクトのスタイル**: 楽しく明るい妖精テーマに合わせ、元気で前向きなテンションをキープ
- **優先事項**: MVP達成に向けて、シンプルで実装しやすい設計を心がける
- **ユーザーへの応答**: 指示の復唱なし。100文字以内の簡潔な回答。複雑な技術用語は避ける
- **サブエージェント活用**: 複雑なコーディング・設計・調査はサブエージェントに任せる

## コマンド

```bash
npm run dev      # 開発サーバー起動 (localhost:3000)
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # ESLint 実行
```

## アーキテクチャ

Next.js 16 App Router + React 19 + TypeScript (strict) + Tailwind CSS v4 構成。

### 画面・ルーティング

| 画面 | パス | ファイル |
|---|---|---|
| キャラクター選択 | `/` | `app/page.tsx` |
| チャット | `/chat/[characterId]` | `app/chat/[characterId]/page.tsx` |

### ディレクトリ構成（予定）

```
app/
  page.tsx                        # キャラクター選択画面
  chat/[characterId]/page.tsx     # チャット画面
  layout.tsx                      # ルートレイアウト
  globals.css                     # グローバルスタイル
src/
  constants/
    characters.ts                 # キャラクター定義（名前・画像・性格など）
  types/
    api.ts                        # APIリクエスト・レスポンス型定義
  lib/
    mockApi.ts                    # モックAPI関数（将来AWS Lambda呼び出しに差し替え）
  components/
    CharacterCard.tsx
    ChatMessage.tsx
    ChatInput.tsx
```

**パスエイリアス**: `@/` → プロジェクトルート

### キャラクター定義

キャラクターのパラメータは `src/constants/characters.ts` に集約する。ハードコード禁止。

```typescript
// キャラクターの型イメージ
interface Character {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  personality: string; // モック応答生成に使用
}
```

### モックAPI仕様

`src/lib/mockApi.ts` に以下インターフェースで実装する。将来のAWS Lambda移行時はこの関数をAPIコールに差し替えるだけでよい構造にする。

```typescript
interface ChatRequest {
  characterId: number;
  message: string;
  history: { role: "user" | "assistant"; content: string }[];
}

interface ChatResponse {
  message: string;
}

// 将来のAPI移行時に差し替えるエントリポイント
async function sendMessage(req: ChatRequest): Promise<ChatResponse>
```

## コーディング規約

- Tailwind v4 は PostCSS 経由（`tailwind.config.js` 不使用）
- モバイルファーストでスタイリング（最小幅 375px）
- ボタン・入力フォームには適切な `aria-label` / `aria-*` 属性を付与
- 会話履歴は React state で管理（セッション中のみ保持・永続化しない）
- **キャラクター名は全てひらがなで表示する**
