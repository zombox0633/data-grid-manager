function ErrorPage() {
  return (
    <div className=" flex flex-col justify-between h-[100vh] mx-[5%] py-[5%] overflow-hidden">
      <span className="h-30 font-semibold text-lg">404</span>
      <div>
        <h1 className="my-5">Page not found</h1>
        <p className="font-semibold text-xl">
          The page you are looking for doesn't exist.
        </p>
      </div>
      <div className="h-30"></div>
    </div>
  );
}

export default ErrorPage;
