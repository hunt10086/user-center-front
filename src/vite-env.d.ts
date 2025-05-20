/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_API_BASE: string
    readonly DEV: boolean
    // 其他环境变量...
  }
}// 解决方案：在 env.d.ts 中添加类型声明
interface ImportMetaEnv {
  readonly DEV: boolean;
  // 其他环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
