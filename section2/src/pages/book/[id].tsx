import style from './[id].module.css';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchOneBook from '@/lib/fetch-one-books';
import { useRouter } from 'next/router';
import Head from "next/head";

// 정적 경로 사전 생성
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: true, // 'true' → boolean true
  };
};

// SSG: 개별 상세 페이지 데이터
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const rawId = context.params!.id as string | string[];
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const book = await fetchOneBook(Number(id));

  if (!book) {
    return { notFound: true };
  }

  return { props: { book } };
};

export default function BookPage({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return 'loading...';

  if (!book) {
    return '문제가 발생했습니다. 다시 시도해주세요';
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <>
    <Head>
      <title>{title}</title>
      <meta property="og:image" content={coverImgUrl}/>
      <meta property="og:title" content={title}/>
      <meta property={description}
      content="한입 북스에 등록된 도서들을 만나보세요"/>
    </Head>
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
    </>
  );
}
