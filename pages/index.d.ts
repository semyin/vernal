// https://vike.dev/pageContext#typescript

declare global {
  namespace Vike {
    interface PageContext {
      abortReason:
        | string
        | { notAdmin: true }
    }
  }
}
export {}
