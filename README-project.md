
###PROJECT_NAME###
======

#### Dev-окружение
* Запуск dev-окружения:
```bash
./build/run-dev
```

* Накатить миграции:
```bash
docker exec -ti ###PROJECT_NAME###-api sh
./node_modules/.bin/node-pg-migrate up
```
