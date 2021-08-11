interface BufferObj {
  position?: WebGLBuffer | null,
  color?: WebGLBuffer | null,
  indices?: WebGLBuffer| null,
}
/**
 *  初始化glbuffer
 * @param {WebGLRenderingContext} gl
 * @return {BufferObj}
 */
export default function initBuffers(gl:WebGLRenderingContext):BufferObj {
  const cubeVertexIndices = [
    0, 1, 2, 0, 2, 3, // front
    4, 5, 6, 4, 6, 7, // back
    8, 9, 10, 8, 10, 11, // top
    12, 13, 14, 12, 14, 15, // bottom
    16, 17, 18, 16, 18, 19, // right
    20, 21, 22, 20, 22, 23, // left
  ];
  const positions = [
    // Front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
  ];
  const colors = [
    [1.0, 1.0, 1.0, 1.0], // Front face: white
    [1.0, 0.0, 0.0, 1.0], // Back face: red
    [0.0, 1.0, 0.0, 1.0], // Top face: green
    [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
    [1.0, 1.0, 0.0, 1.0], // Right face: yellow
    [1.0, 0.0, 1.0, 1.0], // Left face: purple
  ];

  let generatedColors:number[] = [];

  for (let j=0; j<6; ++j) {
    const c = colors[j];
    generatedColors = generatedColors.concat(c, c, c, c);
  }

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER,
      new Float32Array(positions),
      WebGLRenderingContext.STATIC_DRAW,
  );

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER,
      new Float32Array(generatedColors),
      WebGLRenderingContext.STATIC_DRAW,
  );

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(WebGLRenderingContext.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(cubeVertexIndices),
      WebGLRenderingContext.STATIC_DRAW,
  );

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}
