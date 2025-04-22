# cat -e -t -v Makefile
DOCKER_COMMAND = docker run --rm -u $(shell id -u) -v ${PWD}:/code -w /code

.PHONY: default
default: up

.PHONY: install
install: .dependencies
	git config --local core.hooksPath .githooks/

.PHONY: lint
lint:
	docker compose run -T web sh scripts/lint.sh

.PHONY: up
up: .dependencies
	docker compose up --remove-orphans

.PHONY: clean
clean:
	rm -rf dist/

.PHONY: dist
dist:
	docker compose build web
	docker compose run -T -v /code/node_modules web npm run build

.PHONY: run-production
run-production: dist
	docker run --rm -v ${PWD}/dist:/usr/share/nginx/html -p 3000:80 nginx

.PHONY: get-cypress-version
get-cypress-version:
	$(eval CYPRESS_VERSION=$(shell docker compose run web npm list cypress --depth=0 -p -l | cut -d'@' -f2))

.PHONY: test
test: get-cypress-version
	$(DOCKER_COMMAND) --ipc=host \
		--add-host host.docker.internal:host-gateway \
		--entrypoint cypress \
		cypress/included:$(CYPRESS_VERSION) run \
		--config baseUrl=http://host.docker.internal:3000

.PHONY: test-email
test-email: get-cypress-version
	$(DOCKER_COMMAND) --ipc=host \
		--add-host host.docker.internal:host-gateway \
		--entrypoint cypress \
		cypress/included:$(CYPRESS_VERSION) run \
		--config baseUrl=http://host.docker.internal:3000

i18n-extract:
	docker compose run -T web npm run i18n:extract

.dependencies: package-lock.json
	docker compose run web npm install
	touch .dependencies