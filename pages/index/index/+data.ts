import { fetchArticles } from "#root/api/article";

export { data };

async function data() {
  const result = await fetchArticles().catch(e => {
    console.log(1);

  })

  return {

  }
}
