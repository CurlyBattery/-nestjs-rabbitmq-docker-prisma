# Для запуска миграций: 
> ``docker-compose -f ./docker-compose.migrate.yaml --env-file ./apps/consumer/.env up --abort-on-container-exit``
---
# Когда нужно изменить бд:
## Если в бд есть данные ##
1) в [docker-compose.migrate.yaml](docker-compose.migrate.yaml) меняем <br/>
*```npx prisma migrate dev --name ${PRISMA_MIGRATION_NAME}```* <br/>
на <br/>
*```npx prisma migrate reset --force```*
2) Запускаем ```docker-compose -f ./docker-compose.migrate.yaml --env-file ./apps/consumer/.env up --abort-on-container-exit```

## Если в бд нет данных ##
1) Просто запускаем ```docker-compose -f ./docker-compose.migrate.yaml --env-file ./apps/consumer/.env up --abort-on-container-exit```

## Если режим разработки бд
1)  Можно использовать ```npx prisma db push``` вместо ```npx prisma migrate dev --name ${PRISMA_MIGRATION_NAME}```
---
# Для запуска приложения:
> ``docker-compose  --env-file ./apps/consumer/.env up``