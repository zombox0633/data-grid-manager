import { CancelTokenSource } from "axios";
import { useEffect } from "react";

function useCancelToken(cancelTokenSource: CancelTokenSource | null) {
  useEffect(() => {
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Component was unmounted");
      }
    };
  }, [cancelTokenSource]);
}

export default useCancelToken