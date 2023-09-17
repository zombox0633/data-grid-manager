import { useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAtom } from "jotai";
import "./style/index.css";

import GlobalLoading from "components/GlobalLoading";
import Layout from "src/components/Layout";
import PrivateRoute from "components/PrivateRoute";

import HomePage from "src/pages/HomePage";
import SignInPage from "src/pages/SignInPage";
import ErrorPage from "src/pages/ErrorPage";
import TestPage from "pages/TestPage";
import DataManagementPage from "pages/DataManagementPage";

import { ToastContainer } from "react-toastify";

import { getRegisterAtom } from "atoms/registerAtom";
import { secretAtom } from "atoms/authenticateAtom";

function App() {
  const [secret] = useAtom(secretAtom);
  const [, getRegister] = useAtom(getRegisterAtom);

  const getRegisterWithSecret = useCallback(async () => {
    await getRegister();
  }, [getRegister]);

  useEffect(() => {
    let isMounted = true;

    if (secret && isMounted) {
      getRegisterWithSecret();
    }
    return () => {
      isMounted = false;
    };
  }, [secret, getRegisterWithSecret]);
 
  return (
    <GlobalLoading>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} caseSensitive />
          <Route path="test" element={<TestPage />} caseSensitive />
          <Route element={<PrivateRoute />}>
            <Route
              path="data-management"
              element={<DataManagementPage />}
              caseSensitive
            />
          </Route>
        </Route>
        <Route path="sign-in" element={<SignInPage />} caseSensitive />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </GlobalLoading>
  );
}

export default App;
