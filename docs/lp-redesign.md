# LP リデザイン設計ドキュメント

**担当**: 朝倉 凛（プランニング・設計）
**作成日**: 2026-02-27
**対象実装者**: るな（luna-coder）
**ステータス**: 設計確定

---

## 1. 概要・コンセプト

### コアコンセプト

「**ながら作業を解放する、妖精エージェントチーム**」

音声フィードバック機能を前面に押し出し、ゲーム的なキャラクター紹介で妖精エージェントチームの世界観を体験させるLPに刷新する。

### 現状の課題

| 項目 | 現状 | リデザイン後 |
|---|---|---|
| キャラクター表示 | 丸いアイコン画像のみ | 立ち絵 + ゲーム的ステータス |
| 音声フィードバック | 言及なし | 専用セクションで価値訴求 |
| キャラクター個性 | タグと説明文のみ | スキルバー + 性格表示 |
| 世界観 | 汎用的なダークUI | 妖精/ファンタジー感が濃厚 |

---

## 2. ページ構成

```
┌─────────────────────────────────┐
│  Section 1: Hero                │  ← 全画面、キャラ総登場
├─────────────────────────────────┤
│  Section 2: Voice Feature       │  ← 音声フィードバック訴求
├─────────────────────────────────┤
│  Section 3: Character Gallery   │  ← ゲーム的キャラ紹介（メイン）
├─────────────────────────────────┤
│  Section 4: How It Works        │  ← 既存を改修
├─────────────────────────────────┤
│  Section 5: Team Dynamics       │  ← エージェント連携図（新規）
├─────────────────────────────────┤
│  Footer                         │  ← ナビ更新
└─────────────────────────────────┘
```

### アンカーID 一覧

| セクション | `id` 属性 |
|---|---|
| Voice Feature | `#voice` |
| Character Gallery | `#characters` |
| How It Works | `#how-it-works` |
| Team Dynamics | `#team-dynamics` |

---

## 3. セクション別設計

### Section 1: Hero Section（全面リニューアル）

#### レイアウト（デスクトップ）

```
┌──────────────────────────────────────────────────────────┐
│  [パーティクル・妖精エフェクト背景]                      │
│                                                          │
│          * Fairy AI Agent Team *                         │
│                                                          │
│     ✦ Claude Code Agent Team ✦                          │
│     　　　　（グラデーションタイトル）                   │
│                                                          │
│  コードに集中したまま、AIがあなたの耳に進捗を届ける。    │
│                                                          │
│  [るな] [ひなた] [ゆい] [つばき] [凛]                   │
│  （小さい立ち絵サムネイル、横並び）                     │
│                                                          │
│        ▼  [声でレポートを聞く]  [チームを見る]          │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### レイアウト（モバイル）

```
┌────────────────────────┐
│  * Fairy AI Agent Team *│
│                        │
│  Claude Code           │
│  Agent Team            │
│                        │
│  コードに集中したまま、│
│  AIがあなたの耳に      │
│  進捗を届ける。        │
│                        │
│  [声でレポートを聞く]  │
│  [チームを見る]        │
└────────────────────────┘
```

#### 実装仕様

- **高さ**: `min-h-screen` (100dvh)
- **アニメーション**: `animate-card-enter` を既存流用。ロゴは delay 0s、キャッチコピーは 0.2s、CTAは 0.4s
- **妖精パーティクル**: 既存の `fairy-float` / `fairy-glow` アニメーションを継続使用。追加でキラキラの `sparkle-burst` を新設（後述）
- **キャラサムネイル**: 横並び5体。各キャラのテーマカラーでリング。クリックで `#characters` セクションの該当キャラへスムーズスクロール
- **CTA**: 2ボタン構成
  - 主: 「声でレポートを聞く」→ `#voice` へアンカー
  - 副: 「チームを見る」→ `#characters` へアンカー

---

### Section 2: Voice Feature Section（新規）

#### 価値訴求の構造

「**Eyes-Free Development**」というコンセプトを視覚的に伝える。

#### レイアウト

