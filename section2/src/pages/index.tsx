import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import {useEffect} from"react";
import type{InferGetStaticPropsType} from 'next';
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getStaticProps=async() =>{
  //컴포넌트보다 먼저 실행이 되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  console.log("indexPage");
  
  const [allBooks,recoBooks]= await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);


  return{
      props:{
        allBooks,
        recoBooks,
      },
  };
};
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {



  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
