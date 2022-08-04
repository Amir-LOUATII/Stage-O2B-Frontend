function timeAddZero(time) {
  if (time.toString().length < 2) {
    return `0${time}`;
  } else {
    return time;
  }
}

export default timeAddZero;
