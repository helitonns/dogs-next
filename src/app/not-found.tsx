"use client";

import Link from "next/link";

export default function NotFound(){
  return (
    <section className="container">
      <h1 className="title">Página não encontrada.</h1>
      <Link className="button" style={{margin: "1rem", display: "inline-block"}} href={"/"}>
        Volte para a Home.
      </Link>
    </section>
  );
}