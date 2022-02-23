FROM debian:stretch-slim

MAINTAINER Evgenii Panov <ev.panov@gmail.com>

ENV	DEBIAN_FRONTEND noninteractive
ENV IMAGE_PHP_VERSION=8.1

RUN	apt-get update -yqq \
    && apt-get upgrade -yqq \
    && apt-get install -yqq supervisor gnupg

RUN	apt-get install -yqq \
        git wget curl

RUN apt-get install -yqq apt-transport-https lsb-release ca-certificates \
    && wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg \
    && echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/php.list

RUN apt-get update -yqq \
    && apt-get install -yqq \
        php${IMAGE_PHP_VERSION} \
        php${IMAGE_PHP_VERSION}-common \
        php${IMAGE_PHP_VERSION}-fpm \
        php${IMAGE_PHP_VERSION}-cli \
        php${IMAGE_PHP_VERSION}-pdo \
        php${IMAGE_PHP_VERSION}-ldap \
        php${IMAGE_PHP_VERSION}-bcmath \
        php${IMAGE_PHP_VERSION}-curl \
        php${IMAGE_PHP_VERSION}-mysqlnd \
        php${IMAGE_PHP_VERSION}-sqlite \
        php${IMAGE_PHP_VERSION}-xml \
        php${IMAGE_PHP_VERSION}-zip zip unzip \
        php${IMAGE_PHP_VERSION}-mbstring \
        php${IMAGE_PHP_VERSION}-gd \
        php${IMAGE_PHP_VERSION}-redis

# ERROR: Unable to create the PID file (/run/php/php8.0-fpm.pid).: No such file or directory
RUN mkdir /run/php

RUN  curl -sL https://deb.nodesource.com/setup_current.x | bash - \
    && apt-get purge -y nodejs npm \
    && apt-get install -y nodejs build-essential \
    && npm install -g gulp \
    && npm install -g bower \
    && npm install -g less \
    && npm install -g sass \
    && npm install -g serve

RUN apt-get clean

RUN sed -i "s/^listen =.*$/listen = 9000/g" /etc/php/${IMAGE_PHP_VERSION}/fpm/pool.d/www.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# for token see: https://github.com/settings/tokens
RUN /usr/local/bin/composer config -g github-oauth.github.com b665522127f436401e3814755cb0863aa39cfb22

ADD config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ARG APPLICATION_ROOT_PATH
RUN sed -i "s/%APPLICATION_ROOT_PATH%/$(echo $APPLICATION_ROOT_PATH | sed "s/\//\\\\\//g")/g" /etc/supervisor/conf.d/supervisord.conf

RUN apt-get clean -y

RUN usermod -u 1000 www-data

CMD ["/usr/bin/supervisord"]