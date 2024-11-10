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
  const filterByCategory = category ? `&& category == "${category}"` : '';
  const query = groq`*[_type == "post" ${filterByCategory}] | order(publishedAt desc) [${start}...${start + limit}]{
    _id,
    title,
    slug,
    excerpt,
    category,
    mainImage,
    _updatedAt
  }`;
  return client.fetch(query);
}

export async function fetchCategories() {
  const query = groq`*[_type == "category"]{ _id, title }`;
  return client.fetch(query);
}

export async function fetchTotalPosts(category?: string) {
  const query = groq`count(*[_type == "post" ${category ? `&& category == "${category}"` : ''}])`;
  return client.fetch(query)
}
