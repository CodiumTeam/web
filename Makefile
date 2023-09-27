# cat -e -t -v Makefile
DOCKER_COMMAND = docker run --rm -u $(shell id -u) -v ${PWD}:/code -w /code

.PHONY: default
default: start

.PHONY: install
install:
	docker compose run web npm install
	git config --local core.hooksPath git-hooks/

.PHONY: lint
lint:
	docker compose run -T web sh scripts/lint.sh

.PHONY: start
start:
	docker compose up

.PHONY: clean
clean:
	rm -rf dist/

dist:
	docker compose build web
	docker compose run -T -v /code/node_modules web npm run build

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
