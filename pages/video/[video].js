import { useRouter } from 'next/router';
import Modal from 'react-modal';
Modal.setAppElement('#__next');
import clsx from 'classnames';
import { useState } from 'react';

import { getYoutubeVideoById } from '@/lib/videos';
import { Navbar } from '@/components/nav/navbar';
import Like from '@/components/icons/like-icon';
import DisLike from '@/components/icons/dislike-icon';

import styles from '../../styles/Video.module.css';

export async function getStaticProps(context) {
    // console.log({ context });

    const videoId = context.params.video;
    const videoArray = await getYoutubeVideoById(videoId);

    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {},
        },
        revalidate: 10, // In seconds
    };
}

export async function getStaticPaths() {
    const listOfVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];

    // Get the paths we want to pre-render based on posts
    const paths = listOfVideos.map((video) => ({
        params: { video },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: 'blocking' } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' };
}

export default function Video({ video }) {
    const router = useRouter();

    const [toggleLike, setToggleLike] = useState();
    const [toggleDislike, setToggleDisLike] = useState();

    const { title, publishTime, description, channelTitle, statistics: { viewCount } = { viewCount: 0 } } = video;

    const handleToggleDislike = () => {
        console.log("handleToggleDislike");
        setToggleDisLike(!toggleDislike)
        setToggleLike(toggleDislike);
    }

    const handleToggleLike = () => {
        console.log("handleToggleLike");
        setToggleLike(!toggleLike);
        setToggleDisLike(toggleLike)
    }

    return <div className={styles.container}>
        <Navbar />
        <Modal isOpen={true} contentLabel="Watch the video" className={styles.modal} onRequestClose={() => { router.back() }}
            overlayClassName={styles.overlay}>

            <iframe
                className={styles.videoPlayer}
                id="ytplayer"
                type="text/html"
                width="100%"
                height="360"
                src={`https://www.youtube.com/embed/${router.query.video}?autoplay=1&origin=http://example.com&controls=0&rel=1`}
                frameborder="0">
            </iframe>

            <div className={styles.likeDislikeBtnWrapper}>
                <div className={styles.likeBtnWrapper}>
                    <button onClick={handleToggleLike}>
                        <div className={styles.btnWrapper}>
                            <Like selected={toggleLike} />
                        </div>
                    </button>
                </div>
                <button onClick={handleToggleDislike}>
                    <div className={styles.btnWrapper}>
                        <DisLike selected={toggleDislike} />
                    </div>
                </button>
            </div>

            <div className={styles.modalBody}>
                <div className={styles.modalBodyContent}>

                    <div className={styles.col1}>
                        <p className={styles.publishTime}>{publishTime}</p>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.description}>{description}</p>
                    </div>

                    <div className={styles.col2}>
                        <p className={clsx(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>Cast: </span>
                            <span className={styles.channelTitle}>{channelTitle}</span>
                        </p>
                        <p className={clsx(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>View Count: </span>
                            <span className={styles.channelTitle}>{viewCount}</span>
                        </p>
                    </div>
                </div>

            </div>
        </Modal>
    </div>
}