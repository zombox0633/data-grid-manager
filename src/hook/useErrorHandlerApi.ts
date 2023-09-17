import {useEffect} from 'react'

import { showToast } from "style/toast";

function useErrorHandlerApi(error:string|null) {
  useEffect(() => {
    if(error){
      showToast("error",error)
    }
  }, [error])
  
}

export default useErrorHandlerApi