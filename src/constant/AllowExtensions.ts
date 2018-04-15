export const ALLOW_EXTENSITONS = ["png", "jpg", "jpeg", "bmp"];

export default function PassExtensions(fileName: string) {
  return ALLOW_EXTENSITONS.some(v => fileName.endsWith(v));
}
