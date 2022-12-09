import {useEffect, useState} from 'react';

export const useTimer = (endDate: string) => {
  const eventEndDate = new Date(endDate).getTime();
  const [formattedTimer, setFormattedTimer] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timer = eventEndDate - now;

      let days = Math.floor(timer / (1000 * 60 * 60 * 24)).toString();
      let hours = Math.floor(
        (timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      ).toString();
      let minutes = Math.floor(
        (timer % (1000 * 60 * 60)) / (1000 * 60),
      ).toString();
      let seconds = Math.floor((timer % (1000 * 60)) / 1000).toString();

      days = Number(days) < 10 ? '0' + days : days;
      hours = Number(hours) < 10 ? '0' + hours : hours;
      minutes = Number(minutes) < 10 ? '0' + minutes : minutes;
      seconds = Number(seconds) < 10 ? '0' + seconds : seconds;

      setFormattedTimer(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [eventEndDate]);

  return formattedTimer;
};
