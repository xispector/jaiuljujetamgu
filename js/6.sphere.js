const body = document.querySelector("body")
const pre = document.createElement("pre");
document.body.appendChild(pre);

const resolution = 2720
const R1 = 70;
const K2 = 100;
const K1 = 20 ;
const light = [0, 1, -1];
const lightAscii = ".,-~:;=!*#$@"

const cos = (theta) => Math.cos(theta);
const sin = (theta) => Math.sin(theta);
const yRotationMatrix = (x, y, z, theta) => [x * cos(theta) - z * sin(theta), y, x * sin(theta) + z * cos(theta)]
const xRotationMatrix = (x, y, z, theta) => [x, y * cos(theta) - z * sin(theta), y * sin(theta) + z * cos(theta)]
const zRotationMatrix = (x, y, z, theta) => [x * cos(theta) - y * sin(theta), x * sin(theta) + y * cos(theta), z]
const point = (x, y, z) => {
  const origin = resolution / 2 + 40;
  return origin + Math.round(K1 * x / (K2 + z)) - 80 * Math.round(K1 * y / (K2 + z));
}


  const a = [...Array(resolution)].map((_,i) => i % 80 == 79 ? "\n" : " ");
  const zBuffer = [...Array(resolution)].map((_,i) => i % 80 == 79 ? "\n" : "0");
  
  for (let phi = 0; phi < 6.28; phi += .01) {
    for (let theta = 0; theta < 6.28; theta += .01) {
      let position = [R1 * cos(theta), R1 * sin(theta), 0];
      let gradient = [cos(theta), sin(theta), 0];
      position = position.map((_, idx, arr) => yRotationMatrix(arr[0], arr[1], arr[2], phi)[idx]);
      gradient = gradient.map((_, idx, arr) => yRotationMatrix(arr[0], arr[1], arr[2], phi)[idx]);
      const lightIndex = light.reduce((sum, v, i) => sum + v * gradient[i] * 8);
      if (lightIndex > 0 && zBuffer[point(position[0], (9 / 19) * position[1], position[2])] < 1 / (position[2] + K2)) {
        a[point(position[0], (9 / 19) * position[1], position[2])] = lightAscii[Math.floor(lightIndex)];
        zBuffer[point(position[0], (9 / 19) * position[1], position[2])] = 1 / (K2 + position[2]);
      }
    }
  }
  pre.innerHTML = a.join("");
