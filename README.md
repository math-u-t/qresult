# qresult - 匿名質問・アンケートSNS

Vue 3 + Vite + TypeScriptで構築された、匿名で質問やアンケートを作成・回答できるSNSプラットフォーム。

## 🚀 特徴

- **完全匿名**: プライバシーを重視した匿名回答システム
- **リアルタイム結果**: 投票結果をリアルタイムで可視化
- **レスポンシブ対応**: モバイル・タブレット・デスクトップ全対応
- **ダークモード**: ライト/ダークテーマの切り替え
- **型安全**: TypeScriptによる完全な型安全性
- **モダンUI**: Tailwind CSSによる美しいデザイン

## 🛠️ 技術スタック

- **Frontend Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons

## 📦 セットアップ

### 必要要件

- Node.js 18.x 以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone <repository-url>
cd qresult

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーは `http://localhost:3000` で起動します。

### ビルド

```bash
# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview
```

## 📁 プロジェクト構造

```
qresult/
├── src/
│   ├── assets/          # 静的アセット
│   ├── components/      # Vueコンポーネント
│   │   ├── common/      # 共通コンポーネント (Header, Footer)
│   │   └── ui/          # UIコンポーネント (Button, Card, Modal)
│   ├── composables/     # Composition API関数
│   ├── layouts/         # レイアウトコンポーネント
│   ├── pages/           # ページコンポーネント
│   │   ├── main/        # メインページ (Home, Post, Profile)
│   │   ├── auth/        # 認証ページ (Login)
│   │   └── info/        # 情報ページ (FAQ, Terms)
│   ├── router/          # ルーティング設定
│   ├── stores/          # Piniaストア
│   ├── styles/          # グローバルスタイル
│   ├── types/           # TypeScript型定義
│   ├── utils/           # ユーティリティ関数
│   ├── App.vue          # ルートコンポーネント
│   └── main.ts          # エントリーポイント
├── public/              # 公開ファイル
├── index.html           # HTMLテンプレート
├── vite.config.ts       # Vite設定
├── tailwind.config.js   # Tailwind設定
├── tsconfig.json        # TypeScript設定
└── package.json         # プロジェクト設定
```

## 🎯 主要機能

### ページ一覧

- `/` - トップページ（質問一覧）
- `/post` - 投稿作成ページ
- `/post/:id` - 投稿詳細・結果閲覧
- `/profile` - プロフィール/マイページ
- `/login` - ログイン/認証
- `/stats` - 統計・トレンド
- `/faq` - よくある質問
- `/inquiry` - お問い合わせ
- `/devs` - 開発者情報
- `/jobs` - 採用情報
- `/about` - サービス概要
- `/policy` - プライバシーポリシー
- `/terms` - 利用規約
- `/error` - エラーページ

### コンポーネント

#### 共通コンポーネント
- **AppHeader**: グローバルナビゲーション
- **AppFooter**: フッター

#### UIコンポーネント
- **BaseButton**: 再利用可能なボタン
- **BaseCard**: カードコンテナ
- **BaseModal**: モーダルダイアログ
- **ToastContainer**: 通知トースト

### 状態管理 (Pinia Stores)

- **useAuthStore**: 認証状態管理
- **useThemeStore**: テーマ切り替え
- **usePostStore**: 投稿データ管理
- **useNotificationStore**: 通知管理

## 🎨 デザインシステム

### カラーパレット

**ライトモード**:
- プライマリ: `#3B82F6` (Blue)
- セカンダリ: `#8B5CF6` (Purple)
- 背景: `#FFFFFF`, `#F9FAFB`

**ダークモード**:
- プライマリ: `#60A5FA` (Light Blue)
- セカンダリ: `#A78BFA` (Light Purple)
- 背景: `#111827`, `#1F2937`

### レスポンシブブレークポイント

- モバイル: `320px - 767px`
- タブレット: `768px - 1023px`
- デスクトップ: `1024px+`

## 🔧 開発ガイドライン

### コーディング規約

- Vue 3 Composition APIを使用
- TypeScriptの型定義を必ず記述
- コンポーネントはPascalCase
- Propsは型安全に定義
- JSDocコメントで関数を文書化

### Git規約

```bash
# ブランチ命名
feature/機能名
fix/修正内容
docs/ドキュメント内容

# コミットメッセージ
feat: 新機能の追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイルの変更
refactor: リファクタリング
test: テストの追加・修正
chore: ビルドプロセスや補助ツールの変更
```

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🤝 コントリビューション

コントリビューションを歓迎します！詳細は[CONTRIBUTING.md](CONTRIBUTING.md)を参照してください。

## 📧 お問い合わせ

質問やフィードバックがある場合は、[Issues](https://github.com/yourusername/qresult/issues)で報告してください。

---

Made with ❤️ by the qresult team
