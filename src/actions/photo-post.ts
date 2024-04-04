"use server";

import apiError from "@/functions/api-error";
import { PHOTO_POST } from "../functions/api";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function photoPost(state: {}, formData: FormData){
  const nome = formData.get("nome") as string | null;
  const idade = formData.get("idade") as string | null;
  const peso = formData.get("peso") as string | null;
  const img = formData.get("img") as File;
  const token = cookies().get("token")?.value;

  try {
    if(!token || !nome || !idade || !peso || img.size === 0) throw new Error("Preencha os dados.");
    
    const {url} = PHOTO_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData
    });

    if(!response.ok) throw new Error("E-mail ou usuário já cadastrado.");
    

  } catch (error: unknown) {
      return apiError(error);
  }
  revalidateTag("photos");
  redirect("/conta");
}