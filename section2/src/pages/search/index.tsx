import { useRouter } from 'next/router';
import { ReactNode, useState, useEffect } from 'react';
import BookItem from '@/components/book-item';
import fetchBooks from '@/lib/fetch-books';
import SearchableLayout from '@/components/searchable-layout';
import Head from "next/head";

interface BookData {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  author: string;
  publisher: string;
  coverImgUrl: string;
}

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <>
    <Head>
      <title>한입 북스 - 검색 결과 </title>
      <meta property="og:image" content="/thumbnail.png"/>
      <meta property="og:title" content="한입북스 - 검색결과"/>
      <meta property="og:description"
      content="한입 북스에 등록된 도서들을 만나보세요"/>
    </Head>
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
    </>
  );
}

// 페이지 레이아웃 지정
Page.getLayout = function getLayout(page: ReactNode) {
  return <SearchableLayout>{page}</SearchableLayout>;
};
