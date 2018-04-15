export default function LoadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = function() {
      resolve(this as HTMLImageElement);
    };
    img.onerror = e => {
      reject(e);
    };
    img.src = src;
  });
}
