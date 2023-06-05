# Gamerboxd


This API aggregates videogame reviews. It applies a CRUD system to create users and reviews, list game reviews, update reviews and sessions, and delete users and reviews. It uses PostgreSQL as a database with the help with others technologies such as:

- Express
- Express Async Erros
- JOI
- Bcrypt
- JWT

## How to run

1. Clone this repository
2. Install dependencies with `npm install`
3. Create a PostgreSQL database, there's a script in root folder to create the database and the tables 
4. Configure .env file with your database credentials
5. Run `npm run dev` to start the server

## Simple API Documentation

### User Routes

<details>
<summary><code>POST</code> <code>/users/signup</code></summary>

Body

```json
{
	"name": "Test",
	"email": "test@email.com",
	"password": "secret"
}
```

Response - `201 CREATED`


</details>

---

<details>
<summary><code>PUT</code> <code>/users/signin</code></summary>

Body

```json
{
	"email": "test@email.com",
	"password": "secret"
}
```

Response - `200 OK`

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImlhdCI6MTY4MTA1Mzc2N30.5ZUfRvvETQcJ57_PxF7v7mkdO-nZpa3C9QR1g1PEcXY"
}
```
---

</details>

---

<details>
<summary><code>GET</code> <code>/users/</code></summary>

Response - `200 OK`

```json
{
  "users": [
    {
      "id": 1,
      "name": "teste"
    },
    {
      "id": 2,
      "name": "teste2"
    }
  ]
}
```
</details>

---

<details>
<summary><code>DELETE</code> <code>/user/delete/:id</code></summary>

Response - `204 No Content`


</details>

<!---
### Review Routes

<details>
<summary><code>POST</code> <code>/reviews/add/:gameid?userid=</code></summary>

Body

```json
{
  "review": "Meh",
	"grade": 6.5,
}
```

Response - `201 CREATED`

```json
{
	"id": 3,
	"user_id": 1,
	"game_id": 2,
	"grade": "6.5",
	"review": "Meh",
}
```

</details>

---

<details>
<summary><code>GET</code> <code>/reviews</code></summary>


Response - `200 OK`

```json
[
      {
    "id": 1,
    "game_id": 4505,
    "user_id": 1,
    "review": "teste",
    "grade": "9.5",
    "users": {
      "name": "gabe"
    }
]
```
</details>


### Comment Routes

<details>
<summary><code>POST</code> <code>/comments/:review_id</code> - Authenticated Route</summary>

Body

```json
{
    "comment": "Good Review!"
}
```

Response - `201 CREATED`

```json
{
    "id": 4,
    "review_id": 3,
    "user_id": 2,
    "text": "Good Review",
    "created_at": "2023-04-09T19:20:24.755Z"
}
```
</details>

---
<details>
<summary><code>PUT</code> <code>/comments/:comment_id</code> - Authenticated Route</summary>
Body

```json
{
    "comment": "New Text!"
}
```

Response - `200 OK`

```json
{
    "id": 4,
    "review_id": 3,
    "user_id": 2,
    "text": "New Text!",
    "created_at": "2023-04-09T19:20:24.755Z"
}
```
</details>

---
<details>
<summary><code>DELETE</code> <code>/comments/:comment_id</code> - Authenticated Route</summary>

Response - `204 NO CONTENT`

</details>
-->

## Current Features

- [x] Create User
- [x] Login User
- [x] Delete User

## Planned Features

- [ ] Delete Reviews
- [ ] Get Game Scores
- [ ] Get Game Average Score
- [ ] Create Review
- [ ] List Reviews
- [ ] List Games