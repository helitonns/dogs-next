import login from "@/actions/login";

export default function LoginForm(){


  return (
    <>
      <form action={login}>
        <input type="text" name="username" placeholder="Usuario"/>
        <input type="password" name="password" placeholder="Senha"/>
        <button>Entrar</button>
      </form>
    </>
  );
}