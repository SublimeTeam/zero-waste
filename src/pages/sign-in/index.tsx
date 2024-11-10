import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignInData, signInSchema } from "./schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultUser, useUsers } from "@/hooks/useUsers";
import { useUserContext } from "@/hooks/useUserContext";

export const SignIn = () => {
  const [accountType, setAccountType] = useState("personal");
  const { login } = useUserContext();
  const { getUserByEmail } = useUsers();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onBlur",
    defaultValues: {
      email: defaultUser.email,
      password: defaultUser.password,
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInData) => {
    if (accountType !== "personal") {
      alert("Senha da organização inválida");
      return;
    }

    const userFound = await getUserByEmail(data.email);

    if (!userFound || userFound.password !== data.password) {
      // TODO: add toast
      console.log("Usuario nao encontrado.");
      return;
    }

    login(userFound);
    navigate("/");
  };

  return (
    <div className="w-full self-center justify-self-center">
      <div className="text-center mb-6">
        <h1 className="text-3xl uppercase font-semibold">Zero Waste</h1>
        Bem-vindo, é um prazer tê-lo aqui
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <Tabs value={accountType} onValueChange={setAccountType}>
            <TabsList className="self-start">
              <TabsTrigger value="personal">Consumidor</TabsTrigger>
              <TabsTrigger value="business">Estabelecimento</TabsTrigger>
            </TabsList>
          </Tabs>

          <label htmlFor="email-input">
            E-mail
            <Input
              id="email-input"
              type="email"
              placeholder="example@gmail.com"
              aria-describedby="email-error"
              {...register("email")}
            />
          </label>
          <span className="text-red-500 text-sm" id="email-error">
            {errors.email?.message}
          </span>

          <div>
            <label htmlFor="password-input">
              Senha
              <Input
                id="password-input"
                type="password"
                aria-describedby="password-error"
                defaultValue="123456"
                {...register("password")}
              />
            </label>
            <span className="text-red-500 text-sm" id="password-error">
              {errors.password?.message}
            </span>

            {errors.rememberMe?.message}
          </div>
        </div>

        <div className="mt-6">
          Não possui uma conta? <Link to="/sign-up">registre-se agora</Link>
          <Button type="submit" className="w-full mt-2">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
};