```
┌──────────────────────────────────────────────────────────┐
│              * Voice Feature *                           │
│         声で聞く、目はコードへ。                        │
│                                                          │
│  ┌──────────────┐        ┌──────────────────────────┐  │
│  │              │   →    │ ♪ 波形アニメーション     │  │
│  │  あなた      │        │                          │  │
│  │  コードを    │        │ "るなだよ！実装完了！    │  │
│  │  書いてる    │        │  PRの準備できたよ〜"     │  │
│  │              │        │                          │  │
│  └──────────────┘        └──────────────────────────┘  │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ 🔊       │ │ 👁️ 目は  │ │ ⚡ リアル│               │
│  │ キャラ   │ │ コード   │ │ タイム   │               │
│  │ 別の声   │ │ だけに   │ │ 進捗報告 │               │
│  └──────────┘ └──────────┘ └──────────┘               │
└──────────────────────────────────────────────────────────┘
```

#### 実装仕様

- **左パネル（ユーザー側）**: グレーのコードエディタ風ブロック。点滅カーソルアニメーション
- **右パネル（音声バブル）**: キャラクターアイコン + セリフバブル + 音声波形アニメーション
  - 音声波形: `<div>` 複数本を `animate-bounce` 変形で実装。各バーの delay を 0.1s ずらす
  - セリフは `CHARACTERS` から `personality` を引用して定型文生成
- **3つの特徴カード**: スクロールリビール対応。アイコンは SVG インライン（外部ライブラリ不使用）

#### 音声波形アニメーション CSS

```css
/* globals.css に追加 */
@keyframes voice-wave {
  0%, 100% { height: 4px; }
  50%       { height: 20px; }
}

/* 各バーに animation-delay を 0.1s ずつずらす */
```

---

### Section 3: Character Gallery（コアセクション・新規）

#### コンセプト

ガチャゲームのキャラクター紹介画面。各キャラクターに「スタンディングイラスト」「スキルバー」「性格タグ」「セリフ」を組み合わせた縦長カード。

#### カードレイアウト（個別キャラ）

```
┌─────────────────────────────┐
│  ┌───┐  [テーマカラー帯]   │
│  │   │  ★ Sub Agent ★      │
│  │立 │                      │
│  │ち │  るな                │
│  │絵 │  コーディング担当    │
│  │エ │                      │
│  │リ │  "コード書くの大好き！" │
│  │ア │  （キャラクターセリフ）│
│  │   │                      │
│  └───┘  ───────────────     │
│         スキル              │
│  実装速度  ████████░░  80%  │
│  コード品質 ██████░░░░  60%  │
│  テンション ██████████ 100%  │
│                              │
│  [コーディング] [実装担当]   │
│  [ハイテンション]            │
└─────────────────────────────┘
```

#### メインエージェントカード（特別仕様）

```
┌─────────────────────────────────────────────────────┐
│                   [全幅ヘッダー帯]                  │
│                                                     │
│  [立ち絵]   ★ Main Agent ★                        │
│             メインエージェント                      │
│             統括・コーディネーション                │
│                                                     │
│             "チーム全員で、最高のコードを届けよう！"│
│                                                     │
│  ────────── スキル ──────────────────               │
│  指揮統率     ██████████ 100%                       │
│  タスク振分   ████████░░  80%                       │
│  コーディネーション ██████████ 100%                 │
│                                                     │
│  [統括] [司令塔] [コーディネーター]                │
└─────────────────────────────────────────────────────┘
```

#### グリッドレイアウト

```
モバイル (375px+):
  1カラム、カード縦スタック

タブレット (768px+):
  2カラムグリッド

デスクトップ (1280px+):
  メインエージェント: 中央1列フル幅（max-w-2xl）
  サブエージェント: 3カラムグリッド（上段3体 + 下段2体）
```

#### カード内インタラクション

- **ホバー時**: カード全体が `scale-105`、テーマカラーのグロウが強くなる（`box-shadow` の不透明度を上げる）
- **スキルバー**: スクロールインビューで `width: 0 → 実際の幅` にトランジション（0.8s ease-out）
- **グロウエフェクト**: 既存の `themeColor.glowValue` をインラインスタイルで使用

#### 立ち絵エリア仕様

- **サイズ**: カード内左寄せ、`w-32 h-48`（モバイル）/ `w-40 h-60`（デスクトップ）
- **プレースホルダー**: 画像未提供時はキャラカラーのグラデーション + イニシャル文字
  - 例: るな → 琥珀色グラデ背景 + 「る」
