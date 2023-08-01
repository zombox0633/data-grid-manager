import { Routes, Route } from "react-router-dom";
import "./style/index.css";

import Layout from "src/components/Layout";
import HomePage from "src/pages/HomePage";
import SignInPage from "src/pages/SignInPage";
import ErrorPage from "src/pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} caseSensitive />
      </Route>
      <Route path="sign-in" element={<SignInPage />} caseSensitive />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
