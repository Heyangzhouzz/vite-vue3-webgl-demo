
export default function initBuffers(gl:WebGLRenderingContext) {
  const positionBuffer = gl.createBuffer();
  const positions = [
     1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
    -1.0, -1.0,
  ];
  gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER,
    new Float32Array(positions),
    WebGLRenderingContext.STATIC_DRAW
  );

  const colorBuffer = gl.createBuffer();
  const colors = [
    1.0,  1.0,  1.0,  1.0,    // 白
    1.0,  0.0,  0.0,  1.0,    // 红
    0.0,  1.0,  0.0,  1.0,    // 绿
    0.0,  0.0,  1.0,  1.0,    // 蓝
  ];

  gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER,
    new Float32Array(colors),
    WebGLRenderingContext.STATIC_DRAW
  );

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}