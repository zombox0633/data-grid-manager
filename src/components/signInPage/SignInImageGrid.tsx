import { SIGNINPAGE_LIST } from "src/constraint/SIGNINPAGE_LIST";

type SignInImageGridType = {
  onImgLoaded: () => void;
};

function SignInImageGrid({ onImgLoaded }: SignInImageGridType) {
  return (
    <div className="grid grid-cols-3 w-[60vw] h-[92vh]">
      {SIGNINPAGE_LIST &&
        SIGNINPAGE_LIST.map((date, index) => (
          <img
            key={index}
            src={date.imgUrl}
            alt={date.imgAlt}
            className="img-cover lg:w-48 xl:w-60 2xl:w-80 lg:h-48 2xl:h-56 border-4 border-eerieBlack first-of-type:rounded-tl-3xl last-of-type:rounded-br-3xl drop-shadow-2xl"
            loading="eager"
            onLoad={onImgLoaded}
          />
        ))}
    </div>
  );
}

export default SignInImageGrid;
