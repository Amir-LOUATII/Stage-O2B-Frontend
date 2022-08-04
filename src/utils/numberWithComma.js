function numberWithCommas(x) {
  if (typeof x === "number") {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } else if (typeof x == "string") {
    return x.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  } else return x;
}

export default numberWithCommas;
