const circle = () => {
  const legacy = document.querySelector("pre");
  if (legacy) {
    legacy.remove();
  }
  const body = document.querySelector("body")
  const pre = document.createElement("pre");
  document.body.appendChild(pre);
  
  const resolution = 2720
  const R1 = 10;
  const R2 = 20;
  
  const cos = (theta) => Math.cos(theta);
  const sin = (theta) => Math.sin(theta);
  const point = (x, y) => {
    const origin = resolution / 2 + 40;
    a[origin] = "@";
    return origin + Math.round(x) - 80 * Math.round(y);
  }
  
  
  
  
  const a = [...Array(resolution)].map((_,i) => i % 80 == 79 ? "\n" : " ");
    
  for (let theta = 0; theta < 6.28; theta += .01) {
    let position = [R2 + R1 * cos(theta), R1 * sin(theta), 0];
          a[point(position[0], (9 / 19) * position[1], position[2])] = "0";
    }
  pre.innerHTML = a.join("");
}


