# synced.vision_full-stack-developer

1. cd docker/environments/development
2. docker-compose up -d
3. docker exec -it synced_vision__full-stack-developer-php_fpm bash
4. cd /opt/application
5. composer install
6. php ./artisan migrate
7. npm install
8. npm run dev
9. http://127.0.0.1:22080/