- **フォールバック実装**: `<Image>` の `onError` でプレースホルダーに切り替え
- **画像パス**: `character.imagePath` をそのまま使用（変更なし）

---

### Section 4: How It Works（改修）

現状の3ステップ構成は維持しつつ、音声フィードバックを手順に組み込む。

#### 改修内容

- ステップ3に「音声で報告」を追加 → 4ステップ構成に変更
- ステップカードのデザインを妖精テーマに合わせる（現状のグラスモーフィズムを維持・強化）
- ステップ番号の円をキャラのテーマカラーに近いグラデーションで塗る

#### 新しいステップ定義

```typescript
const STEPS = [
  {
    number: 1,
    title: "タスク受付",
    description: "ユーザーからの依頼をメインエージェントが受け取り分析",
    icon: "📥",
  },
  {
    number: 2,
    title: "タスク振り分け",
    description: "タスク内容に応じて最適なスペシャリストを選定・指示",
    icon: "🔀",
  },
  {
    number: 3,
    title: "実行・統合",
    description: "各スペシャリストが実行、メインエージェントが成果を統合",
    icon: "✅",
  },
  {
    number: 4,
    title: "音声で報告",
    description: "完了と進捗をキャラクターの声でリアルタイムにお知らせ",
    icon: "🔊",
  },
];
```

---

### Section 5: Team Dynamics（新規）

既存の `WorkflowSection` を廃止し、エージェント連携をより視覚的に表現した新セクションに置き換える。

#### レイアウトコンセプト

「メインエージェントを中心に、5人が星形に配置されたダイアグラム」

```
デスクトップ レイアウト:

              [凛: 設計]
                  |
    [ひなた]--[メイン]--[つばき]
                  |
    [るな]----[ゆい]

→ 実際には CSS Grid + 絶対配置 or SVG線で繋ぐ
```

#### 実装方針（SVGは使わない場合）

CSS Grid で中心 + 周辺配置を実現。接続線は `border` + 絶対配置要素で描画。

```
grid-template-areas:
  ". hinata ."
  "luna main tsubaki"
  ". yui ."
  ". rin ."
```

各エージェントは `48px x 48px` の円形アイコン + 名前 + 担当。ホバーで詳細ポップアップ（Tailwind `group/peer` パターン、JS不要）。

#### モバイル対応

モバイルでは横フローの代わりに縦リスト（`WorkflowSection` 現行のモバイル表示を踏襲）。

---

## 4. コンポーネント階層・ファイル構成

### 新規・変更ファイル一覧

| ファイル | 変更種別 | 内容 |
|---|---|---|
| `app/page.tsx` | 編集 | セクション構成を6セクションに更新 |
| `app/globals.css` | 編集 | 新規アニメーション追加（voice-wave, sparkle-burst, skill-fill） |
| `src/constants/characters.ts` | 編集 | `Character` 型にフィールド追加（後述） |
| `src/components/lp/HeroSection.tsx` | 全面改修 | キャラサムネイル + 2ボタンCTA |
| `src/components/lp/VoiceFeatureSection.tsx` | 新規 | 音声フィードバック訴求セクション |
| `src/components/lp/CharacterGallerySection.tsx` | 新規 | ゲーム的キャラ紹介セクション |
| `src/components/lp/HowItWorksSection.tsx` | 編集 | 4ステップに変更 |
| `src/components/lp/TeamDynamicsSection.tsx` | 新規 | エージェント連携ダイアグラム |
| `src/components/lp/WorkflowSection.tsx` | 削除候補 | TeamDynamics に置き換え |
| `src/components/lp/Footer.tsx` | 編集 | ナビリンク更新 |
| `src/components/CharacterGameCard.tsx` | 新規 | ゲーム的キャラカード本体 |
| `src/components/MainAgentGameCard.tsx` | 新規 | メインエージェント専用ゲームカード |
| `src/components/SkillBar.tsx` | 新規 | RPGスキルバーコンポーネント |

### コンポーネント依存関係

