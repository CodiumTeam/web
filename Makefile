# cat -e -t -v Makefile
DOCKER_COMMAND = docker run --rm -u $(shell id -u) -v ${PWD}:/code -w /code
DOCKER_NODE_IMAGE = node:16
DOCKER_CYPRESS = $(DOCKER_COMMAND) --ipc=host --add-host host.docker.internal:host-gateway --entrypoint cypress cypress/included:6.2.1 run \

.PHONY: default
default: start

.PHONY: install
install:
	$(DOCKER_COMMAND) $(DOCKER_NODE_IMAGE) npm install
	git config --local core.hooksPath git-hooks/

.PHONY: lint
lint:
	./scripts/dump-git-config.sh /tmp/docker-git-cfg
	$(DOCKER_COMMAND) -v /tmp/docker-git-cfg:/home/node/.gitconfig:ro $(DOCKER_NODE_IMAGE) sh scripts/lint.sh

start:
	$(DOCKER_COMMAND) -it --name codium_web -p 3000:3000 $(DOCKER_NODE_IMAGE) npm run start

build:
	$(DOCKER_COMMAND) $(DOCKER_NODE_IMAGE) npm run build

test:
	$(DOCKER_CYPRESS) --config baseUrl=http://host.docker.internal:3000

test-email:
	$(DOCKER_COMMAND) --ipc=host \
		--add-host host.docker.internal:host-gateway \
		--entrypoint cypress \
		cypress/included:6.2.1 run \
		--config baseUrl=http://host.docker.internal:3000
