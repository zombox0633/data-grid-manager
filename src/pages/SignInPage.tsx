// import { useEffect } from "react";
// import { useAtom } from "jotai";

// import { loadingAtom } from "atoms/loadingAtom";

import useAuthentication from "hook/useAuthentication";

import DefaultButton from "components/button/DefaultButton";
import DefaultInput from "components/input/DefaultInput";
import SignInImageGrid from "components/signInPage/SignInImageGrid";

function SignInPage() {
  // const [, setIsOpen] = useAtom(loadingAtom);
  const { credentials, handleInputChange, onSubmitForm } = useAuthentication();

  // useEffect(() => {
  //   setIsOpen(true);

  //   const timer = setTimeout(() => {
  //     setIsOpen(false);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timer);
  //     setIsOpen(false);
  //   };
  // }, [setIsOpen]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1533157950006-c38844053d55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
        alt=""
        className="img-cover absolute block lg:hidden top-0 h-screen w-screen blur-sm -z-10"
        loading="eager"
      />
      <div className="absolute block top-0 h-screen w-screen bg-floralWhite opacity-50 z-0" />
      <div className=" flex lg:justify-between justify-center h-full ml-[2%] mr-[2%] lg:mr-[5%] my-[2%]">
        <div className=" hidden lg:flex items-center">
          <SignInImageGrid />
        </div>
        <div className="lg:w-1/3 xl:px-12 py-8 z-10">
          <div className="h-72">
            <h3>Roberta</h3>
            <h2>Welcome back</h2>
            <p className="m-2">Please enter you details</p>
          </div>
          <form
            className="h-96"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmitForm(credentials);
            }}
          >
            <div className="flex flex-col justify-between w-80 h-52 ">
              <DefaultInput
                type="email"
                name="email"
                minLength={8}
                placeholder="email"
                required
                value={credentials.email}
                onChange={handleInputChange}
              />
              <DefaultInput
                type="password"
                name="password"
                minLength={8}
                placeholder="password"
                required
                value={credentials.password}
                onChange={handleInputChange}
              />
              <DefaultButton type="submit" addClassName="sign_in__button">
                Continue
              </DefaultButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
