export function encodeToBase64Url(_string: string) {
  return Buffer.from(_string).toString('base64url')
}