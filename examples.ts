import { sign, verify } from '~/jwt'

const secret = 'MY_SUPER_SECRET_KEY'

const generatedToken = sign({ 
  secret,
  expiresIn: '60s',
  payload: {
    sub: '1234567890',
    name: 'John Doe',
  },
})

const verifyJwt = verify({
  secret,
  token: generatedToken,
})

console.log('[LOG]', generatedToken)
console.log('[LOG]', verifyJwt)

// DEBUG EXPIRATION TIME

/*
  let elapsedTime = 0

  setInterval(() => {
    try {
      verify({
        secret,
        token: generatedToken,
      })

      elapsedTime += 1

      console.log(`✅ [${elapsedTime}s] Valid token`)
    } 
    catch {
      console.log(`❌ [${elapsedTime}s] Expired token`)

      return process.exit(1)
    }
  }, 1000)
*/