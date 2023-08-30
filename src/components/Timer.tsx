import { useState, useEffect, memo } from "react";

function Timer() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const timeString = `
    ${hours   < 10 ? `0${hours}` : hours} 
  : ${minutes < 10 ? `0${minutes}` : minutes}
  : ${seconds < 10 ? `0${seconds}` : seconds}`;

  return <h2 className="mb-6 text-right">{timeString}</h2>;
}

export default memo(Timer);
