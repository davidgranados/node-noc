# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

# dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

APP_ENV="dev"
```

3. Ejecutar `npm install`

5. Levantar las bases de datos con el comando
    ```
    docker-compose up -d
    ```

6. Ejecuta `npx prisma migrate dev`

7. Ejecutar `npm run dev`
