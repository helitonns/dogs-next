"use client";

import { useFormState, useFormStatus } from "react-dom";
import Button from "../forms/button";
import Input from "../forms/input";
import ErrorMessage from "../helper/error-message";
import React from "react";
import styles from "./login-form.module.css";
import passwordLost from "@/actions/password-lost";

function FormButton(){
  const {pending} = useFormStatus();
  return (
    <>
      { pending ? 
        <Button disabled={pending}>Enviando ...</Button> 
          : 
        <Button>Enviar e-mail</Button>}
    </> 
  );
}

export default function LoginPerdeuForm(){
  const [state, action] = useFormState(passwordLost, {
    ok: false,
    error: "",
    data: null
  });

  const [url, setUrl] = React.useState("");
  React.useEffect(()=> {
    setUrl(window.location.href.replace("perdeu", "resetar"));
  }, []);

  return (
    <form action={action} className={styles.form}>
      <Input label="E-mail / Usuário" name="login"/>
      <input type="hidden" name="url" value={url} />
      {state.ok ? <p style={{color: "#4c1"}}>E-mail enviado</p> : <FormButton />}
      <ErrorMessage error={state.error} />
      
    </form>
  );
}