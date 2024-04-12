import { convertTimestampToUnix } from '../utils/convert-timestamp-to-unix'
import { generateHmac256Signature } from '../utils/generate-hmac256-signature'

interface JwtVerifyOptions {
  secret: string
  token: string
}

export function verify({ secret, token }: JwtVerifyOptions) {
  const [
    encodedBase64UrlHeader, 
    encodedBase64UrlPayload, 
    providedSignature,
  ] = token.split('.')

  const hmacSignature = generateHmac256Signature({
    secret,
    str: `${encodedBase64UrlHeader}.${encodedBase64UrlPayload}`
  })

  const decodedPayload = JSON.parse(
    Buffer
      .from(encodedBase64UrlPayload, 'base64url')
      .toString('utf8')
  )

  const isValidSignature = providedSignature === hmacSignature
  const isExpiredToken = decodedPayload.exp < convertTimestampToUnix(Date.now())

  if (!isValidSignature) {
    throw new Error('Invalid token')
  }

  if (isExpiredToken) {
    throw new Error('Expired token')
  }

  return decodedPayload
}
