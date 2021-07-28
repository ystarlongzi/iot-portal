FROM registry.shdocker.tuya-inc.top/mirror/nginx:1.15.0

WORKDIR /www
ADD ./.docker/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /www
COPY ./dist .

RUN chmod -R 755 /www
