# Claude Code Agent Fairies - Design Document V0

**作成日**: 2026年2月27日
**ステータス**: V0 Handoff Ready
**対象**: ランディングページ（LP）デザイン・実装仕様書

---

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [キャラクター定義](#キャラクター定義)
3. [ビジュアルデザイン方向](#ビジュアルデザイン方向)
4. [ページ構成・セクション](#ページ構成セクション)
5. [コンポーネント体系](#コンポーネント体系)
6. [カラーパレット](#カラーパレット)
7. [タイポグラフィ](#タイポグラフィ)
8. [アニメーション仕様](#アニメーション仕様)
9. [データモデル](#データモデル)
10. [アセット一覧](#アセット一覧)
11. [実装上の注意事項](#実装上の注意事項)
12. [レスポンシブ設計](#レスポンシブ設計)

---

## プロジェクト概要

### ビジョン

「**ながら作業を解放する、Claude Code agent fairies**」

開発者が**コードに集中したままで、AIエージェントの進捗を耳で受け取る**新しい開発体験を提供するランディングページ。

### 技術スタック

| 要素 | 仕様 |
|---|---|
| フレームワーク | Next.js 16.1.6（App Router） |
| UI ライブラリ | React 19.2.3 |
| スタイリング | Tailwind CSS v4（PostCSS 経由） |
| 言語 | TypeScript 5（strict mode） |
| フォント | Geist Sans / Geist Mono（Google Fonts） |

### スコープ（V0）

- **実装対象**: ランディングページ（6セクション）
- **チャット機能**: スコープ外（将来実装）
- **バックエンド**: 不要
- **認証**: 不要

---

## キャラクター定義

### キャラクター一覧

プロジェクトには**6つのエージェントキャラクター**が登場します。

| ID | 名前 | 役割 | カテゴリ | 担当分野 | テーマカラー | 性格 |
|---|---|---|---|---|---|---|
| 0 | 光（ひか） | メインエージェント | Main | 統括・コーディネーション | Orange/Amber | 明るいリーダータイプ |
| 1 | るな | 実装担当 | Sub | コーディング・実装 | Amber/Orange | ハイテンション |
| 2 | ひなた | 調査担当 | Sub | コードベース探索 | Sky/Cyan | 好奇心旺盛 |
| 3 | ゆい | デバッグ担当 | Sub | デバッグ・テスト | Emerald/Teal | 冷静沈着 |
| 4 | つばき | レビュー担当 | Sub | コードレビュー・品質管理 | Rose/Red | 厳格 |
| 5 | 凛 | 設計担当 | Sub | 設計・計画 | Indigo/Violet | 体系的 |

### キャラクター詳細スペック

#### メインエージェント：光（ひか）

```
ID: 0
Name: 光
AgentId: main-coordinator
Role: main
ImagePath: /images/characters/hika.png

Description:
  チームのムードメーカーな司令塔。ユーザーとの対話窓口として、
  最適なサブエージェントにタスクを振り分ける。

Personality:
  明るくポジティブなリーダータイプ。チームのムードメーカーで、
  どんな状況でも前向きに解決策を探す。

Responsibility: 統括・コーディネーション

ThemeColor:
  - Primary: orange-400 / amber-500
  - Glow: "0 0 20px rgba(251,146,60,0.4)"
  - Border: border-orange-400/60
  - Badge: "bg-orange-400/20 text-orange-200 border-orange-400/30"
  - GradientFrom: from-orange-400
  - GradientTo: to-amber-500
  - CardBg: bg-orange-400/10
  - SkillFill: bg-orange-400
  - SkillText: text-orange-400

Tags: ["統括", "司令塔", "コーディネーター"]

Catchphrase: "みんなで最高のコード作っちゃおっ！あたしに任せてっ！"

VoiceSample: "やっほー！光だよ〜！今日も全力でいくっしょ！"

Stats:
  - 指揮統率: 100%
  - タスク振り分け: 90%
  - コーディネーション: 100%
```

#### るな（luna-coder）

```
ID: 1
Name: るな
AgentId: luna-coder
Role: sub
ImagePath: /images/characters/luna.png

Description:
  高いエネルギーとポジティブなバイブスでコードを書く実装担当。
  どんな仕様でも全力で実装する。

Personality:
  超ハイテンションでポジティブ。コーディングが大好きで、
  実装に全力を注ぐ。

Responsibility: コーディング・実装

ThemeColor:
  - Primary: amber-400 / orange-500
  - Glow: "0 0 20px rgba(251,191,36,0.4)"
  - Border: border-amber-400/60
  - Badge: "bg-amber-400/20 text-amber-200 border-amber-400/30"
  - GradientFrom: from-amber-400
  - GradientTo: to-orange-500
  - CardBg: bg-amber-400/10
  - SkillFill: bg-amber-400
  - SkillText: text-amber-400

Tags: ["コーディング", "実装担当", "ハイテンション"]

Catchphrase: "コーディング、任せてよ！全力でいくよ〜！"

VoiceSample: "るなだよ！実装完了！テストも全部グリーンだよ〜！"

Stats:
  - 実装速度: 95%
  - コード量: 100%
  - テンション: 100%
```

#### ひなた（hinata-explorer）

```
ID: 2
Name: ひなた
AgentId: hinata-explorer
Role: sub
ImagePath: /images/characters/hinata.png

Description:
  熱意と好奇心でコードベースを探索する調査担当。
  ファイル構造やコードパターンを素早く見つけ出す。

Personality:
  好奇心旺盛で探索大好き。コードベースのどこに何があるか、
  すぐに見つけ出す。

Responsibility: コードベース探索・調査

ThemeColor:
  - Primary: sky-400 / cyan-500
  - Glow: "0 0 20px rgba(56,189,248,0.4)"
  - Border: border-sky-400/60
  - Badge: "bg-sky-400/20 text-sky-200 border-sky-400/30"
  - GradientFrom: from-sky-400
  - GradientTo: to-cyan-500
  - CardBg: bg-sky-400/10
  - SkillFill: bg-sky-400
  - SkillText: text-sky-400

Tags: ["探索", "調査担当", "好奇心旺盛"]

Catchphrase: "あ、見つけた！ここにあったんだ〜！"

VoiceSample: "ひなただよ！コードベースの調査が終わったよ！関連ファイルは3つあったよ〜"

Stats:
  - 探索範囲: 100%
  - 発見速度: 90%
  - 好奇心: 100%
```

#### ゆい（yui-debugger）

```
ID: 3
Name: ゆい
AgentId: yui-debugger
Role: sub
ImagePath: /images/characters/yui.png

Description:
  冷静なロジックと外科的精度で問題を分析するデバッグ担当。
  バグの原因を正確に特定する。

Personality:
  冷静沈着で論理的。バグの原因を正確に特定し、
  テストコードも書く。

Responsibility: デバッグ・テスト

ThemeColor:
  - Primary: emerald-400 / teal-500
  - Glow: "0 0 20px rgba(52,211,153,0.4)"
  - Border: border-emerald-400/60
  - Badge: "bg-emerald-400/20 text-emerald-200 border-emerald-400/30"
  - GradientFrom: from-emerald-400
  - GradientTo: to-teal-500
  - CardBg: bg-emerald-400/10
  - SkillFill: bg-emerald-400
  - SkillText: text-emerald-400

Tags: ["デバッグ", "テスト担当", "冷静沈着"]

Catchphrase: "バグの原因は特定済み。修正方法も提示する。"

VoiceSample: "ゆいです。バグを3件検出、修正しました。テストカバレッジは92%です。"

Stats:
  - バグ検出率: 98%
  - 論理精度: 100%
  - 冷静度: 95%
```

#### つばき（tsubaki-reviewer）

```
ID: 4
Name: つばき
AgentId: tsubaki-reviewer
Role: sub
ImagePath: /images/characters/tsubaki.png

Description:
  厳格だが心の中ではコードの成功を願うレビュー担当。
  品質とセキュリティに妥協しない。

Personality:
  厳格で率直。コードの品質に妥協せず、でも内心
  コードの成功を願っている。

Responsibility: コードレビュー・品質管理

ThemeColor:
  - Primary: rose-400 / red-500
  - Glow: "0 0 20px rgba(251,113,133,0.4)"
  - Border: border-rose-400/60
  - Badge: "bg-rose-400/20 text-rose-200 border-rose-400/30"
  - GradientFrom: from-rose-400
  - GradientTo: to-red-500
  - CardBg: bg-rose-400/10
  - SkillFill: bg-rose-400
  - SkillText: text-rose-400

Tags: ["レビュー", "品質管理", "厳格"]

Catchphrase: "このコード……合格。でも、次はもっとやれる。"

VoiceSample: "つばきです。レビュー完了しました。指摘事項は2件、改善推奨が1件あります。"

Stats:
  - コード品質: 100%
  - セキュリティ: 95%
  - 厳格さ: 100%
```

#### 凛（rin-planner）

```
ID: 5
Name: 凛
AgentId: rin-planner
Role: sub
ImagePath: /images/characters/rin.png

Description:
  体系的な精度と徹底的な分析で設計に取り組む計画担当。
  要件整理から実装計画まで緻密に策定する。

Personality:
  体系的で丁寧。設計と計画を緻密に行い、
  漏れのない手順を組み立てる。

Responsibility: 設計・計画

ThemeColor:
  - Primary: indigo-400 / violet-500
  - Glow: "0 0 20px rgba(129,140,248,0.4)"
  - Border: border-indigo-400/60
  - Badge: "bg-indigo-400/20 text-indigo-200 border-indigo-400/30"
  - GradientFrom: from-indigo-400
  - GradientTo: to-violet-500
  - CardBg: bg-indigo-400/10
  - SkillFill: bg-indigo-400
  - SkillText: text-indigo-400

Tags: ["設計", "計画担当", "体系的"]

Catchphrase: "まず整理しましょう。手順通りに進めれば、必ず良い結果になります。"

VoiceSample: "朝倉凛です。実装計画が完成しました。ステップ数は5、推定工数は3時間です。"

Stats:
  - 設計精度: 100%
  - 要件整理力: 98%
  - 計画性: 100%
```

---

## ビジュアルデザイン方向

### デザインコンセプト

**「妖精 × AI × ダークモード」**

- **妖精モチーフ**: パーティクル・光の筋・ファンタジー感
- **テック感**: グラスモーフィズム・グラデーション・モダンなUX
- **ダークモード**: 深夜ネイビーを基調とした落ち着いた背景
- **アニメーション**: スムーズで控えめ（邪魔しない）

### 世界観・トーン

| 要素 | 表現方法 |
|---|---|
| キャラクター | アニメ調の美少女イラスト（立ち絵）+ グラデーション背景 |
| 背景 | 深夜のネイビー + 光の粒とグロウ効果 |
| テキスト | 親しみやすい日本語 + 敬語を避けたフレンドリーなトーン |
| インタラクション | スムーズなスクロール + スケール + グロウアニメ |
| 音声 | キャラクター別のボイスサンプル（Aivis Cloud API） |

---

## ページ構成・セクション

### ページレイアウト概要

```
┌─────────────────────────────────┐
│  Hero Section (全画面)           │
├─────────────────────────────────┤
│  Voice Feature Section           │
├─────────────────────────────────┤
│  Character Gallery Section       │
│  (メイン + サブ6体)             │
├─────────────────────────────────┤
│  How It Works Section (4ステップ)│
├─────────────────────────────────┤
│  Team Dynamics Section (連携図)  │
├─────────────────────────────────┤
│  Footer                         │
└─────────────────────────────────┘
```

### Section 1: Hero Section

**目的**: インパクト + CTA導線

**レイアウト（デスクトップ）**:
```
[装飾パーティクル]

  * Claude Code Agent Fairies *

  ✦ Claude Code Agent Fairies ✦
  （グラデーションタイトル）

  コードに集中したまま、AIがあなたの耳に進捗を届ける。

  [るな] [ひなた] [ゆい] [つばき] [凛]
  （小さいキャラサムネイル 横並び）

  [声でレポートを聞く] [チームを見る]
```

**実装コンポーネント**:
- `HeroSection.tsx`: メインコンテナ
  - スパークル装飾（`animate-sparkle`）
  - グラデーションタイトル
  - キャラクターサムネイル5体（ホバーで`#characters`へスクロール）
  - 2つのCTAボタン

**アニメーション**:
- `animate-card-enter`: 段階的な遅延（0s, 0.1s, 0.2s...）
- `fairy-float` / `fairy-glow`: パーティクル浮遊
- `sparkle-burst`: 新規キラキラ効果

**リンク先**:
- 「声でレポートを聞く」 → `#voice`
- 「チームを見る」 → `#characters`

---

### Section 2: Voice Feature Section

**目的**: 音声フィードバック機能の価値訴求（Eyes-Free Development）

**レイアウト**:
```
[セクションヘッダ]

┌──────────────────────────────────────┐
│  [コードエディタ風]    [音声バブル]   │
│  （カーソル点滅）      （波形表示）   │
└──────────────────────────────────────┘

┌──────────┐ ┌──────────┐ ┌──────────┐
│ 🔊 キャラ │ │ 👁️ 目は   │ │ ⚡ リアル │
│ 別の声   │ │ コード   │ │ タイム   │
│          │ │ だけに   │ │ 進捗報告 │
└──────────┘ └──────────┘ └──────────┘
```

**実装コンポーネント**:
- `VoiceFeatureSection.tsx`
  - **左パネル**: コードエディタ風ブロック + 点滅カーソル
  - **右パネル**: キャラアイコン + 音声波形アニメーション + セリフバブル
  - **3つの特徴カード**: スクロールリビール対応

**アニメーション**:
- `voice-wave`: 音声波形の上下アニメーション（各バー delay ずらし）
- `animate-cursor-blink`: カーソルの点滅
- スクロールリビール: 特徴カードが段階的に表示

---

### Section 3: Character Gallery Section

**目的**: キャラクター紹介（ゲーム的な魅力表現）

**レイアウト構成**:
```
[セクションヘッダ]

┌──────────────────────────────────┐
│  [メインエージェント - 横長カード]│
└──────────────────────────────────┘

[接続線]

┌──────┐ ┌──────┐ ┌──────┐
│ Sub1 │ │ Sub2 │ │ Sub3 │
├──────┤ ├──────┤ ├──────┤
│ Sub4 │ │ Sub5 │
└──────┘ └──────┘
```

**実装コンポーネント**:
- `CharacterGallerySection.tsx`
  - `MainAgentGameCard.tsx`: メインエージェント専用カード
    - 立ち絵（左側）+ テキスト情報（右側）
    - スキルバー（3本）
    - ボイスサンプル再生ボタン
  - `CharacterGameCard.tsx`: サブエージェント用カード（× 5）
    - 立ち絵（左上）+ テキスト情報
    - スキルバー（3本）
    - ボイスサンプル再生ボタン
    - キャッチフレーズ + タグバッジ

**カード内要素**:
1. **ロールバッジ**: 「Main Agent」「Sub Agent」
2. **立ち絵エリア**: キャラクター画像（プレースホルダー対応）
3. **キャラクター名**: 大きく表示
4. **担当責任**: 小さいテキスト
5. **キャッチフレーズ**: イタリック引用符付き
6. **ボイスサンプルボタン**: ▶ / ■ 再生ボタン + セリフバブル
7. **スキルバー**: 3項目（RPG風）
8. **タグバッジ**: 最大3個

**アニメーション**:
- `card-enter`: カード入場（インデックス× 0.1s delay）
- `scroll-reveal`: スクロールでビューイン時表示
- `skill-fill`: スクロール時にスキルバー埋まる（遅延あり）
- `voice-btn-playing`: ボイス再生中のパルスグロウ

---

### Section 4: How It Works Section

**目的**: エージェントシステムの仕組みを4ステップで説明

**ステップ定義**:

| ステップ | タイトル | 説明 | アイコン |
|---|---|---|---|
| 1 | タスク受付 | ユーザーからの依頼をメインエージェントが受け取り分析 | 📥 |
| 2 | タスク振り分け | タスク内容に応じて最適なスペシャリストを選定・指示 | 🔀 |
| 3 | 実行・統合 | 各スペシャリストが実行、メインエージェントが成果を統合 | ✅ |
| 4 | 音声で報告 | 完了と進捗をキャラクターの声でリアルタイムにお知らせ | 🔊 |

**レイアウト**:
```
デスクトップ (横フロー):
[Step1] → [Step2] → [Step3] → [Step4]

モバイル (縦フロー):
[Step1]
   ↓
[Step2]
   ↓
[Step3]
   ↓
[Step4]
```

**実装コンポーネント**:
- `HowItWorksSection.tsx`
  - `StepCard` (× 4)
  - デスクトップ: `flex md:flex-row` + 矢印区切り
  - モバイル: `flex flex-col` + 接続線区切り

---

### Section 5: Team Dynamics Section

**目的**: メインエージェントを中心とした5人の連携を視覚的に表現

**レイアウト**:

**デスクトップ（lg以上）**:
```
         [ひなた]
            |
[るな] - [メイン] - [つばき]
            |
      [ゆい] [凛]
```
（SVG線で中心から各ノードへ接続）

**モバイル（lg未満）**:
```
縦リスト形式（接続線付き）
[光]
  ↓
[るな]
  ↓
[ひなた]
  ↓
[ゆい]
  ↓
[つばき]
  ↓
[凛]
```

**実装コンポーネント**:
- `TeamDynamicsSection.tsx`
  - `AgentNode`: キャラクターアイコン + 名前 + 役割
  - SVG線: 中心(260, 210) から各ノードへ点線で接続
  - マウスホバーで詳細情報表示（Tailwind `group` パターン）

---

### Section 6: Footer

**コンテンツ**:
```
[セパレーターライン]

[ブランドテキスト] [ナビリンク × 4]
```

**ナビリンク**:
1. 音声機能 → `#voice`
2. チーム → `#characters`
3. 仕組み → `#how-it-works`
4. 連携 → `#team-dynamics`

**実装コンポーネント**:
- `Footer.tsx`

---

## コンポーネント体系

### ツリー構造

```
app/page.tsx (root)
├── HeroSection.tsx
│   └── キャラサムネイル (Image × 5)
├── VoiceFeatureSection.tsx
│   ├── SectionHeader.tsx
│   └── FeatureCards (× 3)
├── CharacterGallerySection.tsx
│   ├── SectionHeader.tsx
│   ├── MainAgentGameCard.tsx
│   │   └── SkillBar.tsx (× 3)
│   └── CharacterGameCard.tsx (× 5)
│       └── SkillBar.tsx (× 3)
├── HowItWorksSection.tsx
│   ├── SectionHeader.tsx
│   └── StepCard (× 4)
├── TeamDynamicsSection.tsx
│   ├── SectionHeader.tsx
│   ├── AgentNode (× 6) (デスクトップ)
│   └── リスト表示 (モバイル)
└── Footer.tsx
```

### コンポーネント一覧

| ファイル | タイプ | 用途 | 状態 |
|---|---|---|---|
| `HeroSection.tsx` | Server | ヒーロー画面 | ✅ 完成 |
| `VoiceFeatureSection.tsx` | Server | 音声機能紹介 | ✅ 完成 |
| `CharacterGallerySection.tsx` | Client | キャラギャラリー | ✅ 完成 |
| `HowItWorksSection.tsx` | Client | 仕組み説明（4ステップ） | ✅ 完成 |
| `TeamDynamicsSection.tsx` | Client | チーム連携ダイアグラム | ✅ 完成 |
| `Footer.tsx` | Server | フッター | ✅ 完成 |
| `SectionHeader.tsx` | Client | セクション見出し | ✅ 完成 |
| `MainAgentGameCard.tsx` | Client | メイン用カード | ✅ 完成 |
| `CharacterGameCard.tsx` | Client | サブ用カード | ✅ 完成 |
| `SkillBar.tsx` | Server | RPGスキルバー | ✅ 完成 |
| `useScrollReveal.ts` | Hook | スクロールリビール | ✅ 完成 |

---

## カラーパレット

### グローバルカラー

```
背景ベース:      #090e1a    （深夜ネイビー）
背景淡色:        #0f172a
背景強調:        #0c1526
テキスト主:      #e2e8f0    （ライトスレート）
テキスト副:      #ffffff / #ffffff80
テキスト淡:      #ffffff40
```

### キャラクターテーマカラー

| キャラ | Primary | Secondary | Glow RGB | Tailwind | 背景 |
|---|---|---|---|---|---|
| 光 | orange-400 | amber-500 | 251,146,60 | from-orange-400 / to-amber-500 | bg-orange-400/10 |
| るな | amber-400 | orange-500 | 251,191,36 | from-amber-400 / to-orange-500 | bg-amber-400/10 |
| ひなた | sky-400 | cyan-500 | 56,189,248 | from-sky-400 / to-cyan-500 | bg-sky-400/10 |
| ゆい | emerald-400 | teal-500 | 52,211,153 | from-emerald-400 / to-teal-500 | bg-emerald-400/10 |
| つばき | rose-400 | red-500 | 251,113,133 | from-rose-400 / to-red-500 | bg-rose-400/10 |
| 凛 | indigo-400 | violet-500 | 129,140,248 | from-indigo-400 / to-violet-500 | bg-indigo-400/10 |

### UIカラー

| 要素 | 色 |
|---|---|
| セクション見出し（グラデーション） | from-blue-300 / via-cyan-200 / to-blue-300 |
| 区切り線・接続線 | blue-400/30 〜 blue-400/50 |
| ボーダー（淡） | white/10 〜 white/20 |
| ホバー背景 | white/20 |
| CTA プライマリ | from-blue-400 to-cyan-400 |
| CTA セカンダリ | border-white/20 / bg-white/10 |

---

## タイポグラフィ

### フォント

```
Sans: Geist Sans (var: --font-geist-sans)
Mono: Geist Mono (var: --font-geist-mono)
```

### フォントサイズ体系

| 要素 | Tailwind | 用途 |
|---|---|---|
| スーパータイトル | text-xs / text-sm | セクションラベル |
| ページタイトル | text-4xl / text-5xl / text-6xl | Hero h1 |
| セクションタイトル | text-3xl / text-4xl | Section h2 |
| カードタイトル | text-xl / text-2xl / text-3xl | キャラ名 |
| 本文 | text-sm / text-base | 説明文 |
| 小文字 | text-xs | ラベル・バッジ |

### ウェイト

| 用途 | ウェイト | Tailwind |
|---|---|---|
| 見出し・タイトル | 700 | font-bold |
| サブタイトル | 600 | font-semibold |
| テキスト | 400 | font-normal |
| イタリック（フレーズ） | 400 / italic | italic |

### 行間

| コンテキスト | 行間 | Tailwind |
|---|---|---|
| タイトル | 1.2 | leading-tight |
| 本文 | 1.5 | leading-relaxed |
| 説明 | 1.6 | leading-relaxed |

---

## アニメーション仕様

### キーフレームアニメーション（CSS）

#### fairy-float（パーティクル浮遊）

```css
@keyframes fairy-float {
  0%, 100% { opacity: 0.3; transform: translateY(0) scale(1); }
  50%      { opacity: 0.7; transform: translateY(-20px) scale(1.2); }
}
Duration: 4s〜6s
```

用途: 背景パーティクル

---

#### fairy-glow（パーティクル明滅）

```css
@keyframes fairy-glow {
  0%, 100% { opacity: 0.2; }
  50%      { opacity: 0.5; }
}
Duration: 3s
```

用途: 背景光の粒

---

#### card-enter（カード入場）

```css
@keyframes card-enter {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
Duration: 0.5s
```

用途: Hero セクション要素、キャラカード

---

#### fade-in-up（フェードイン上スライド）

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
Duration: 0.6s
```

用途: スクロールリビール汎用

---

#### pulse-glow（パルスグロウ）

```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 8px rgba(148,163,184,0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(148,163,184,0.6);
  }
}
Duration: 2s
```

用途: メインエージェント画像リング

---

#### sparkle-burst（キラキラ爆発）

```css
@keyframes sparkle-burst {
  0%   { opacity: 0; transform: scale(0) rotate(0deg); }
  50%  { opacity: 1; transform: scale(1) rotate(180deg); }
  100% { opacity: 0; transform: scale(0) rotate(360deg); }
}
Duration: 2.5s
```

用途: Hero パーティクル（✦ 記号）

---

#### voice-wave（音声波形）

```css
@keyframes voice-wave {
  0%, 100% { height: 4px; }
  50%      { height: 20px; }
}
Duration: 0.8s
Delays: 各バー 0.05s〜 0.2s ずつずらす
```

用途: VoiceFeatureSection 音声波形バー

---

#### skill-fill（スキルバー埋まる）

```css
@keyframes skill-fill {
  from { width: 0%; }
  to   { width: var(--skill-value); }
}
Duration: 0.8s
Timing: ease-out
```

用途: キャラクターカード内スキルバー

---

#### cursor-blink（カーソル点滅）

```css
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}
Duration: 1s
Timing: step-end
```

用途: VoiceFeatureSection コードエディタのカーソル

---

#### voice-btn-pulse（ボイスボタンパルス）

```css
@keyframes voice-btn-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 var(--voice-btn-glow, rgba(251,146,60,0.4));
    opacity: 1;
  }
  50% {
    box-shadow: 0 0 12px 4px var(--voice-btn-glow, rgba(251,146,60,0.4));
    opacity: 0.85;
  }
}
Duration: 1.2s
```

用途: ボイスサンプル再生ボタン（再生中）

---

### CSS クラス・トランジション

#### scroll-reveal（スクロールリビール）

```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.scroll-reveal.is-visible .skill-bar-fill {
  animation: skill-fill 0.8s ease-out var(--skill-delay, 0s) both;
  width: var(--skill-value);
}
```

実装: `useScrollReveal` フック + IntersectionObserver

---

### Tailwind ユーティリティ

| クラス | 効果 |
|---|---|
| `animate-pulse-glow` | パルスグロウ（2s） |
| `animate-sparkle` | スパークル爆発（2.5s） |
| `animate-card-enter` | カード入場（0.5s） |
| `animate-cursor-blink` | カーソル点滅（1s） |
| `voice-btn-playing` | ボイスボタン再生中アニメーション |
| `voice-bar` | 音声波形バー要素 |
| `skill-bar-fill` | スキルバー埋め埋アニメーション |

---

## データモデル

### Character インターフェース

```typescript
export interface CharacterStats {
  label: string;      // スキル名 e.g. "実装速度"
  value: number;      // 0〜100 の整数値
}

export interface Character {
  // --- 基本情報 ---
  id: number;                // 0〜5
  name: string;              // キャラクター名（日本語）
  agentId: string;           // ユニークID e.g. "luna-coder"
  role: "main" | "sub";      // Main / Sub
  imagePath: string;         // /images/characters/...png
  description: string;       // キャラ説明（2〜3文）
  personality: string;       // 性格説明
  responsibility: string;    // 担当分野

  // --- ビジュアルテーマ ---
  themeColor: {
    glow: string;           // shadow-[...] arbitrary
    border: string;         // border-color クラス
    button: string;         // グラデーション from クラス
    buttonHover: string;    // グラデーション hover クラス
    badge: string;          // バッジ複合クラス文字列
    glowValue: string;      // box-shadow 値（CSS）
    gradientFrom: string;   // "from-amber-400" など
    gradientTo: string;     // "to-orange-500" など
    cardBg: string;         // "bg-amber-400/10" など
    skillFill: string;      // "bg-amber-400" など
    skillText: string;      // "text-amber-400" など
  };

  // --- キャラクターコンテンツ ---
  tags: string[];           // ["コーディング", "実装担当", ...]
  catchphrase: string;      // ゲームカード内セリフ
  stats: CharacterStats[];  // RPGスキル (最大3項目)
  voiceSample: string;      // 音声セリフテキスト
  voiceSamplePath?: string; // /sound/...mp3 (オプション)
}
```

### CHARACTERS 配列

ファイル: `/src/constants/characters.ts`

全6キャラクターのデータが定義済み。各キャラクターの `themeColor`, `stats`, `catchphrase`, `voiceSample` が完全に揃っている。

---

## アセット一覧

### 画像ファイル

| ファイル | 用途 | 形式 | サイズ |
|---|---|---|---|
| `/images/characters/hika.png` | 光（メイン） | PNG | 1.8 MB |
| `/images/characters/luna.png` | るな | PNG | 1.6 MB |
| `/images/characters/hinata.png` | ひなた | PNG | 1.9 MB |
| `/images/characters/hinata-top.png` | ひなた（オルタナティブ） | PNG | 1.9 MB |
| `/images/characters/yui.png` | ゆい | PNG | 1.9 MB |
| `/images/characters/tsubaki.png` | つばき | PNG | 1.8 MB |
| `/images/characters/tsubaki_all.png` | つばき（全身版） | PNG | 1.8 MB |
| `/images/characters/rin.png` | 凛 | PNG | 1.8 MB |
| `/images/characters/rin_all.png` | 凛（全身版） | PNG | 1.9 MB |
| `/images/characters/main-agent.svg` | メインエージェント（SVG版） | SVG | 1.2 KB |

### 音声ファイル

| ファイル | 用途 | 形式 | サイズ |
|---|---|---|---|
| `/sound/AivisCloudAPI-Demo_20260225-161516.mp3` | 音声サンプル | MP3 | 70 KB |

### 注意

- **next/image の sizes 属性**: 各 Image コンポーネントには必ず `sizes` を指定
- **プレースホルダー**: 画像未提供時はキャラカラーのグラデーション + イニシャル文字で対応
- **動的クラス生成禁止**: Tailwind v4 では動的クラスはパージされるため、完全な文字列を `characters.ts` に定義

---

## 実装上の注意事項

### 1. Tailwind v4 動的クラス禁止（重要）

**NG**:
```typescript
const cls = `bg-${theme}-400`;  // パージされる
```

**OK**:
```typescript
const cls = character.themeColor.cardBg;  // "bg-amber-400/10"
```

`characters.ts` に定義するカラークラスはすべて完全な文字列であること。

---

### 2. Server Component 維持方針

インタラクションが不要なコンポーネントは `"use client"` 不要:

- ✅ `SkillBar`: アニメーションはCSSのみ
- ✅ `VoiceFeatureSection`: 波形アニメーションはCSSのみ
- ❌ `CharacterGallerySection`: スクロールリビール必要 → `"use client"`
- ❌ `TeamDynamicsSection`: スクロールリビール必要 → `"use client"`

---

### 3. Image コンポーネント仕様

```typescript
<Image
  src={character.imagePath}
  alt={character.name}
  fill
  className="object-cover object-top"
  sizes="(max-width: 640px) 128px, 160px"
  priority={index < 2}  // 最初の2つはpriority
/>
```

---

### 4. スクロールリビール実装

```typescript
import { useScrollReveal } from "@/src/components/lp/useScrollReveal";

export default function MySection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="scroll-reveal">
      {/* コンテンツ */}
    </div>
  );
}
```

**仕組み**:
- `IntersectionObserver` で要素がビューポートに入った時を検知
- `is-visible` クラスを追加
- CSS の `.scroll-reveal.is-visible` トリガーでアニメーション開始

---

### 5. スキルバー CSS 変数

```typescript
<div
  style={{
    "--skill-value": `${value}%`,
    "--skill-delay": `${delay}s`,
  } as React.CSSProperties}
/>
```

CSS で `var(--skill-value)` と `var(--skill-delay)` を使用。

---

### 6. アクセシビリティ

- ✅ `role="progressbar"` をスキルバーに付与
- ✅ `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` を使用
- ✅ インタラクティブ要素に `aria-label` を付与
- ✅ カラーのみで情報を伝えない（スキルバーには数値テキストも表示）

---

## レスポンシブ設計

### ブレークポイント戦略

Tailwind v4 デフォルトブレークポイント使用:

| ブレークポイント | 幅 | デバイス |
|---|---|---|
| (デフォルト) | 375px〜 | スマートフォン縦 |
| `sm:` | 640px〜 | スマートフォン横・小タブレット |
| `md:` | 768px〜 | タブレット縦 |
| `lg:` | 1024px〜 | タブレット横・小デスクトップ |
| `xl:` | 1280px〜 | デスクトップ |

### セクション別レスポンシブ

#### HeroSection

```
375px: 縦積み（パーティクル・タイトル・CTA縦積み）
640px: キャラサムネイル表示開始、CTA横並び
```

#### VoiceFeatureSection

```
375px: コーダー → 矢印 → 音声バブル（縦積み）
768px: 横並び2カラム
```

#### CharacterGallery

```
375px: 1カラム（カード縦スタック）
768px: 2カラムグリッド
1280px: メイン1列（中央フル幅 max-w-2xl）+ サブ3カラム
```

メインエージェントカード内部:
```
375px: 縦積み（立ち絵上・テキスト下）
640px: 横並び（立ち絵左・テキスト右）
```

#### TeamDynamics

```
375px: 縦リスト（接続線付き）
1024px: 中央放射状ダイアグラム（SVG線付き）
```

---

## 開発環境・コマンド

### インストール・起動

```bash
npm install          # 依存関係インストール
npm run dev          # 開発サーバー起動（localhost:3000）
npm run build        # プロダクションビルド
npm run start        # プロダクション起動
npm run lint         # ESLint チェック
```

---

## Next Steps（将来実装）

このドキュメントはV0ランディングページの設計仕様です。以下は将来のフェーズで実装予定:

- [ ] **[V1] `/chat/[characterId]` チャット画面（ギャルゲー風 ADV フォーマット）**
  - **設計方向**: ギャルゲー・ビジュアルノベルの ADV（Advanced Novel）形式を採用
  - **キャラクター表示**: 立ち絵が画面の 70～85% を占める（全身立ち絵）
  - **テキストボックス**: 画面下部 12～25%（半透明・グラスモーフィズム）
  - **ネームプレート**: キャラクター名 + テーマカラー付きバッジ
  - **選択肢**: 画面中央にゲーム風の選択肢ボタン表示（2～4択）
  - **背景**: キャラに応じたグラデーション背景 + パーティクル演出
  - **没入感重視**: UI要素を最小化し「キャラクターとの対話」に特化
  - **参考**: Monogatari（Web ビジュアルノベルエンジン）、業界標準UI/UXパターン
- [ ] `ChatMessage` / `ChatInput` コンポーネント（ギャルゲー風）
- [ ] モックAPI (`src/lib/mockApi.ts`)
- [ ] API 型定義 (`src/types/api.ts`)
- [ ] AWS Lambda への本実装移行
- [ ] 認証機能
- [ ] 課金機能
- [ ] 3Dアバターアニメーション（スコープ外）

---

## 用語集

| 用語 | 説明 |
|---|---|
| **Glassomorphism** | 透明なガラス効果のデザイン。`backdrop-blur` を使用 |
| **Theme Color** | キャラクター固有のグラデーション・グロウ・バッジカラーセット |
| **Scroll Reveal** | スクロールでビューに入ると同時に表示されるアニメーション |
| **Eyes-Free Dev** | 目を画面から離さずに情報を受け取る開発スタイル（耳で進捗報告） |
| **Main Agent** | チームを統括するメインエージェント（光） |
| **Sub Agent** | 特定の分野に特化したスペシャリストエージェント（5体） |
| **Skill Bar** | RPGゲーム風のキャラクターステータス表示 |
| **Voice Sample** | キャラクターの音声セリフサンプル |

---

## 参考資料

- **実装設計書**: `/docs/lp-redesign.md`
- **プロジェクト仕様**: `/CLAUDE.md`
- **キャラクター定義**: `/src/constants/characters.ts`
- **スタイル基盤**: `/app/globals.css`

---

**このドキュメントは V0 ランディングページの完全な設計仕様です。**
**実装は現在 99% 完成状態。デザイン確定済みで、ハンドオフ準備完了。**

---

*作成者: ひなた（explorer）*
*最終更新: 2026-02-27*
