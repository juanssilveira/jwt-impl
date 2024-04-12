# JWT Implementation

A simple implementation of the **jsonwebtoken** library for study, using only the HS256 algorithm

## Sign

```ts
sign({ 
  secret: '<YOUR_SECRET_KEY>',
  expiresIn: '60s', // literal string or miliseconds number
  payload: {
    sub: '1234567890',
    name: 'John Doe',
  },
})
```

## Verify

```ts
verify({
  secret: '<YOUR_SECRET_KEY>',
  token: '<YOUR_GENERATED_TOKEN>',
})
```

You can see it working by looking at the *examples.ts* file or running this script:

```sh
npm run dev
```