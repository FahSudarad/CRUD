import Head from "next/head";
import Header from "@/components/Header";

import Container from "@mui/material/Container";
import UserProfileList from "../components/UserProfileList";

export default function Home() {
  return (
    <>
      <Head>
        <title>User Management</title>
        <meta name="description" content="User Profile by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Header />
      </nav>
      <section>
        <Container fixed>
          <UserProfileList />
        </Container>
      </section>
    </>
  );
}
