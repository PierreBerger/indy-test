# 🚀 Fastify-starter

Fastify starter template with Typescript, Prisma and Vitest

### Requirements

- Node.js and [bun](https://bun.sh) (or npm, yarn, pnpm)

### Getting started

#### 1. Download starter and install dependencies

Run the following command on your local environment:

```shell
git clone --depth=1 https://github.com/pierreberger/fastify-starter.git my-project-name
cd my-project-name
bun install
```

#### 2. Set the environment variables:

```shell
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

#### 3. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and
`Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```shell
bun prisma migrate dev --name init
```

#### 4. Start the Fastify server

Launch your Fastify server in development mode with live reload:

```shell
bun run dev
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your favorite browser to explore the
API of your Fastify server.

### Commands

All commands are run from the root of the project, from a terminal:

| Command          | Action                                      |
| :--------------- | :------------------------------------------ |
| `bun install`    | Installs dependencies                       |
| `bun run dev`    | Starts local dev server at `localhost:3000` |
| `bun run test`   | Run tests with Vitest                       |
| `bun run build`  | Build your production site to `./dist/`     |
| `bun run start`  | Preview your build locally                  |
| `bun run format` | Format codes with Prettier                  |
| `bun run lint`   | Run Eslint                                  |

### Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default
values:

```bash
# Port number
PORT=3000
DATABASE_URL="./data.db"
OPENWEATHERMAP_APIKEY="XXXX"
```

### Requests example

<details>
  <summary>Create promocode</summary>
  
  ```bash
    ## Create promocode
    curl -X "POST" "http://localhost:3000/promocodes" \
        -H 'Content-Type: application/json; charset=utf-8' \
        -d $'{
    "promocode_name": "mycode",
    "restrictions": [
        {
        "@age": {
            "gt": 20,
            "lt": 50
        }
        },
        {
        "@and": [
            {
            "@date": {
                "after": "2020-12-31",
                "before": "2029-01-01"
            }
            },
            {
            "@age": {
                "gt": 0,
                "lt": 100
            }
            }
        ]
        }
    ],
    "advantage": {
        "percent": 30
    }
    }'
```

</details>

<details>
  <summary>Validate promocode</summary>

```bash
## Validate mycode
curl -X "POST" "http://localhost:3000/promocodes/validate" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "promocode_name": "mycode",
  "arguments": {
    "age": 25
  }
}'
```

</details>

<details>
  <summary>Validate promocode with weather (denied)</summary>

```bash
## Validate FEB80
curl -X "POST" "http://localhost:3000/promocodes/validate" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "promocode_name": "FEB80",
  "arguments": {
    "age": 40,
    "meteo": {
      "town": "Dakar"
    }
  }
}'
```

</details>
