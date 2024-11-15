// client.ts
import {createClient} from '@sanity/client'
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'


export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // you can find this in sanity.json
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03',
})


export function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

export async function fetchBlogPosts(
  category?: string,
  page: number = 1,
  limit: number = 10
) {
  const start = (page - 1) * limit;
  const filterByCategory = category ? `&& "${category}" in categories[]->title` : '';
  const query = groq`*[_type == "post" ${filterByCategory}] | order(publishedAt desc) [${start}...${start + limit}]{
    _id,
    title,
    slug,
    excerpt,
    "categories": categories[]->title,
    "name": author->name,
    mainImage,
    _createdAt
  }`;
  return client.fetch(query);
}

export async function fetchCategories() {
  const query = groq`*[_type == "category"]`;
  return client.fetch(query);
}

export async function fetchTotalPosts(category?: string) {
  const query = groq`count(*[_type == "post" ${category ? `&& category == "${category}"` : ''}])`;
  return client.fetch(query);
}

export async function fetchSlugs(){
  const query = groq`*[_type == "post"]{ "slug": slug.current }`;
  return client.fetch(query);
}

export async function fetchPostBySlug(slug: string){
  const query = groq`*[_type == "post" && slug.current == "${slug}"][0]{
  _id,
  title,
  body,
  "rawText": pt::text(body),
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  "authorBio": author->bio,
  excerpt,
  mainImage,
  _createdAt
  }`;
  return client.fetch(query);
}

// // https://www.sanity.io/schemas/word-count-and-reading-time-estimation-for-groq-and-portable-text-7470eab7
// export async function fetchEstimatedPostReadTime(slug: string){
//   const query = groq`*[_type == "post" && slug.current == "${slug}"]{
//   title,
//   "numberOfCharacters": length(pt::text(body)),
//   "estimatedWordCount": round(length(pt::text(body)) / 5),
//   "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
// }`;
//   return client.fetch(query);
// }