```
app/page.tsx
  ├── HeroSection.tsx
  │     └── (CHARACTERS からサムネイルデータ使用)
  ├── VoiceFeatureSection.tsx
  │     └── (CHARACTERS から personality 使用)
  ├── CharacterGallerySection.tsx
  │     ├── MainAgentGameCard.tsx
  │     │     └── SkillBar.tsx
  │     └── CharacterGameCard.tsx  (× 5)
  │           └── SkillBar.tsx
  ├── HowItWorksSection.tsx (改修)
  │     └── SectionHeader.tsx (既存流用)
  ├── TeamDynamicsSection.tsx
  │     └── SectionHeader.tsx (既存流用)
  └── Footer.tsx (改修)
```

---

## 5. データモデル変更仕様

### `Character` 型への追加フィールド

```typescript
// src/constants/characters.ts に追加

export interface CharacterStats {
  /** スキル名 */
  label: string;
  /** 0〜100 の整数値 */
  value: number;
}

export interface Character {
  // --- 既存フィールド（変更なし） ---
  id: number;
  name: string;
  agentId: string;
  role: "main" | "sub";
  imagePath: string;
  description: string;
  personality: string;
  responsibility: string;
  themeColor: {
    glow: string;
    border: string;
    button: string;
    buttonHover: string;
    badge: string;
    glowValue: string;
    /** 追加: テーマカラーの完全クラス文字列（グラデーション用） */
    gradientFrom: string;  // e.g. "from-amber-400"
    gradientTo: string;    // e.g. "to-orange-500"
    /** 追加: ゲームカード背景用の半透明カラー e.g. "bg-amber-400/10" */
    cardBg: string;
    /** 追加: スキルバー塗りつぶし色 e.g. "bg-amber-400" */
    skillFill: string;
  };
  tags: string[];

  // --- 追加フィールド ---
  /** ゲームカードに表示するキャラクターの一言セリフ */
  catchphrase: string;
  /** RPGスタイルのスキル一覧（最大3項目） */
  stats: CharacterStats[];
  /** 音声報告時のサンプルセリフ（VoiceFeatureSection で使用） */
  voiceSample: string;
}
```

### 各キャラクターの追加データ定義

#### メインエージェント

```typescript
catchphrase: "チーム全員で、最高のコードを届けよう！",
voiceSample: "実装が完了したよ！PRの確認よろしくね〜！",
stats: [
  { label: "指揮統率",           value: 100 },
  { label: "タスク振り分け",     value: 90  },
  { label: "コーディネーション", value: 100 },
],
// themeColor 追加分
gradientFrom: "from-slate-400",
gradientTo:   "to-slate-600",
cardBg:       "bg-slate-400/10",
skillFill:    "bg-slate-400",
```

#### るな (luna-coder)

```typescript
catchphrase: "コーディング、任せてよ！全力でいくよ〜！",
voiceSample: "るなだよ！実装完了！テストも全部グリーンだよ〜！",
stats: [
  { label: "実装速度", value: 95  },
  { label: "コード量", value: 100 },
  { label: "テンション", value: 100 },
],
gradientFrom: "from-amber-400",
gradientTo:   "to-orange-500",
cardBg:       "bg-amber-400/10",
skillFill:    "bg-amber-400",
```

#### ひなた (hinata-explorer)

```typescript
catchphrase: "あ、見つけた！ここにあったんだ〜！",
voiceSample: "ひなただよ！コードベースの調査が終わったよ！関連ファイルは3つあったよ〜",
stats: [
  { label: "探索範囲", value: 100 },
  { label: "発見速度", value: 90  },
  { label: "好奇心",   value: 100 },
],
gradientFrom: "from-sky-400",
gradientTo:   "to-cyan-500",
cardBg:       "bg-sky-400/10",
skillFill:    "bg-sky-400",
```

#### ゆい (yui-debugger)

```typescript
catchphrase: "バグの原因は特定済み。修正方法も提示する。",
voiceSample: "ゆいです。バグを3件検出、修正しました。テストカバレッジは92%です。",
stats: [
  { label: "バグ検出率", value: 98  },
  { label: "論理精度",   value: 100 },
  { label: "冷静度",     value: 95  },
],
gradientFrom: "from-emerald-400",
gradientTo:   "to-teal-500",
cardBg:       "bg-emerald-400/10",
skillFill:    "bg-emerald-400",
```

