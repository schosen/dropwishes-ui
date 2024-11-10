import { client } from "@/services/sanityClient"
import groq from 'groq'
import Image from "next/image";
import imageUrlBuilder from '@sanity/image-url'
import {PortableText} from '@portabletext/react'
// import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Post } from "@/interfaces/blog";

function urlFor (source) {
  return imageUrlBuilder(client).image(source)
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <Image
          src={urlFor(value).width(320).height(240).fit('max').auto('format').url()}
          alt={value.alt || ' '}
          loading="lazy"
          width={320}
          height={240}
        />
      )
    }
  }
}

// Query for fetching blog slugs
const querySlugs = groq`*[_type == "post"]{ "slug": slug.current }`;

// Query for fetching post data by slug
const queryPostBySlug = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  mainImage
}`;

export async function generateStaticParams() {
  const posts = await client.fetch(querySlugs);
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

// async function fetchBlogPost(slug: string): Promise<BlogPost> {
//   const post = await client.fetch<BlogPost>(queryPostBySlug, { slug });
//   return post;
// }

// Generate Metadata for SEO
// export async function generateMetadata({ params }: BlogPostProps) {
//   const post = await fetchBlogPost(params.slug);
//   return { title: post.title };
// }

export default async function  BlogPostPage({ params }: { params: { slug: string } }) {

  const post = await client.fetch(queryPostBySlug, { slug: params.slug });
  const {
    categories,
    title = 'Missing title',
    name = 'Missing name',
    authorImage,
    body = [],
    mainImage
  } = post

  console.log("POST: ", post)
  return (
    <article>
      <h1>{title}</h1>

      {authorImage && (
        <div>
          <Image
            src={urlFor(authorImage)
              // .width(50)
              .url()}
            alt="author image"
            width={50}
            height={50}
          />
        </div>
      )}

      <span>By {name}</span>

      {mainImage && (
        <div>
          <Image
            src={urlFor(mainImage)
              // .width(50)
              .url()}
            alt="author image"
            width={640}
            height={480}
          />
        </div>
      )}

      <PortableText
        value={body}
        components={ptComponents}
      />

      {categories && (
        <ul>
          Category:
          {categories.map(category => <li key={category}>{category}</li>)}
        </ul>
      )}


    </article>
  );
};

