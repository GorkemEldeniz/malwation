export default function timeoutHelper(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
