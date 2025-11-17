import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import {BookData} from "@/types";

async function Footer(){

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
  if(!response.ok)
  {return <footer></footer>}

  const books: BookData[] = await response.json();

  const bookCount = books.length;
  return (<footer>
    <div>제작</div>
    <div>{bookCount}개의 도서가 등록 되었어요</div>
  </footer>);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
