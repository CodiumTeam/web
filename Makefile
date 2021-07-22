# cat -e -t -v Makefile
define HELP
Valid commands are:
    - up: Start the server
    - down: Stop the server
    - build: Install the dependencies and run the build
    - FILE_PATH=<path> convert: Adjust the customer logo to the required format

 Please execute "make <command>". Example make servers-restart

endef

export HELP
help:
	@printf "$$HELP"

DOCKER_COMMAND = docker run --rm -u $(shell id -u) -v ${PWD}:/code -w /code
DOCKER_PHP_IMAGE = php:8.0
DOCKER_COMPOSER_IMAGE = composer:2.1
DOCKER_IMAGEMAGICK_IMAGE = dpokidov/imagemagick:7.0.10-9

.PHONY: up
up:
	$(DOCKER_COMMAND) --name codium_web -p 8000:8000 -d $(DOCKER_PHP_IMAGE) php -S 0.0.0.0:8000
	@echo "http://localhost:8000/index.php http://localhost:8000/curso-tdd.php http://localhost:8000/curso-legacy-code.php http://localhost:8000/curso-docker.php\n"
	@echo "http://webcodium:8000/index.php http://webcodium:8000/curso-tdd.php http://webcodium:8000/curso-legacy-code.php http://webcodium:8000/curso-docker.php\n"

.PHONY: down
down:
	docker stop codium_web

.PHONY: build
build:
	$(DOCKER_COMMAND) $(DOCKER_COMPOSER_IMAGE) composer install
	git config --local core.hooksPath git-hooks/
	make just-build

.PHONY: just-build
just-build:
	$(DOCKER_COMMAND) $(DOCKER_PHP_IMAGE) sh build.sh

.PHONY: convert
convert:
	$(DOCKER_COMMAND) $(DOCKER_IMAGEMAGICK_IMAGE) $(FILE_PATH) -resize 245x155 -size 255x161 xc:white +swap -gravity center -composite $(FILE_PATH)
