import type { PageContext } from "vike/types";

let a: string;

export function onBeforeRender(pageContext: PageContext) {
  if (!a) {
    console.log('set a.....')
    a = 'semyin'
  }
  console.log('a=', a)
}
