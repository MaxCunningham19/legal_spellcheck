# Running the local instance

## Prerequisites

Install docker compose.

## Commands

In the 'docker' directory, run:

```
docker compose build
docker compose up webserver-local
```

Access the page at `localhost:8080` in your browser.

Whe1n you are done, use:

```
docker compose down
```

## Debugging

The `shell.sh` script will launch a shell in a running webserver.
From there, you can run run migrations, use the Django shell and otherwise debug the local setup.

```
./scripts/shell.sh
```
