export function parseError(err: any) {
  const name = err?.name;
  const message =
    err?.message ?? err?.toString?.() ?? err;
  const stack = err?.stack;
  return {
    name,
    message,
    stack
  };
}

export default parseError;
