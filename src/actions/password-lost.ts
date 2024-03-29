"use server";

import apiError from "@/functions/api-error";
import { PASSWORD_LOST } from "../functions/api";

export default async function passwordLost(state: {}, formData: FormData){
  const login = formData.get("login") as string | null;
  const urlPerdeu = formData.get("url") as string | null;

  try {
    if(!login) throw new Error("Preencha os dados.");
    
    const {url} = PASSWORD_LOST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        url: urlPerdeu
      })
    });

    if(!response.ok) throw new Error("E-mail ou usuário não cadastrado.");
    
    
    return {
      ok: true,
      error: "",
      data: null
    }

  } catch (error: unknown) {
      return apiError(error);
  }

}