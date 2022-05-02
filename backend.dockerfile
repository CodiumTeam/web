FROM composer:2.1 as builder
WORKDIR /dependecies
COPY composer.lock composer.json ./
RUN composer install

FROM php:8.0
WORKDIR /code
RUN mkdir -p dist
COPY --from=builder /dependencies/dist/vendor /code/dist/vendor
COPY public/ dist

CMD ["php", "-S", "0.0.0.0:8000", "-t", "dist/"]