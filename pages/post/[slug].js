import React from 'react';
import { useRouter } from 'next/router';

import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components';
import { getPosts } from '../../services';
import { AdjacentPosts } from '../../sections';
import { hygraphClient, POST_DETAILS_QUERY } from '../../services';

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;

export async function getStaticProps({ params }) {
  try {
    const data = await hygraphClient.request(POST_DETAILS_QUERY, { slug: params.slug });

    if (!data.post) {
      return {
        notFound: true,
      };
    }

    return {
      props: { post: data.post },
      revalidate: 60, // ISR: Regenerate every 60 seconds
    };
  } catch (err) {
    console.error("GraphQL error in getStaticProps:", err);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const posts = await getPosts();

    const paths = posts.map(({ node: { slug } }) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: true, // allow on-demand generation
    };
  } catch (err) {
    console.error("Error in getStaticPaths:", err);
    return {
      paths: [],
      fallback: true,
    };
  }
}
