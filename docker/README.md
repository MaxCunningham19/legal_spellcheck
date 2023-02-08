# Running the local instance

## Prerequisites

Install docker compose.

## Running the production server

In the 'docker' directory, run:

```
docker compose build
docker compose up webserver
```

Access the page at `localhost:8080` in your browser.

When you are done, use:

```
docker compose down
```

## Running the development server

The development server is supposed to make the `edit -> update -> edit` feedback loop quicker.
Basically, it listens for file updates in `server/` or `client/` and reloads relevant files when this happens.

The development server assumes that you have installed webpack in the client nodejs package (this should be in the package.json).

In the 'docker' directory, run:

```
docker compose build
docker compose up webserver-local
```

When you are done, use:

```
docker compose down
```

## Debugging

The `shell.sh` script will launch a shell in a running webserver.
From there, you can run run migrations, use the Django shell and otherwise debug the local setup.

```
./scripts/shell.sh
```
