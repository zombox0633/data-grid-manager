import { useState } from "react";
import { useAtom } from "jotai";

import { authenticateAtom, removeSecretAtom } from "atoms/authenticateAtom";

import useNavigationHandler from "../useNavigationHandler";
import { getRegisterAtom, removeRegisterAtom } from "atoms/registerAtom";

type credentialsType = {
  email: string;
  password: string;
};

function useAuthentication() {
  const [authStatus, setAuthStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { handleLink } = useNavigationHandler();

  const [, authenticate] = useAtom(authenticateAtom);
  const [, removeSecret] = useAtom(removeSecretAtom);
  const [, getRegisterData] = useAtom(getRegisterAtom);
  const [, removeRegister] = useAtom(removeRegisterAtom);

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
      const [jwt, error] = await authenticate({
        email: parameter.email,
        password: parameter.password,
      });

      if (jwt) {
        const [data, error] = await getRegisterData();
        if (jwt && data?.data) {
          setAuthStatus("SUCCESS");
          setTimeout(() => {
            handleLink("/");
          }, 500);
        } else {
          setAuthStatus("INCORRECT_CREDENTIALS");
          console.error(error);
        }
      } else {
        setAuthStatus("AUTH_FAILED");
        console.error(error);
      }
    } catch (error) {
      setAuthStatus("SYSTEM_ERROR");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const onSignOut = () => {
    if (removeSecret() && removeRegister()) {
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
