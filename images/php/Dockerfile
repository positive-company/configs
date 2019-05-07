FROM composer
RUN apk update
RUN apk add postgresql-dev
RUN apk add icu-dev
RUN docker-php-ext-install pdo
RUN docker-php-ext-install pdo_pgsql
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install intl
RUN docker-php-ext-install exif
