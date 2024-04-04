import ContaPhotoPost from "@/components/conta/conta-photo-post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postar | Minha conta",
}

export const runtime = "edge";

export default async function PostarPage(){
  return (
    <ContaPhotoPost />
  );
}