import Layout, { siteTitle } from '@/components/Layout/Layout';
import Head from 'next/head';
import utilStyles from '@/styles/utiles.module.scss';
import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import Date from '@/components/Date';
import { GetStaticProps } from 'next';

interface HomeProps {
  allPostsData: Data[];
}

export interface Data {
  id: string;
  date: string;
  title: string;
  contentHtml: string;
}

export default function Home({ allPostsData }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }: Data) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
