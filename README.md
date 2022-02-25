# synced.vision_full-stack-developer

1. cd docker/environments/development
2. docker-compose up -d
3. docker exec -it synced_vision__full-stack-developer-php_fpm bash
4. cd /opt/application
5. composer install
6. cp .env.development .env
7. php ./artisan migrate
8. npm install
9. npm run dev
10. http://127.0.0.1:22080/