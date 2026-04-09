# Wordline Server

Backend for a real-time multiplayer Wordle-like game, where players join rooms and compete on the same word under the same constraints.

Each match is deterministic: same word, same rules, different outcomes based on player performance.

Core responsabilities:
- Authentication & sessions (cookie or token-based)
- Room lifecycle (create, join, leave)
- Game orchestration (word selection, validation, scoring)
- Real-time updates via WebSockets (guesses, results)
- Persistence (users, matches, stats)

## Architecture
Elysia is unopinionated about folder structure, so we can use a feature-bases folder structure where each feature has its own folder containing controllers, services, and models:

```
src/
  modules/
    room/
      index.ts (Controller)
      service.ts (service - business logic)
      model.ts (Model)
    game/
  infrastructure:
    db/
    cache/
    ws/
  state/
  utils/
```

For a more complete example, let's assume we have a `auth` feature. We would structure it like this:

**auth/index.ts**
```ts
// Controller (HTTP adapter) eg. routing, request validation
// You can define another Controller that is not tied with Elysia
import { Elysia } from 'elysia'

import { Auth } from './service'
import { AuthModel } from './model'

export const auth = new Elysia({ prefix: '/auth' })
	.get(
		'/sign-in',
		async ({ body, cookie: { session } }) => {
			const response = await Auth.signIn(body)

			// Set session cookie
			// (Elysia cookie is proxy, it can never be null/undefined)
			session!.value = response.token

			return response
		}, {
			body: AuthModel.signInBody,
			// response is optional, use to enforce return type
			response: {
				200: AuthModel.signInResponse,
				400: AuthModel.signInInvalid
			}
		}
	)
```

**auth/service.ts**
```ts
// Service handles business logic, decoupled from Elysia controller
import { status } from 'elysia'

import type { AuthModel } from './model'

// If a class doesn't need to store a property,
// you can use an `abstract class` to avoid class allocation
export abstract class Auth {
	static async signIn({ username, password }: AuthModel['signInBody']) {
		const user = await sql`
			SELECT password
			FROM users
			WHERE username = ${username}
			LIMIT 1`

		if (!await Bun.password.verify(password, user.password))
			// You can throw an HTTP error directly
			throw status(
				400,
				'Invalid username or password' satisfies AuthModel['signInInvalid']
			)

		return {
			username,
			token: await generateAndSaveTokenToDB(user.id)
		}
	}
}
```

**auth/model.ts**
```ts
// Model define the data structure and validation for the request and response
import { t, type UnwrapSchema } from 'elysia'

export const AuthModel = {
	signInBody: t.Object({
		username: t.String(),
		password: t.String(),
	}),
	signInResponse: t.Object({
		username: t.String(),
		token: t.String(),
	}),
	signInInvalid: t.Literal('Invalid username or password')
} as const

// Optional, cast all model to TypeScript type
export type AuthModel = {
	[k in keyof typeof AuthModel]: UnwrapSchema<typeof AuthModel[k]>
}
```

## References

- [Elysia's best practice page](https://elysiajs.com/essential/best-practice).
