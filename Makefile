# cat -e -t -v Makefile
define HELP
Valid commands are:
    - up: Start the server
    - build: Install the dependencies and run the build
    - FILE_PATH=<path> convert: Adjust the customer logo to the required format

 Please execute "make <command>". Example make servers-restart

endef

export HELP
help:
	@printf "$$HELP"

DOCKER_COMMAND = docker run --rm -u $(shell id -u) -v ${PWD}:/code -w /code
DOCKER_PHP_IMAGE = php:7.4
DOCKER_COMPOSER_IMAGE = composer:1.10
DOCKER_IMAGEMAGICK_IMAGE = dpokidov/imagemagick:7.0.10-9

up:
	$(DOCKER_COMMAND) -p 8000:8000 -d $(DOCKER_PHP_IMAGE) php -S 0.0.0.0:8000

build:
	$(DOCKER_COMMAND) $(DOCKER_COMPOSER_IMAGE) composer install
	$(DOCKER_COMMAND) $(DOCKER_PHP_IMAGE) sh build.sh

convert:
	$(DOCKER_COMMAND) $(DOCKER_IMAGEMAGICK_IMAGE) $(FILE_PATH) -resize 245x155 -size 255x161 xc:white +swap -gravity center -composite $(FILE_PATH)
