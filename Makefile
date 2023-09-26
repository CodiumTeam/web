# cat -e -t -v Makefile
DOCKER_COMMAND = docker run --rm -u $(shell id -u) -v ${PWD}:/code -w /code
DOCKER_NODE_IMAGE = node:16
DOCKER_CYPRESS = $(DOCKER_COMMAND) --ipc=host --add-host host.docker.internal:host-gateway --entrypoint cypress cypress/included:6.2.1 run \

.PHONY: default
default: start

.PHONY: up
up: build
	@echo "\n"
	@echo "http://localhost:8000/index.html http://localhost:8000/curso-tdd.html http://localhost:8000/curso-legacy-code.html http://localhost:8000/curso-docker.html\n"
	@echo "TIP: Use CTRL+Click to open a link in a browser\n"
	@echo "To view the style guide\n"
	@echo "http://localhost:8000/style-guide.html"


.PHONY: down
down:
	docker stop codium_web

.PHONY: install
install:
	$(DOCKER_COMMAND) $(DOCKER_NODE_IMAGE) npm install
	git config --local core.hooksPath git-hooks/

.PHONY: lint
lint:
	$(DOCKER_COMMAND) -v ${HOME}/.gitconfig:/home/node/.gitconfig:ro $(DOCKER_NODE_IMAGE) sh lint.sh

start:
	$(DOCKER_COMMAND) -it --name codium_web_new -p 3000:3000 $(DOCKER_NODE_IMAGE) npm run start

stop:
	docker stop codium_web_new

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
