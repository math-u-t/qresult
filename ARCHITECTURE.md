# アーキテクチャ設計書

## 概要

qresultは、Vue 3のComposition APIとTypeScriptを活用したモダンなSPA（シングルページアプリケーション）です。

## 技術スタック

### コアライブラリ

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Vue | 3.5+ | UIフレームワーク |
| TypeScript | 5.7+ | 型安全性 |
| Vite | 6.0+ | ビルドツール |
| Vue Router | 4.5+ | ルーティング |
| Pinia | 2.3+ | 状態管理 |
| Tailwind CSS | 3.4+ | スタイリング |
| Lucide Icons | 0.468+ | アイコン |

## ディレクトリ構造

```
src/
├── assets/              # 静的アセット（画像、フォントなど）
├── components/          # Vueコンポーネント
│   ├── common/          # 共通コンポーネント
│   │   ├── AppHeader.vue
│   │   └── AppFooter.vue
│   └── ui/              # 再利用可能UIコンポーネント
│       ├── BaseButton.vue
│       ├── BaseCard.vue
│       ├── BaseModal.vue
│       └── ToastContainer.vue
├── composables/         # Composition API関数
│   └── useForm.ts       # フォーム管理
├── layouts/             # レイアウトコンポーネント
│   ├── DefaultLayout.vue
│   ├── AuthLayout.vue
│   └── MinimalLayout.vue
├── pages/               # ページコンポーネント
│   ├── main/            # メイン機能ページ
│   ├── auth/            # 認証ページ
│   └── info/            # 情報ページ
├── router/              # ルーティング設定
│   └── index.ts
├── stores/              # Piniaストア
│   ├── auth.ts          # 認証
│   ├── theme.ts         # テーマ
│   ├── post.ts          # 投稿
│   └── notification.ts  # 通知
├── styles/              # グローバルスタイル
│   └── main.css
├── types/               # TypeScript型定義
│   └── index.ts
├── utils/               # ユーティリティ関数
│   └── date.ts
├── App.vue              # ルートコンポーネント
└── main.ts              # エントリーポイント
```

## アーキテクチャパターン

### 1. コンポーネント設計

#### レイヤー構造

```
Pages (ページレベル)
  ↓
Layouts (レイアウト)
  ↓
Common Components (共通コンポーネント)
  ↓
UI Components (基本UIコンポーネント)
```

#### コンポーネント分類

- **Pages**: ルートに対応する画面全体
- **Layouts**: 複数ページで共有されるレイアウト構造
- **Common**: アプリケーション全体で使用される共通コンポーネント
- **UI**: 汎用的な再利用可能コンポーネント

### 2. 状態管理（Pinia）

#### ストア設計原則

- **単一責任**: 1つのストアは1つの関心事のみを扱う
- **Composition API**: `setup()`スタイルを使用
- **型安全**: 全てのstate、getters、actionsに型を定義

#### ストア一覧

```typescript
// 認証ストア
useAuthStore()
  - currentUser: User | null
  - isAuthenticated: boolean
  - login(email, password): Promise<boolean>
  - logout(): Promise<void>

// テーマストア
useThemeStore()
  - theme: 'light' | 'dark' | 'system'
  - isDark: boolean
  - setTheme(theme): void
  - toggleTheme(): void

// 投稿ストア
usePostStore()
  - posts: Post[]
  - currentPost: Post | null
  - fetchPosts(): Promise<void>
  - createPost(input): Promise<Post>
  - vote(postId, optionIds): Promise<boolean>

// 通知ストア
useNotificationStore()
  - toasts: Toast[]
  - notifications: Notification[]
  - showToast(message, type): void
  - showSuccess/Error/Warning/Info(message): void
```

### 3. ルーティング

#### ルート構造

