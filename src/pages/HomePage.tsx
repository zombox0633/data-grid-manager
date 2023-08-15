import { useEffect } from "react";
import { useAtom } from "jotai";

import { loadingAtom } from "atoms/loadingAtom";

import Footer from "components/Footer";
import Section from "components/homePage/Section";

import useHomePage from "hook/useHomePage";

import { HOMEPAGE_LIST } from "src/constraint/HOMEPAGE_LIST";

function HomePage() {
  const [, setIsOpen] = useAtom(loadingAtom);

  const { scrollY, backgroundColor, divRef } = useHomePage();

  useEffect(() => {
    setIsOpen(true);

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setIsOpen(false);
    };
  }, [setIsOpen]);

  return (
    <div ref={divRef} className={`home_page__body ${backgroundColor}`}>
      <div className=" absolute bottom-6 right-12 z-10">
        <p>{scrollY}</p>
      </div>
      {HOMEPAGE_LIST &&
        HOMEPAGE_LIST.map((data, index) => (
          <Section
            key={index}
            SectionId={data.SectionId}
            srcImg={data.imageUrl}
            altImg={data.imageName}
          >
            {data.article}
          </Section>
        ))}
      <div id="A4" className="snap-center h-screen ">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
