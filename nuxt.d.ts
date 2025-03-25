/// <reference types="nuxt" />
/// <reference types="@nuxt/module/schema" />

declare module '#app' {
  interface PageMeta {
    title?: string
    layout?: string
  }
} 