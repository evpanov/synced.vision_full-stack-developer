FROM debian:stretch-slim

MAINTAINER Evgenii Panov <ev.panov@gmail.com>

ENV  DEBIAN_FRONTEND noninteractive

RUN  apt-get update -yqq \
    && apt-get upgrade -yqq \
    && apt-get install -yqq supervisor

RUN  apt-get install -yqq nginx \
    && apt-get clean

ADD config/sites.nginx.conf /etc/nginx/sites-enabled/sites.nginx.conf
ADD config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN rm -f /etc/nginx/sites-enabled/default

ARG NGINX_ROOT_PATH
ARG PHP_FPM_HOST
RUN sed -i "s/%NGINX_ROOT_PATH%/$(echo $NGINX_ROOT_PATH | sed "s/\//\\\\\//g")/g" /etc/nginx/sites-enabled/sites.nginx.conf \
    && sed -i "s/%PHP_FPM_HOST%/$(echo $PHP_FPM_HOST | sed "s/\//\\\\\//g")/g" /etc/nginx/sites-enabled/sites.nginx.conf

RUN usermod -u 1000 www-data

CMD ["/usr/bin/supervisord"]