export function uuid() {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-yyyy-yyyy-yyyy-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x'
        ? r
        : (r & 0x7) | 0x8
      ).toString(16);
    }
  );
  return uuid;
}

export default uuid;