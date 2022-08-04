import React, { useEffect, useState } from "react";
import CounterBlock from "./CounterBlock";

const TimeCounter = ({ date }) => {
  const [days, setDays] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let counter = setInterval(() => {
      const dateDiff = new Date(date).getTime() - new Date().getTime();
      if (dateDiff <= 0) {
        clearInterval(counter);
      }
      setDays(Math.floor(dateDiff / (1000 * 60 * 60 * 60)));
      setHours(
        Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(
        Math.floor(
          ((dateDiff % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60)
        )
      );
      setSeconds(
        Math.floor(
          (((dateDiff % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) %
            (1000 * 60)) /
            1000
        )
      );
    }, 1000);
  }, [date]);
  return (
    <div className="d-flex justify-content-center align-items-center mb-3">
      <CounterBlock data={days} name={"Day(s)"} />
      <CounterBlock data={hours} name={"Hour(s)"} />
      <CounterBlock data={minutes} name={"Minute(s)"} />
      <CounterBlock data={seconds} name={"Second(s)"} />
    </div>
  );
};

export default TimeCounter;