```typescript
/ (Home)
├── /post (Create Post)
├── /post/:id (Post Detail)
├── /profile (Profile)
├── /stats (Statistics)
├── /login (Login)
├── /faq (FAQ)
├── /inquiry (Inquiry)
├── /devs (Developers)
├── /jobs (Jobs)
├── /about (About)
├── /policy (Privacy Policy)
├── /terms (Terms)
└── /error (Error Page)
```

#### ナビゲーションガード

- **認証ガード**: `requiresAuth` メタフィールドでページ保護
- **タイトル更新**: 各ルートの `title` メタフィールドから自動設定
- **レイアウト選択**: `layout` メタフィールドで動的レイアウト切り替え

### 4. 型システム

#### 主要な型定義

```typescript
// ユーザー
interface User {
  id: string
  username: string
  email: string
  settings: UserSettings
}

// 投稿
interface Post {
  id: string
  title: string
  options: PostOption[]
  category: Category
  isMultipleChoice: boolean
  totalAnswers: number
  // ...
}

// 通知
interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}
```

### 5. スタイリング

#### Tailwind CSS設計

- **ユーティリティファースト**: Tailwindユーティリティクラスを優先
- **カスタムクラス**: 繰り返しパターンはコンポーネント層で定義
- **ダークモード**: `dark:` バリアントで全コンポーネント対応
- **レスポンシブ**: モバイルファーストアプローチ

#### デザイントークン

```css
/* カラー */
--color-primary: 59 130 246      /* Blue */
--color-secondary: 168 85 247    /* Purple */

/* ブレークポイント */
sm: 640px    /* モバイル */
md: 768px    /* タブレット */
lg: 1024px   /* デスクトップ */
xl: 1280px   /* 大画面 */
```

## データフロー

### 1. ページ読み込み

```
User → Route Change → Router Guard → Layout → Page Component
                           ↓
                    Store Initialization
                           ↓
                    Data Fetching (API)
                           ↓
                    Component Rendering
```

### 2. ユーザーインタラクション

```
User Action → Component Event → Store Action → API Call
                                      ↓
                              State Update
                                      ↓
                           Reactive UI Update
```

### 3. 認証フロー

```
Login Form → authStore.login() → API Auth
                                    ↓
                            Token Storage
                                    ↓
                          User State Update
                                    ↓
                          Redirect to Home
```

## パフォーマンス最適化

### 1. コード分割

- **ルートベース**: 各ページを動的インポート (`import()`)
- **遅延ローディング**: 非表示コンポーネントは必要時にロード

### 2. 状態管理

- **ローカルステート優先**: グローバルストアは必要な場合のみ使用
- **computed**: 派生データはcomputedで効率的に算出

### 3. レンダリング最適化

- **v-show vs v-if**: 頻繁に切り替わる要素は`v-show`
- **キーの適切な使用**: リストレンダリングで一意のキーを指定

## セキュリティ

### 1. 認証・認可

- **トークンベース**: JWT方式（予定）
- **LocalStorage**: 認証トークンの保存
- **ルートガード**: 未認証ユーザーの保護されたページアクセス防止

### 2. XSS対策

- **Vueの自動エスケープ**: テンプレート内のデータは自動エスケープ
- **v-html禁止**: ユーザー入力にv-htmlを使用しない

### 3. CSRF対策

- **SameSite Cookie**: APIとの連携時に設定（予定）

## 今後の拡張

### Phase 2 (計画中)

- [ ] バックエンドAPI連携
- [ ] リアルタイム通知（WebSocket）
- [ ] 画像アップロード
- [ ] ソーシャルログイン
- [ ] PWA対応

### Phase 3 (計画中)

- [ ] コメント機能
- [ ] ユーザー間フォロー
- [ ] 投稿の共有機能拡張
- [ ] 詳細な分析ダッシュボード

## まとめ

qresultは、モダンなフロントエンド技術を活用し、型安全性・保守性・拡張性を重視した設計になっています。Composition APIとPiniaを活用することで、ロジックの再利用性が高く、テストしやすいアーキテクチャを実現しています。
