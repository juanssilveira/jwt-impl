import ms from 'ms'

import { encodeToBase64Url } from '../utils/encode-to-base64url'
import { convertTimestampToUnix } from '../utils/convert-timestamp-to-unix'
import { generateHmac256Signature } from '../utils/generate-hmac256-signature'

interface JwtSignOptions {
  secret: string
  expiresIn: string | number
  payload: Record<string, unknown>
  algorithm?: 'HS256'
}

export function sign({ 
  secret, 
  expiresIn, 
  payload, 
  algorithm = 'HS256',
}: JwtSignOptions) {
  const expirationTimeInMiliseconds = typeof expiresIn === 'string'
    ? ms(expiresIn)
    : expiresIn

  const _header = {
    alg: algorithm,
    typ: 'JWT',
  }

  const _payload = {
    ...payload,
    iat: convertTimestampToUnix(Date.now()),
    exp: convertTimestampToUnix(Date.now() + expirationTimeInMiliseconds),
  }

  const encodedBase64UrlHeader = encodeToBase64Url(JSON.stringify(_header))
  const encodedBase64UrlPayload = encodeToBase64Url(JSON.stringify(_payload))

  const hmacSignature = generateHmac256Signature({
    secret,
    str: `${encodedBase64UrlHeader}.${encodedBase64UrlPayload}`
  })

  const token = [
    encodedBase64UrlHeader, 
    encodedBase64UrlPayload, 
    hmacSignature,
  ].join('.')

  return token
}
