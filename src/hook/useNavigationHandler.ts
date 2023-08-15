import { useNavigate } from "react-router-dom";

function useNavigationHandler() {
  const navigate = useNavigate()

  const handleLink = (path:string) => {
    navigate(path);
  };

  return{
    handleLink
  }
}

export default useNavigationHandler