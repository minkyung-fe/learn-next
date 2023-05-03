import Layout from '@/components/Layout/Layout';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { Data } from '@/pages';
import Head from 'next/head';
import utilStyles from '@/styles/utiles.module.scss';
import Date from '@/components/Date';
import { GetStaticPaths, GetStaticProps } from 'next';

interface PostProps {
  postData: Data;
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticPropsGetStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
