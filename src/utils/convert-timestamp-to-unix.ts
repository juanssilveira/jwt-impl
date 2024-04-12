export function convertTimestampToUnix(timestamp: number) {
  return Math.floor(timestamp / 1000)
}