#### つばき (tsubaki-reviewer)

```typescript
catchphrase: "このコード……合格。でも、次はもっとやれる。",
voiceSample: "つばきです。レビュー完了しました。指摘事項は2件、改善推奨が1件あります。",
stats: [
  { label: "コード品質",   value: 100 },
  { label: "セキュリティ", value: 95  },
  { label: "厳格さ",       value: 100 },
],
gradientFrom: "from-rose-400",
gradientTo:   "to-red-500",
cardBg:       "bg-rose-400/10",
skillFill:    "bg-rose-400",
```

#### 凛 (rin-planner)

```typescript
catchphrase: "まず整理しましょう。手順通りに進めれば、必ず良い結果になります。",
voiceSample: "朝倉凛です。実装計画が完成しました。ステップ数は5、推定工数は3時間です。",
stats: [
  { label: "設計精度",   value: 100 },
  { label: "要件整理力", value: 98  },
  { label: "計画性",     value: 100 },
],
gradientFrom: "from-indigo-400",
gradientTo:   "to-violet-500",
cardBg:       "bg-indigo-400/10",
skillFill:    "bg-indigo-400",
```

---

## 6. アニメーション仕様

### 新規追加アニメーション（globals.css）

#### sparkle-burst（ヒーローパーティクル強化）

```css
@keyframes sparkle-burst {
  0%   { opacity: 0; transform: scale(0) rotate(0deg); }
  50%  { opacity: 1; transform: scale(1) rotate(180deg); }
  100% { opacity: 0; transform: scale(0) rotate(360deg); }
}

.animate-sparkle {
  animation: sparkle-burst 2.5s ease-in-out infinite;
}
```

#### voice-wave（音声波形）

```css
@keyframes voice-wave {
  0%, 100% { height: 4px; }
  50%       { height: 20px; }
}

/* 使い方: 各バーに delay を段階的に指定 */
.voice-bar { animation: voice-wave 0.8s ease-in-out infinite; }
.voice-bar:nth-child(1) { animation-delay: 0s;    }
.voice-bar:nth-child(2) { animation-delay: 0.1s;  }
.voice-bar:nth-child(3) { animation-delay: 0.2s;  }
.voice-bar:nth-child(4) { animation-delay: 0.15s; }
.voice-bar:nth-child(5) { animation-delay: 0.05s; }
```

#### skill-fill（スキルバー出現）

```css
@keyframes skill-fill {
  from { width: 0%; }
  to   { width: var(--skill-value); }
}

.skill-bar-fill {
  animation: skill-fill 0.8s ease-out both;
  /* width は JS で --skill-value にセット or inline style で指定 */
}
```

#### scroll-reveal-stagger（カード連鎖アニメーション）

スキルバーはスクロールでビューに入ったとき初めてアニメーションする。`useScrollReveal` フックの `is-visible` クラスと組み合わせる。

```css
/* 既存 scroll-reveal に追加 */
.scroll-reveal.is-visible .skill-bar-fill {
  animation: skill-fill 0.8s ease-out both;
}

/* カード個別 delay */
.scroll-reveal.is-visible .character-game-card:nth-child(1) { animation-delay: 0s;   }
.scroll-reveal.is-visible .character-game-card:nth-child(2) { animation-delay: 0.1s; }
/* ... */
```

### 既存アニメーション（継続使用）

| アニメーション | 用途 | 変更有無 |
|---|---|---|
| `card-enter` | ヒーロー入場 | 変更なし |
| `fairy-float` | パーティクル浮遊 | 変更なし |
| `fairy-glow` | パーティクル明滅 | 変更なし |
| `pulse-glow` | メインエージェントリング | 変更なし |
| `fade-in-up` | スクロールリビール汎用 | 変更なし |
| `.scroll-reveal` | スクロールリビールクラス | 拡張のみ |

---

## 7. カラーパレット・タイポグラフィ

### グローバルカラー（変更なし）

```
背景ベース:     #090e1a  (深夜ネイビー)
テキスト:       #e2e8f0  (ライトスレート)
グラデーション: blue-300 → cyan-200 → blue-300 (セクションタイトル共通)
アクセント:     blue-400/50 (区切り線・接続線)
```

