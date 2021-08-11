import {mat4} from 'gl-matrix';
export default (gl: WebGLRenderingContext, programInfo: any, buffers: any, squareRotation = 0) => {
  gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
  gl.clearDepth(1.0); // Clear everything
  gl.enable(gl.DEPTH_TEST); // Enable depth testing
  gl.depthFunc(gl.LEQUAL); // Near things obscure far things
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = 45 * Math.PI / 180; // in radians
  const aspect = gl.canvas.width / gl.canvas.width;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  const modelViewMatrix = mat4.create();

  mat4.translate(modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to translate
      [-0.0, 0.0, -6.0]); // amount to translate

  mat4.rotate(modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to rotate
      squareRotation, // amount to rotate in radians
      [0, 0, 1]); // axis to rotate around
  mat4.rotate(modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to rotate
      squareRotation * .7, // amount to rotate in radians
      [0, 1, 0]);

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      3,
      gl.FLOAT,
      false,
      0,
      0);
  gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition);


  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer( programInfo.attribLocations.vertexColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexColor);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
};
