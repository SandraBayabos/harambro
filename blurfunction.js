var str = document.body.innerHTML;
var res = str.replace(/sugar|house|car/gi, function (blur) {
  return blur = (`<span style="filter: blur(3px)">${blur}</span>`);
}
); document.body.innerHTML = res;