
import { Routes,Route } from "react-router-dom"
import "./index.css";

import Layout from "src/components/Layout";
import HomePage from "src/pages/HomePage"
import SignInPage from "src/pages/SignInPage"
import SignUpPage from "src/pages/SignUpPage"
import ErrorPage from "src/pages/ErrorPage"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>} caseSensitive/>
      </Route>
      <Route path="sign-in" element={<SignInPage/>} caseSensitive/>
      <Route path="sign-up" element={<SignUpPage/>} caseSensitive/>
      <Route path="*" element={<ErrorPage/>}/>
      <Route/>
    </Routes>
  )
}

export default App
