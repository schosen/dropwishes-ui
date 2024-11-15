import { fetchPostBySlug, fetchBlogPosts, fetchSlugs, urlFor } from "@/services/sanityClient"
import SocialsList from "@/components/shared/social/SocialsList";
import ReadingTime from "@/components/extras/ReadTimeEstimate";
import Image from "next/image";
import {PortableText} from '@portabletext/react'
import NcImage from "@/components/shared/NcImage";
import Textarea from "@/components/shared/Textarea";
import ButtonPrimary from "@/components/shared/button/ButtonPrimary";
import ButtonSecondary from "@/components/shared/button/ButtonSecondary";
import Comment from "@/components/shared/Comment";
import { Post } from "@/interfaces/blog";
import Badge from "@/components/shared/Badge";
import Avatar from "@/components/shared/Avatar";
import Tag from "@/components/shared/Tag";
import Link from "next/link";


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
          className="rounded-2xl object-cover"
          loading="lazy"
          width={1260}
          height={750}
        />
      )
    }
  }
}

export async function generateStaticParams() {
  const posts = await fetchSlugs();
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

  const post = await fetchPostBySlug(params.slug);
  const {
    categories,
    title = 'Missing title',
    name = 'Missing name',
    authorImage,
    authorBio = [],
    body = [],
    rawText = "",
    excerpt,
    mainImage,
    _createdAt
  } = post

  console.log("CATEGORY: ", categories)
  let randomCategory = categories[Math.floor(Math.random()*categories.length)]
  console.log("RANDOM CAT: ", randomCategory)
  const relatedPosts = await fetchBlogPosts(randomCategory, 1, 4)

  /////// BLOG HEADER CONTENT ////////
  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <Badge href="/" color="purple" name={categories[0]} />
          <h1
            className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
            title={title}
          >
            {title}
          </h1>
          <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
            {excerpt}
          </span>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              <Avatar
                containerClassName="flex-shrink-0"
                sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
                imgUrl={urlFor(authorImage).url()}
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <a className="block font-semibold" href="##">
                    {name}
                  </a>
                </div>
                <div className="text-xs mt-[6px]">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {new Date(_createdAt).toDateString()}
                  </span>
                  <span className="mx-2 font-semibold">·</span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    <ReadingTime text={rawText}/>

                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-1.5 sm:ml-3">
              <SocialsList />
            </div>
          </div>
        </div>
      </header>
    );
  };

  //////// MAIN CONTENT /////////////
 const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
      >
        <PortableText
          value={body}
          components={ptComponents}
        />

      </div>
    );
  };

  ///////// TAG CONTENT ///////////

  const renderTags = () => {
    return (
      <div className="max-w-screen-md mx-auto flex flex-wrap space-x-2">
        {categories.map(category => <Tag hideCount={true} category={category}/>)}
      </div>
    );
  };


  /////// AUTHOR CONTENT //////////
  const renderAuthor = () => {
    return (
      <div className="max-w-screen-md mx-auto ">
        <div className="nc-SingleAuthor flex">
          <Avatar sizeClass="w-11 h-11 md:w-24 md:h-24" imgUrl={urlFor(authorImage).url()}/>
          <div className="flex flex-col ml-3 max-w-lg sm:ml-5 space-y-1">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              WRITEN BY
            </span>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
              <a href="##">{name}</a>
            </h2>
            <span className="text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
              <PortableText value={authorBio}/>
              {/* There’s no stopping the tech giant. Apple now opens its 100th
              store in China.There’s no stopping the tech giant. */}
              <a className="text-primary-6000 font-medium ml-1" href="##">
                Readmore
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  };


  //////// COMMENT FORM /////////////
  const renderCommentForm = () => {
    return (
      <div className="max-w-screen-md mx-auto pt-5">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Responses (14)
        </h3>
        <form className="nc-SingleCommentForm mt-5">
          <Textarea />
          <div className="mt-2 space-x-3">
            <ButtonPrimary>Submit</ButtonPrimary>
            <ButtonSecondary>Cancel</ButtonSecondary>
          </div>
        </form>
      </div>
    );
  };


  //// DUMMY COMMENTS ////
  const renderCommentLists = () => {
    return (
      <div className="max-w-screen-md mx-auto">
        <ul className="nc-SingleCommentLists space-y-5">
          <li>
            <Comment />
            <ul className="pl-4 mt-5 space-y-5 md:pl-11">
              <li>
                <Comment isSmall />
              </li>
            </ul>
          </li>
          <li>
            <Comment />
            <ul className="pl-4 mt-5 space-y-5 md:pl-11">
              <li>
                <Comment isSmall />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  };

  /////// RELATED CONTENT ///////////

  const renderPostRelated = (post: any, index: number) => {
    return (
      <div
        key={index}
        className="relative aspect-w-3 aspect-h-4 rounded-3xl overflow-hidden group"
      >
      <Link href={`/blog/${post.slug.current}`} />
        <Image
          alt="Related"
          fill
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
          src={urlFor(post.mainImage).url()}
          sizes="400px"
        />
        <div>
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black"></div>
        </div>
        <div className="flex flex-col justify-end items-start text-xs text-neutral-300 space-y-2.5 p-4">
          <Badge name={post.categories[0]} />
          <h2 className="block text-lg font-semibold text-white ">
            <span className="line-clamp-2">{post.title}</span>
          </h2>

          <div className="flex">
            <span className="block text-neutral-200 hover:text-white font-medium truncate">
              {post.name}
            </span>
            <span className="mx-1.5 font-medium">·</span>
            <span className="font-normal truncate">{new Date(post._createdAt).toDateString()}</span>
          </div>
        </div>
      <Link href={`/blog/${post.slug.current}`} />
      </div>
    );
  };

  // console.log("POST: ", post)
  return (

    <div className="nc-PageSingle pt-8 lg:pt-16 ">

      {/* CISECO */}
      {renderHeader()}

      <NcImage
        alt=""
        width={1260}
        height={750}
        className="w-full rounded-xl"
        containerClassName="container my-10 sm:my-12 "
        src={urlFor(mainImage).width(1260).height(750).url()}
      />

      <div className="nc-SingleContent container space-y-10">
        {renderContent()}
        {renderTags()}
        <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
        {renderAuthor()}
        {/* {renderCommentForm()} */}
        {/* {renderCommentLists()} */}
      </div>

      <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-24">
        <div className="container ">
          <h2 className="text-3xl font-semibold">Related posts</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {/*  */}
            {relatedPosts.filter((_, i) => i < 4).map(renderPostRelated)}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

