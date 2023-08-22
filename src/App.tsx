import { useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAtom } from "jotai";
import "./style/index.css";

import { getRegisterAtom } from "atoms/registerAtom";
import { secretAtom } from "atoms/authenticateAtom";

import Layout from "src/components/Layout";
import HomePage from "src/pages/HomePage";
import SignInPage from "src/pages/SignInPage";
import ErrorPage from "src/pages/ErrorPage";
import GlobalLoading from "components/GlobalLoading";

function App() {
  const [, getRegister] = useAtom(getRegisterAtom);
  const [jwt] = useAtom(secretAtom);

  const getRegisterWithJwt = useCallback(async () => {
    await getRegister();
  }, [getRegister]);

  useEffect(() => {
    let isMounted = false;
    if (jwt) {
      !isMounted && getRegisterWithJwt();
    }
    return () => {
      isMounted = true;
    };
  }, [jwt, getRegisterWithJwt]);

  return (
    <GlobalLoading>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} caseSensitive />
        </Route>
        <Route path="sign-in" element={<SignInPage />} caseSensitive />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </GlobalLoading>
  );
}

export default App;
