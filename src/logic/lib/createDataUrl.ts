export default function createDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const f = new FileReader();
    f.onload = e => {
      if (e.target) {
        resolve((e.target as any).result);
      } else {
        reject();
      }
    };
    f.readAsDataURL(file);
  });
}
