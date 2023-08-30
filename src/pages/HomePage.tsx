import Footer from "components/Footer";
import Section from "components/homePage/Section";

import useHomePage from "hook/useHomePage";

import { HOMEPAGE_LIST } from "src/constraint/HOMEPAGE_LIST";
import useImageLoader from "hook/useImageLoader";

function HomePage() {
  const { backgroundColor, divRef } = useHomePage();

  const { onImgLoaded } = useImageLoader(HOMEPAGE_LIST.length);

  return (
    <div ref={divRef} className={`home_page__body ${backgroundColor}`}>
      {/* <div className=" absolute bottom-6 right-12 z-10">
        <p>{scrollY}</p>
      </div> */}
      {HOMEPAGE_LIST &&
        HOMEPAGE_LIST.map((data, index) => (
          <Section
            key={index}
            SectionId={data.SectionId}
            srcImg={data.imageUrl}
            altImg={data.imageName}
            onImgLoaded={onImgLoaded}
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
