"use server";

import apiError from "@/functions/api-error";
import { PHOTO_DELETE } from "../functions/api";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function photoDelete(id: string){
  const token = cookies().get("token")?.value;

  try {
    if(!token) throw new Error("Token invalido.");
    
    const {url} = PHOTO_DELETE(id);
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
    });

    if(!response.ok) throw new Error("Erro ao deletar a foto.");
    

  } catch (error: unknown) {
      return apiError(error);
  }
  revalidateTag("photos");
  redirect("/conta");
}