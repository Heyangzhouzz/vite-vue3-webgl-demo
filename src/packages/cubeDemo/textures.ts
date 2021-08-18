import Logo from '@/assets/logo.png';

export default (gl: WebGLRenderingContext) => {
  const cubeTexture = gl.createTexture();
  if (!cubeTexture) {
    return;
  }
  const cubeImage = new Image();
  cubeImage.onload = function() {
    handleTextureLoaded(cubeImage, cubeTexture, gl);
  };
  cubeImage.src = Logo;
  return cubeTexture;
};

/** *
 * [Description]
 * @param {number} value
 * @return {number}
 */
function isPowerOf2(value:number) {
  return (value & (value - 1)) == 0;
}

/** *
 * [Description]
 * @param {HTMLImageElement} image
 * @param {WebGLTexture} texture
 * @param {WebGLRenderingContext} gl
 */
function handleTextureLoaded(image:HTMLImageElement, texture:WebGLTexture, gl: WebGLRenderingContext) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  // WebGL1 has different requirements for power of 2 images
  // vs non power of 2 images so check if the image is a
  // power of 2 in both dimensions.
  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
    // Yes, it's a power of 2. Generate mips.
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    // No, it's not a power of 2. Turn of mips and set
    // wrapping to clamp to edge
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
  gl.bindTexture(gl.TEXTURE_2D, null);
}
