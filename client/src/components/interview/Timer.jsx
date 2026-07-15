import { useEffect, useState } from "react";

function Timer({ initialTime, onTimeUp }) {

  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timeLeft, onTimeUp]);

  useEffect(() => {

    if(timeLeft===300){

        alert("⚠ Only 5 minutes remaining!");

    }

    if(timeLeft===60){

        alert("⚠ Final minute!");

    }

},[timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (

    <div className="bg-red-500 text-white px-5 py-2 rounded-xl font-semibold">

      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}

    </div>

  );

}

export default Timer;