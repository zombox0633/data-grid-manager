import Footer from "components/Footer";
import Section from "components/Section";

import useHomePage from "hook/useHomePage";

import { HOMEPAGE_LIST } from "src/constraint/HOMEPAGE_LIST";

function HomePage() {
  const { scrollY, backgroundColor, divRef } = useHomePage();

  return (
    <div
      ref={divRef}
      // style={{ backgroundColor: backgroundColor }}
      className={`bodyHomePage ${backgroundColor}`}
    >
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
