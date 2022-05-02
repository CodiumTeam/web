# cat -e -t -v Makefile
define HELP
Valid commands are:
    - up: Start the server
    - down: Stop the server
    - install: Install the dependencies
    - FILE_PATH=<path> convert: Adjust the customer logo to the required format
		- test: Run cypress tests. Server should be running at http://localhost:3000

 Please execute "make <command>". Example make servers-restart

endef

export HELP
help:
	@printf "$$HELP"

DOCKER_COMMAND = docker run --rm -u $(shell id -u) -v ${PWD}:/code -w /code
DOCKER_PHP_IMAGE = php:8.0
DOCKER_NODE_IMAGE = node:16
DOCKER_COMPOSER_IMAGE = composer:2.1
DOCKER_CYPRESS = $(DOCKER_COMMAND) --ipc=host --add-host host.docker.internal:host-gateway --entrypoint cypress cypress/included:6.2.1 run \

.PHONY: up
up: build
	$(DOCKER_COMMAND) --name codium_web -p 8000:8000 -d  $(DOCKER_PHP_IMAGE) php -S 0.0.0.0:8000 -t dist/
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
	$(DOCKER_COMMAND) $(DOCKER_COMPOSER_IMAGE) composer install
	$(DOCKER_COMMAND) $(DOCKER_NODE_IMAGE) npm install
	git config --local core.hooksPath git-hooks/

.PHONY: lint
lint:
		$(DOCKER_COMMAND) -v ${HOME}/.gitconfig:/home/node/.gitconfig:ro $(DOCKER_NODE_IMAGE) sh lint.sh

start:
	$(DOCKER_COMMAND) -it --name codium_web_new -p 3000:3000 $(DOCKER_NODE_IMAGE) npm run start

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
