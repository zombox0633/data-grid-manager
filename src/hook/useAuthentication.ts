import React, { useState } from "react";
import { useAtom } from "jotai";

import { loadingAtom } from "atoms/loadingAtom";
import { authenticateAtom } from "atoms/authenticateAtom";

import authenticateUser from "api/authentication/authentication";
import getRegister from "api/user/register";

type credentialsType = {
  email: string;
  password: string;
};

function useAuthentication() {
  const [, setIsOpen] = useAtom(loadingAtom);
  const [, setJwt] = useAtom(authenticateAtom);

  const [credentials, setCredentials] = useState<credentialsType>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onSubmitForm = async (parameter: credentialsType) => {
    try {
      const [data, error] = await authenticateUser(
        parameter.email,
        parameter.password
      );

      const token = data?.token;
      console.log(token);

      if (token) {
        console.log(token);
        setIsOpen(true);
        setJwt(token);
        await getRegister(token);
        setIsOpen(false);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSignOut = () => {
    setJwt(null);
  };
  return {
    credentials,
    handleInputChange,
    onSubmitForm,
    onSignOut,
  };
}

export default useAuthentication;
