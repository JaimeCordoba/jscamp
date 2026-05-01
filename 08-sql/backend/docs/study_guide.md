# Guía de Estudio: Entendiendo el Backend Paso a Paso

Para comprender este proyecto sin explotar, te recomiendo seguir el orden de los cimientos al tejado. No intentes entender el servidor (`app.ts`) sin saber qué datos guarda la base de datos.

## Paso 1: El Manifiesto (`package.json`)

- **Por qué**: Aquí ves las dependencias. Si ves `express`, sabes que hay rutas. Si ves `better-sqlite3`, sabes que hay disco local. Es el inventario del proyecto.

## Paso 2: El Suelo (`db/database.ts` y `seed.ts`)

- **Por qué**: Todo backend gira en torno a los datos. Mira el `seed.ts` para ver cómo se llaman las tablas y qué columnas tienen. Si no conoces la DB, el código te parecerá magia negra.

## Paso 3: El Diccionario y las Leyes (`types.ts` y `schemas/`)

- **Por qué**: Define el lenguaje común. Qué campos son strings, qué campos son obligatorios. Es la base de la seguridad del sistema.

## Paso 4: El Escriba (`models/`)

- **Por qué**: Es la primera capa de código real. Aquí verás cómo el SQL se convierte en objetos que JavaScript entiende. Es lógica pura de base de datos.

## Paso 5: El Mapa de Entradas (`routes/`)

- **Por qué**: Aquí ves la "cara pública". Sabes qué endpoints existen (`/jobs`, `/jobs/:id`). Es el índice de servicios que ofrece tu API.

## Paso 6: La Frontera (`middlewares/`)

- **Por qué**: Verás cómo se filtran las peticiones antes de que lleguen a la lógica. Es la capa de protección.

## Paso 7: El Cerebro Operativo (`controllers/`)

- **Por qué**: Aquí ocurre la magia. El controlador coge datos de la petición, llama al modelo y devuelve una respuesta. Es donde todo el conocimiento previo se junta.

## Paso 8: El Encendido (`app.ts`)

- **Por qué**: Es la pieza final del puzle. Aquí verás cómo se configura Express para usar todo lo anterior y empezar a escuchar en el portal 3000.

---

> [!TIP]
> Si te pierdes, vuelve al **Paso 2**. El 90% de los problemas en el backend son porque no entendemos bien cómo están estructurados los datos en la base de datos.
