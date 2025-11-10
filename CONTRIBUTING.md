# コントリビューションガイド

qresultへのコントリビューションに興味を持っていただきありがとうございます！このガイドでは、プロジェクトへの貢献方法を説明します。

## 🚀 始め方

### 1. リポジトリのフォーク

GitHubでリポジトリをフォークし、ローカルにクローンします。

```bash
git clone https://github.com/your-username/qresult.git
cd qresult
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. ブランチの作成

機能追加やバグ修正のために新しいブランチを作成します。

```bash
git checkout -b feature/your-feature-name
# または
git checkout -b fix/your-bug-fix
```

## 📝 コーディング規約

### TypeScript

- 全ての変数・関数に型を明示的に指定
- `any`型の使用を避ける
- インターフェースは`src/types/`に定義

### Vue コンポーネント

- Composition APIを使用
- `<script setup>`構文を推奨
- Propsとemitsは型安全に定義
- コンポーネント名はPascalCase

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const emit = defineEmits<{
  'update': [value: string]
}>()
</script>
```

### スタイリング

- Tailwind CSSユーティリティクラスを使用
- カスタムCSSは最小限に
- ダークモード対応を必ず実装

### ファイル命名

- コンポーネント: `PascalCase.vue`
- TypeScript: `camelCase.ts`
- ページ: `PascalCase.vue` (例: `HomePage.vue`)

## 🧪 テスト

新機能やバグ修正には必ずテストを追加してください。

```bash
npm run test
```

## 📦 コミットメッセージ

Conventional Commitsに従います。

```
<type>: <subject>

<body>
```

### Type

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: コードスタイル（フォーマット、セミコロンなど）
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `chore`: ビルド、補助ツール

### 例

```bash
feat: add dark mode toggle to header

Add a moon/sun icon button in the header that allows users
to toggle between light and dark themes.
```

## 🔍 プルリクエスト

### チェックリスト

- [ ] コードが正しく動作することを確認
- [ ] TypeScriptエラーがないことを確認
- [ ] 既存のテストが全て通過
- [ ] 新機能にはテストを追加
- [ ] ドキュメントを更新（必要な場合）
- [ ] コミットメッセージがConventional Commitsに従っている

### プルリクエストのテンプレート

```markdown
## 変更内容

簡潔に変更内容を説明してください。

## 関連Issue

Fixes #(issue番号)

## 変更の種類

- [ ] バグ修正
- [ ] 新機能
- [ ] 破壊的変更
- [ ] ドキュメント更新

## テスト方法

この変更をどのようにテストしたか説明してください。

## スクリーンショット（該当する場合）
```

## 🤝 コミュニティ

- [Issues](https://github.com/yourusername/qresult/issues): バグ報告や機能リクエスト
- [Discussions](https://github.com/yourusername/qresult/discussions): 一般的な質問や議論

## 📄 ライセンス

コントリビューションすることで、あなたの貢献がMITライセンスの下でライセンスされることに同意したものとみなされます。