### キャラクターテーマカラー

| キャラ | Primary | Glow RGB |
|---|---|---|
| メイン | slate-400 | 148,163,184 |
| るな | amber-400 / orange-500 | 251,191,36 |
| ひなた | sky-400 / cyan-500 | 56,189,248 |
| ゆい | emerald-400 / teal-500 | 52,211,153 |
| つばき | rose-400 / red-500 | 251,113,133 |
| 凛 | indigo-400 / violet-500 | 129,140,248 |

### タイポグラフィ

Geist Sans / Geist Mono（既存設定を流用）。フォントサイズ体系は変更なし。

キャラカード固有の追加スタイル:

| 要素 | クラス |
|---|---|
| キャラ名（カード内） | `text-2xl font-bold text-white` |
| キャッチフレーズ | `text-sm italic text-white/70` |
| スキルラベル | `text-xs font-medium text-white/60` |
| スキル数値 | `text-xs font-bold` + テーマカラー |
| ロールバッジ | `text-xs font-semibold uppercase tracking-widest` |

---

## 8. レスポンシブブレークポイント戦略

Tailwind v4 デフォルトブレークポイントを使用:

| ブレークポイント | 幅 | 対象デバイス |
|---|---|---|
| (デフォルト) | 375px〜 | スマートフォン縦 |
| `sm:` | 640px〜 | スマートフォン横・小タブレット |
| `md:` | 768px〜 | タブレット縦 |
| `lg:` | 1024px〜 | タブレット横・小デスクトップ |
| `xl:` | 1280px〜 | デスクトップ |

### セクション別レスポンシブ指針

#### CharacterGallery

```
375px:  1カラム（カード縦スタック）
768px:  2カラムグリッド
1280px: メイン1列 + サブ3カラムグリッド
```

メインエージェントカード内部:

```
375px:  縦積み（画像上・テキスト下）
640px:  横並び（画像左・テキスト右）
```

#### VoiceFeature

```
375px:  縦積み（コーダー → 矢印 → 音声バブル）
768px:  横並び2カラム
```

#### TeamDynamics

```
375px:  縦リスト（接続線付き）
1024px: 中央放射状ダイアグラム
```

---

## 9. 実装フェーズ・順序

### Phase 1: データモデル拡張（前提条件）

**対象ファイル**: `src/constants/characters.ts`

1. `CharacterStats` インターフェースを追加
2. `Character` 型に `catchphrase`, `stats`, `voiceSample`, `themeColor` 追加フィールドを追加
3. 全6キャラクターのデータを本ドキュメント「データモデル変更仕様」に従って補完
4. TypeScript コンパイルエラーがないことを確認（`npm run build`）

> **注意**: 既存フィールドは一切変更しない。追加のみ。

---

### Phase 2: CSS アニメーション追加

**対象ファイル**: `app/globals.css`

1. `voice-wave` キーフレームとユーティリティクラスを追加
2. `sparkle-burst` キーフレームを追加
3. `skill-fill` キーフレームを追加
4. `.scroll-reveal.is-visible .skill-bar-fill` のトリガーCSSを追加

---

### Phase 3: 共通コンポーネント新規作成

1. `src/components/SkillBar.tsx` を作成
   - Props: `label: string`, `value: number`, `fillClass: string`（e.g. `"bg-amber-400"`）
   - スキルバーアニメーションはCSSクラスで制御（JS計算なし）
   - `--skill-value` CSS変数をインラインスタイルで `width` にセット

2. `src/components/CharacterGameCard.tsx` を作成
   - Props: `character: Character`, `index: number`
   - 立ち絵エリア（プレースホルダー対応）
   - スキルバー3本（`SkillBar` コンポーネント使用）
   - キャッチフレーズ・タグバッジ

3. `src/components/MainAgentGameCard.tsx` を作成
   - Props: `character: Character`
   - フル幅横長レイアウト
   - メインエージェント専用スタイル

---

### Phase 4: LP セクション新規作成

以下の順で作成する（依存関係の少ないものから）:

