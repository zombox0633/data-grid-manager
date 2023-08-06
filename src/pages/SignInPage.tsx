import { useEffect } from "react";
import { useAtom } from "jotai";

import { loadingAtom } from "atoms/loadingAtom";

import { SIGNINPAGE_LIST } from "src/constraint/SIGNINPAGE_LIST";

function SignInPage() {
  const [, setIsOpen] = useAtom(loadingAtom);

  useEffect(() => {
    setIsOpen(true);

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      setIsOpen(false);
    };
  }, [setIsOpen]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <img
          src="https://images.unsplash.com/photo-1533157950006-c38844053d55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
          alt=""
          className="img-cover absolute block lg:hidden top-0 h-screen w-screen blur-sm -z-10"
        />
      <div className="absolute block top-0 h-screen w-screen bg-floralWhite opacity-50 z-0"/>
      <div className=" flex lg:justify-between justify-center h-full ml-[2%] mr-[2%] lg:mr-[5%] my-[2%]">
        <div className=" hidden lg:flex items-center">
          <div className="grid grid-cols-3 w-[60vw] h-[92vh]">
            {SIGNINPAGE_LIST &&
              SIGNINPAGE_LIST.map((date, index) => (
                <img
                  key={index}
                  src={date.imgUrl}
                  alt={date.imgAlt}
                  className="img-cover lg:w-48 xl:w-60 2xl:w-80 lg:h-48 2xl:h-56 border-4 border-eerieBlack first-of-type:rounded-tl-3xl last-of-type:rounded-br-3xl drop-shadow-2xl"
                />
              ))}
          </div>
        </div>
        <div className="lg:w-1/3 xl:px-12 py-8 z-10">
          <div className="h-72">
            <h3>Roberta</h3>
            <h2>Welcome back</h2>
            <p className="m-2">Please enter you details</p>
          </div>
          <div className="h-96 ">
            <div className="flex flex-col justify-between w-80 h-52 ">
              <input
                placeholder="username"
                type="email"
                className=" w-full h-12 px-2 bg-floralWhite text-lg font-bold"
              />
              <input
                placeholder="password"
                type="password"
                className=" w-full h-12 px-2 text-lg bg-floralWhite font-bold"
              />
              <button className=" h-12 rounded-3xl bg-cambridgeBlue text-lg text-floralWhite font-bold  ">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
