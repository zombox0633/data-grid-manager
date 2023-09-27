import { useState } from "react";
import { useAtom } from "jotai";

import {
  authenticateAtom,
  authenticateCancelTokenAtom,
  authenticateErrorAtom,
  removeSecretAtom,
} from "atoms/authenticateAtom";

import useNavigationHandler from "../useNavigationHandler";
import {
  getRegisterAtom,
  registerCancelTokenAtom,
  registerErrorAtom,
  removeRegisterAtom,
} from "atoms/registerAtom";
import useCancelToken from "hook/useCancelToken";

type credentialsType = {
  email: string;
  password: string;
};

function useAuthentication() {
  const [authStatus, setAuthStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { handleLink } = useNavigationHandler();

  const [, authenticate] = useAtom(authenticateAtom);
  const [authenticateError] = useAtom(authenticateErrorAtom);
  const [, removeSecret] = useAtom(removeSecretAtom);
  const [authenticateCancel] = useAtom(authenticateCancelTokenAtom);

  const [, getRegisterData] = useAtom(getRegisterAtom);
  const [registerError] = useAtom(registerErrorAtom);
  const [, removeRegister] = useAtom(removeRegisterAtom);
  const [registerCancel] = useAtom(registerCancelTokenAtom);

  const [credentials, setCredentials] = useState<credentialsType>({
    email: "",
    password: "",
  });

  useCancelToken(authenticateCancel);
  useCancelToken(registerCancel);

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
      const isAuthenticate = await authenticate({
        email: parameter.email,
        password: parameter.password,
      });

      if (isAuthenticate) {
        const getRegister = await getRegisterData();
        if (getRegister) {
          setAuthStatus("SUCCESS");
          setTimeout(() => {
            handleLink("/");
          }, 500);
        } else {
          setAuthStatus("INCORRECT_CREDENTIALS");
          console.error(registerError);
        }
      } else {
        setAuthStatus("AUTH_FAILED");
        console.error(authenticateError);
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