1. `src/components/lp/VoiceFeatureSection.tsx`
2. `src/components/lp/CharacterGallerySection.tsx`
3. `src/components/lp/TeamDynamicsSection.tsx`

---

### Phase 5: 既存セクション改修

1. `src/components/lp/HeroSection.tsx` を全面改修
2. `src/components/lp/HowItWorksSection.tsx` に第4ステップを追加
3. `src/components/lp/Footer.tsx` のナビリンクを更新

---

### Phase 6: ページ組み立て・最終確認

1. `app/page.tsx` のセクション構成を更新
2. `npm run build` でビルドエラーがないことを確認
3. モバイル（375px）・タブレット（768px）・デスクトップ（1280px）での表示確認
4. `npm run lint` でESLintエラーがないことを確認

---

## 10. 注意事項・制約

### Tailwind v4 動的クラスの禁止（最重要）

テンプレートリテラルによる動的クラス生成は**絶対に使わない**。

```typescript
// NG: Tailwind v4 ではパージされる
const cls = `bg-${character.themeColor.primary}-400`;

// OK: characters.ts に完全なクラス文字列を定義して使う
const cls = character.themeColor.cardBg; // "bg-amber-400/10"
```

`characters.ts` に定義するカラークラスはすべて完全な文字列であること。

### Server Component 維持方針

インタラクションが不要なコンポーネントは `"use client"` を付けない。

- `CharacterGameCard`: ホバーは `group/group-hover:` で実装 → Server Component 可
- `SkillBar`: アニメーションはCSSのみ → Server Component 可
- `VoiceFeatureSection`: 波形アニメーションはCSSのみ → Server Component 可
- `CharacterGallerySection`: スクロールリビール必要 → `"use client"` 必須
- `TeamDynamicsSection`: スクロールリビール必要 → `"use client"` 必須

### 画像の `sizes` 属性

`next/image` を使う箇所は必ず `sizes` を指定する。

```tsx
// 立ち絵（カード内）
<Image sizes="(max-width: 640px) 128px, 160px" />

// サムネイル（ヒーロー）
<Image sizes="64px" />
```

### アクセシビリティ

- インタラクティブ要素には `aria-label` を付与
- スキルバーには `role="progressbar"` + `aria-valuenow` + `aria-valuemax="100"` を使用
- カラーのみで情報を伝えない（スキルバーには数値テキストも表示する）

---

## 11. 完了条件チェックリスト

### Phase 1 完了条件
- [ ] `Character` 型に `catchphrase`, `stats`, `voiceSample` が追加されている
- [ ] `themeColor` に `gradientFrom`, `gradientTo`, `cardBg`, `skillFill` が追加されている
- [ ] 全6キャラクターのデータが揃っている
- [ ] `npm run build` でエラーなし

### Phase 2 完了条件
- [ ] `voice-wave`, `sparkle-burst`, `skill-fill` のキーフレームが定義されている
- [ ] `.skill-bar-fill` クラスが定義されている

### Phase 3 完了条件
- [ ] `SkillBar.tsx` が `role="progressbar"` 付きでアクセシブルに実装されている
- [ ] `CharacterGameCard.tsx` が立ち絵プレースホルダー対応で実装されている
- [ ] `MainAgentGameCard.tsx` がフル幅レイアウトで実装されている

### Phase 4 完了条件
- [ ] `VoiceFeatureSection` に音声波形アニメーションがある
- [ ] `CharacterGallerySection` にスクロールリビールがある
- [ ] `TeamDynamicsSection` に連携ダイアグラムがある

### Phase 5 完了条件
- [ ] `HeroSection` にキャラサムネイル5体と2ボタンCTAがある
- [ ] `HowItWorksSection` が4ステップ構成になっている
- [ ] `Footer` のナビリンクが更新されている

### Phase 6 完了条件
- [ ] `app/page.tsx` が6セクション構成になっている
- [ ] `npm run build` でエラーなし
- [ ] `npm run lint` でエラーなし
- [ ] モバイル375px・タブレット768px・デスクトップ1280pxで表示崩れなし
- [ ] スキルバーがスクロールインビュー時にアニメーションする
- [ ] 動的Tailwindクラスが一切使われていない

---

*以上。漏れがないか確認しました。手順通りに進めれば、必ず良い結果になります。*
