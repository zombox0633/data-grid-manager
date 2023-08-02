import React from "react";

type SectionType = {
  SectionId: string;
  srcImg: string;
  altImg: string;
  children: React.ReactNode;
};

function Section({
  SectionId,
  srcImg,
  altImg,
  children,
}: SectionType) {
  return (
    <section
      id={SectionId}
      className={`relative snap-center w-full h-screen px-4 z-0`}
    >
      <div className="flex justify-center min-w-full h-[18rem] sm:h-[20rem] md:h-[24rem] lg:h-[28rem] xl:h-[30rem] 2xl:h-[32rem] translate-y-[60%] md:translate-y-[45%] lg:translate-y-1/4 xl:translate-y-[20%] 2xl:translate-y-[30%] drop-shadow-2xl">
        <div>
          <img
            className="h-full object-cover object-center mb-6 border-8"
            src={srcImg}
            alt={altImg}
          />
          <div className="w-1/2 mx-auto text-center">
            <span className="text-xl font-semibold">{altImg}</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[12%] sm:bottom-[7%] md:bottom-[5%] lg:bottom-4 2xl:bottom-[5%] left-1/2 lg:left-16 w-80 -translate-x-1/2 lg:translate-x-0 ">
        <p className="text-base font-semibold text-justify ">{children}</p>
        <br />
      </div>
      {/* <div className=" absolute bottom-2 left-4 sm:left-8 md:left-12 lg:left-16 z-10">
        <span className="text-sm xl:text-base ">
          © 2023 <a href="#A4">zombox0633</a>
        </span>
      </div> */}
    </section>
  );
}

export default Section;
