# Makefile — shortcuts for local/prod workflows
SHELL := /bin/bash
ENV ?= .env
COMPOSE ?= docker compose

BASE  := -f docker-compose.yml --env-file $(ENV)
LOCAL := $(BASE) -f docker-compose.local.yml
PROD  := $(BASE) -f docker-compose.prod.yml

.PHONY: up local prod down logs ps config-local config-prod restart acme certs hosts-check

## Auto-selects local/prod by reading MODE in .env (defaults to local)
up:
	@if grep -qE '^[[:space:]]*MODE=prod' $(ENV) 2>/dev/null; then \
		echo "→ MODE=prod detected. Bringing up PROD..."; \
		$(MAKE) prod; \
	else \
		echo "→ MODE=local (or unset). Bringing up LOCAL..."; \
		$(MAKE) local; \
	fi

## Local (mkcert) — builds if needed
local:
	$(COMPOSE) $(LOCAL) up -d --build

## Production (ACME) — ensure acme.json perms
prod: acme
	$(COMPOSE) $(PROD) up -d

## Stop & remove containers (preserves volumes)
down:
	$(COMPOSE) $(BASE) down

## Tail Traefik logs
logs:
	$(COMPOSE) $(BASE) logs -f traefik

## Show running services
ps:
	$(COMPOSE) $(BASE) ps

## Inspect effective merged configs
config-local:
	$(COMPOSE) $(LOCAL) config
config-prod:
	$(COMPOSE) $(PROD) config

## Restart Traefik container
restart:
	$(COMPOSE) $(BASE) restart traefik

## Prepare ACME storage (prod)
acme:
	mkdir -p traefik; touch traefik/acme.json; chmod 600 traefik/acme.json

## Generate local certs with mkcert (dev)
certs:
	mkdir -p traefik/certs; \
	mkcert -cert-file traefik/certs/dev-local.pem -key-file traefik/certs/dev-local-key.pem "traefik.localhost" "app.localhost" "api.localhost"

## Quick check for /etc/hosts entries
hosts-check:
	@grep -E "app\.localhost|api\.localhost|traefik\.localhost" /etc/hosts || true