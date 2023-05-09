const cube = () => {
  const legacy = document.querySelector("pre");
  if (legacy) {
    legacy.remove();
  }
  const body = document.querySelector("body")
  const pre = document.createElement("pre");
  document.body.appendChild(pre);
  
  const resolution = 2720
  const R1 = 25;
  const R2 = 50;
  const K2 = 100;
  const K1 = 60 ;
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
  
  function rotate (position, gradient, phi, A, B, a, zBuffer) {
    position = position.map((_, idx, arr) => yRotationMatrix(arr[0], arr[1], arr[2], phi)[idx]);
    position = position.map((_, idx, arr) => xRotationMatrix(arr[0], arr[1], arr[2], A)[idx]);
    position = position.map((_, idx, arr) => zRotationMatrix(arr[0], arr[1], arr[2], B)[idx]);
    gradient = gradient.map((_, idx, arr) => yRotationMatrix(arr[0], arr[1], arr[2], phi)[idx]);
    gradient = gradient.map((_, idx, arr) => xRotationMatrix(arr[0], arr[1], arr[2], A)[idx]);
    gradient = gradient.map((_, idx, arr) => zRotationMatrix(arr[0], arr[1], arr[2], B)[idx]);
    const lightIndex = light.reduce((sum, v, i) => sum + v * gradient[i] * 8);
    if (zBuffer[point(position[0], (9 / 19) * position[1], position[2])] < 1 / (position[2] + K2)) {
      if (lightIndex > 0) {
        a[point(position[0], (9 / 19) * position[1], position[2])] = lightAscii[Math.floor(lightIndex)];
      } else {
        a[point(position[0], (9 / 19) * position[1], position[2])] = ".";
      }
      zBuffer[point(position[0], (9 / 19) * position[1], position[2])] = 1 / (K2 + position[2]);
    }
  }
  
  let A = 0, B = 0, phi =0;
  
  setInterval(() => {
    A += .07;
    B += .03;
    phi += .03
    const a = [...Array(resolution)].map((_,i) => i % 80 == 79 ? "\n" : " ");
    const zBuffer = [...Array(resolution)].map((_,i) => i % 80 == 79 ? "\n" : "0");
  
    for (let y = -20; y <= 20; y++) {
      for (let x = -20; x <= 20; x++) {
        let position = [x, y, -20];
        let gradient = [0, 0, -1];
        rotate(position, gradient, phi, A, B, a, zBuffer);
      }
    }
    for (let y = -20; y <= 20; y++) {
      for (let x = -20; x <= 20; x++) {
        let position = [x, y, 20];
        let gradient = [0, 0, 1];
        rotate(position, gradient, phi, A, B, a, zBuffer);
      }
    }
    for (let z = -20; z <= 20; z++) {
      for (let x = -20; x <= 20; x++) {
        let position = [x, 20, z];
        let gradient = [0, 1, 0];
        rotate(position, gradient, phi, A, B, a, zBuffer);
      }
    }
    for (let z = -20; z <= 20; z++) {
      for (let x = -20; x <= 20; x++) {
        let position = [x, -20, z];
        let gradient = [0, -1, 0];
        rotate(position, gradient, phi, A, B, a, zBuffer);
      }
    }
    for (let z = -20; z <= 20; z++) {
      for (let y = -20; y <= 20; y++) {
        let position = [20, y, z];
        let gradient = [1, 0, 0];
        rotate(position, gradient, phi, A, B, a, zBuffer);
      }
    }
    for (let z = -20; z <= 20; z++) {
      for (let y = -20; y <= 20; y++) {
        let position = [-20, y, z];
        let gradient = [-1, 0, 0];
        rotate(position, gradient, phi, A, B, a, zBuffer);
      }
    }
  
  
    pre.innerHTML = a.join("");
  
  }, 50)
}
