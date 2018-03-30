export function LoadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = function() {
      resolve(this as HTMLImageElement);
    };
    img.src = src;
  });
}
