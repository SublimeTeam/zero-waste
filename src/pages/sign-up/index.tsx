import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  businessSchema,
  BusinessType,
  GeneralAccountSchema,
  personalSchema,
  PersonalType,
} from "./schemas";
import { useNavigate } from "react-router-dom";
import { useUsers } from "@/hooks/useUsers";
import { useUserContext } from "@/hooks/useUserContext";

export const SignUp = () => {
  const [accountType, setAccountType] = useState("personal");

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl uppercase font-semibold">Zero Waste</h1>
        Bem-vindo, é um prazer tê-lo aqui
      </div>
      <Tabs value={accountType} onValueChange={setAccountType}>
        <TabsList className="self-start">
          <TabsTrigger value="personal">Consumidor</TabsTrigger>
          <TabsTrigger value="busines">Estabelecimento</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <PersonalSignUp />
        </TabsContent>
        <TabsContent value="busines">
          <BusinesSignUp />
        </TabsContent>
      </Tabs>

      <div className="mt-4">
        Já possuí conta? <Link to="/sign-in">entre agora</Link>
      </div>
    </div>
  );
};

const PersonalSignUp = () => {
  const navigate = useNavigate();
  const { createUser } = useUsers();
  const formMethods = useForm({
    resolver: yupResolver(personalSchema),
  });
  const { login } = useUserContext();

  const onSubmit = async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    passwordConfirmation,
    ...user
  }: PersonalType) => {
    await createUser(user);

    login(user);
    navigate("/");
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username-input">
            Nome Completo
            <Input id="username-input" {...formMethods.register("username")} />
          </label>
          <span className="text-red-600">
            {formMethods.formState.errors.username?.message}
          </span>
        </div>
        <div>
          <label htmlFor="cpf-input">
            CPF
            <Input
              id="cpf-input"
              placeholder="000.000.000-00"
              {...formMethods.register("cpf")}
            />
          </label>
          <span className="text-red-600">
            {formMethods.formState.errors.cpf?.message}
          </span>
        </div>
        <AccountDataForm />
        <Button className="w-full mt-2">Cadastrar conta</Button>
      </form>
    </FormProvider>
  );
};

const BusinesSignUp = () => {
  const navigate = useNavigate();
  const formMethods = useForm({
    resolver: yupResolver(businessSchema),
  });

  const onSubmit = (data: BusinessType) => {
    console.log(data);
    navigate("/");
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="business-name-input">
              Nome do Estabelecimento
              <Input
                id="business-name-input"
                placeholder="Mercado Exemplo S.A"
              />
            </label>

            <span className="text-red-600">
              {formMethods.formState.errors.name?.message}
            </span>
          </div>

          <div>
            <label htmlFor="cnpj-input">
              CNPJ
              <Input id="cnpj-input" placeholder="00.000.000/0000-00" />
            </label>

            <span className="text-red-600">
              {formMethods.formState.errors.cnpj?.message}
            </span>
          </div>
          <AccountDataForm />
          <Button className="w-full mt-2">Solicitar conta</Button>
        </form>
      </FormProvider>
    </>
  );
};

const AccountDataForm = () => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<GeneralAccountSchema>();

  async function getCep() {
    const cep = getValues("cep");

    if (!!cep && !errors.cep?.message) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const json = await response.json();
        if (json) {
          setValue("street", json.logradouro);
          setValue("district", json.bairro);
          setValue("city", json.localidade);
          setValue("state", json.estado);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <fieldset>
        <div>
          <label htmlFor="email-input">
            E-mail
            <Input id="email-input" type="email" {...register("email")} />
          </label>

          <span className="text-red-600">{errors.email?.message}</span>
        </div>

        <div>
          <label htmlFor="password-input">
            Senha
            <Input
              id="password-input"
              type="password"
              {...register("password")}
            />
          </label>

          <span className="text-red-600">{errors.password?.message}</span>
        </div>

        <div>
          <label htmlFor="password-confirmation-input">
            Senha
            <Input
              id="password-confirmation-input"
              type="password"
              {...register("passwordConfirmation")}
            />
          </label>

          <span className="text-red-600">
            {errors.passwordConfirmation?.message}
          </span>
        </div>
      </fieldset>
      <fieldset>
        <div>
          <label htmlFor="cep-input">
            CEP
            <Input
              id="cep-input"
              placeholder="18901-190"
              {...register("cep")}
              onBlur={getCep}
            />
          </label>
          <span className="text-red-600">{errors.cep?.message}</span>
        </div>

        <div>
          <label htmlFor="state-input">
            Estado
            <Input
              id="state-input"
              placeholder="São Paulo"
              {...register("state")}
            />
          </label>
          <span className="text-red-600">{errors.state?.message}</span>
        </div>

        <div>
          <label htmlFor="city-input">
            Município
            <Input
              id="city-input"
              placeholder="São Paulo"
              {...register("city")}
            />
          </label>

          <span className="text-red-600">{errors.city?.message}</span>
        </div>

        <div>
          <label htmlFor="address-input">
            Rua
            <Input
              id="address-input"
              placeholder="Rua exemplo"
              {...register("street")}
            />
          </label>

          <span className="text-red-600">{errors.street?.message}</span>
        </div>

        <div>
          <label htmlFor="district-input">
            Bairro
            <Input
              id="district-input"
              placeholder="Bairro exemplo"
              {...register("district")}
            />
          </label>

          <span className="text-red-600">{errors.district?.message}</span>
        </div>
      </fieldset>
    </>
  );
};
