import Head from 'next/head';

import { Banner } from '@/components/banner/banner';
import { Navbar } from '@/components/nav/navbar';
import { SectionCards } from '@/components/card/section-cards';
import { getPopularVideos, getVideos } from '@/lib/videos';

import styles from '@/styles/Home.module.css';

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailer");

  const productivityVideos = await getVideos("productivity trailer");

  const travelVideos = await getVideos("travel trailer");

  const popularVideos = await getPopularVideos();

  return { props: { disneyVideos, travelVideos, productivityVideos, popularVideos } };
}

export default function Home({ disneyVideos, travelVideos, productivityVideos, popularVideos }) {

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <div className={styles.main}>
          <Navbar username="anjali@anj.com" />

          <Banner title="Clifford the red dog" subTitle="a very cute dog" imgUrl="/static/clifford.webp" />

          <div className={styles.sectionWrapper}>
            <SectionCards title="Disney" videos={disneyVideos} size="large" />
            <SectionCards title="Travel" videos={travelVideos} size="small" />
            <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
            <SectionCards title="Popular" videos={popularVideos} size="small" />
          </div>
        </div>

      </main>
    </>
  )
}