import { useState } from "react";
import { useAtom } from "jotai";

import { authenticateAtom } from "atoms/authenticateAtom";
import { registerAtom } from "atoms/registeAtom";

import authenticateUser from "api/authentication/authentication";
import getRegister from "api/user/register";

import useNavigationHandler from "../useNavigationHandler";

type credentialsType = {
  email: string;
  password: string;
};

function useAuthentication() {
  const [authStatus, setAuthStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const { handleLink } = useNavigationHandler();

  const [jwtData, setJwt] = useAtom(authenticateAtom);
  const [registerData, setRegister] = useAtom(registerAtom);

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
      setIsProcessing(true);
      setAuthStatus("VERIFYING");
      const [data, error] = await authenticateUser(
        parameter.email,
        parameter.password
      );
      const jwtToken = data?.token;

      if (jwtToken) {
        setJwt(jwtToken);
        const [register, error] = await getRegister(jwtToken);
        const registerData = register?.data;
        if (jwtToken && registerData) {
          setRegister({ data: registerData });
          setIsProcessing(false);
          setAuthStatus("SUCCESS");
          setTimeout(() => {
            handleLink("/");
          }, 500);
        } else {
          setIsProcessing(false);
          setAuthStatus("INCORRECT_CREDENTIALS");
          console.error(error);
        }
      } else {
        setIsProcessing(false);
        setAuthStatus("AUTH_FAILED");
        console.error(error);
      }
    } catch (error) {
      setIsProcessing(false);
      setAuthStatus("SYSTEM_ERROR");
      console.error(error);
    }
  };

  const onSignOut = () => {
    setJwt(null);
    setRegister(null);
    if (!jwtData && !registerData) {
      handleLink("/");
    }
  };
  return {
    credentials,
    authStatus,
    isProcessing,
    handleInputChange,
    onSubmitForm,
    onSignOut,
  };
}

export default useAuthentication;
