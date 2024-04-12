import crypto from 'node:crypto'

interface GenerateHmac256SignatureOptions {
  secret: string
  str: string
}

export function generateHmac256Signature({ 
  secret, 
  str,
}: GenerateHmac256SignatureOptions) {
  const hmacSignature = crypto
    .createHmac('SHA256', secret)
    .update(str)
    .digest('base64url')

  return hmacSignature
}