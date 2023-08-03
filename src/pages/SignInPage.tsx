import React from "react";
import { SIGNINPAGE_LIST } from "src/constraint/SIGNINPAGE_LIST";

function SignInPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className=" flex lg:justify-between justify-center h-full ml-[2%] mr-[2%] lg:mr-[5%] my-[2%]">
        <div className=" hidden lg:flex items-center">
          <div className="grid grid-cols-3 w-[60vw] h-[92vh]">
            {SIGNINPAGE_LIST &&
              SIGNINPAGE_LIST.map((date, index) => (
                <img
                  key={index}
                  src={date.imgUrl}
                  alt={date.imgAlt}
                  className=" lg:w-48 xl:w-60 2xl:w-80 lg:h-48 2xl:h-56 border-4 border-eerieBlack first-of-type:rounded-tl-3xl last-of-type:rounded-br-3xl drop-shadow-2xl"
                />
              ))}
          </div>
        </div>
        <div className="lg:w-1/3 xl:px-12 py-8 z-30">
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
                className=" w-full h-12 px-2 text-lg font-bold"
              />
              <input
                placeholder="password"
                type="password"
                className=" w-full h-12 px-2 text-lg font-bold"
              />
              <button className=" h-12 rounded-3xl bg-cambridgeBlue text-lg text-floralWhite font-bold  ">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute -top-1/4 -left-1/4 block lg:hidden w-[32rem] h-[32rem] rounded-full bg-cambridgeBlue opacity-80 z-0" />
      <div className=" absolute -top-1/4 -left-1/4 block lg:hidden w-[28rem] h-[28rem] rounded-full bg-floralWhite opacity-80 z-0" />
      <div className=" absolute -top-1/4 -left-1/4 block lg:hidden w-96 h-96 rounded-full bg-cambridgeBlue opacity-80 z-10" />
    </div>
  );
}

export default SignInPage;
