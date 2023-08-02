//ref https://blog.logrocket.com/create-wavy-background-using-css-svg/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faGooglePlusG,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { copyToClipboard } from "helpers/index";

function Footer() {
  return (
    <div className=" relative flex flex-col justify-end h-full overflow-x-hidden">
      <div className=" absolute top-1/2 left-1/4 -translate-y-1/2  z-0">
        <div className=" w-[28rem] h-[28rem] rounded-full bg-red-500 opacity-70" />
      </div>
      <div className=" absolute top-[22%] right-1/2 lg:right-36 translate-x-1/2 lg:translate-x-0">
        <div className="w-72 sm:w-96 lg:w-[28rem]">
          <div className="w-52 lg:w-96">
            <h1>Roberta Project</h1>
          </div>
          <p className="w-72 lg:w-96 mt-8 text-justify">
            The project <b>react072023-ts</b> was created primarily as a testing
            environment for the <b>fastifyTS</b> project. It's a learning tool
            to better understand the functionalities of both back-end and
            front-end operations in web development. Please note that it is not
            intended for actual production deployment.
          </p>
        </div>
      </div>
      <div className="relative">
        <svg
          viewBox="0 0 500 200"
          className="h-[50vh] lg:h-[70vh] xl:h-full -scale-y-100"
        >
          <path
            d="M 0 60 C 220 180 300 0 500 80 L 500 0 L 0 0"
            fill="var(--ashGray-color)"
          ></path>
          <path
            d="M 0 60 C 220 180 330 -30 500 60 L 500 0 L 0 0"
            fill="var(--brunswickGreen-color)"
            className="opacity-80"
          ></path>
          <path
            d="M 0 60 C 220 180 300 0 500 100 L 500 0 L 0 0"
            fill="var(--cambridgeBlue-color)"
            className=" opacity-60"
          ></path>
        </svg>
        <div className="absolute bottom-8 lg:bottom-[16%] left-1/2 md:left-1/4 xl:left-[20%] flex flex-col items-center w-80 -translate-x-1/2 lg:translate-x-0 z-20">
          <h3 className="my-4 text-2xl sm:text-3xl text-floralWhite ">
            Contact Channels
          </h3>
          <ul className="flex items-center justify-between w-40 mb-6 mx-auto">
            <li>
              <a
                href="https://github.com/zombox0633"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} size="2xl" color="white" />
              </a>
            </li>
            <li>
              <button onClick={() => copyToClipboard("chayathorn.meesil@gmail.com")}>
                <FontAwesomeIcon
                  icon={faGooglePlusG}
                  size="2xl"
                  color="white"
                />
              </button>
            </li>
            <li>
              <a
                href="https://github.com/zombox0633"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2xl" color="white" />
              </a>
            </li>
          </ul>
          <span className="text-floralWhite font-semibold select-none">
            © 2023 zombox0633
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
