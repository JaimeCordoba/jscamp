# Guía de Comandos de Docker

Esta guía recopila y organiza de manera lógica todos los comandos de Docker y herramientas relacionadas mencionados en los registros de aprendizaje del **14, 16 y 17 de julio de 2026**.

---

## 1. Información y Verificación del Sistema

Comandos para comprobar el estado de la instalación de Docker y obtener información detallada del sistema y los recursos utilizados.

- `docker --version`
  - **Descripción:** Muestra la versión instalada de la interfaz de línea de comandos (CLI) de Docker.
- `docker compose version`
  - **Descripción:** Comprueba si Docker Compose está instalado y muestra su versión actual.
- `docker info`
  - **Descripción:** Muestra información general y detallada del sistema de Docker Engine (número de contenedores, imágenes, CPUs, RAM asignada, etc.).
- `docker system df`
  - **Descripción:** Proporciona un desglose detallado del uso de espacio en disco ocupado por imágenes, contenedores, volúmenes y la caché de construcción.

---

## 2. Inicialización y Automatización

- `docker init`
  - **Descripción:** Lanza un asistente interactivo en la terminal que analiza el proyecto actual para generar de forma automatizada y con mejores prácticas los archivos de configuración iniciales: `Dockerfile`, `.dockerignore` y `compose.yaml`.

---

## 3. Construcción de Imágenes

Comandos dedicados a compilar y crear imágenes personalizadas a partir de un `Dockerfile`.

- `docker build -t <nombre-imagen> .`
  - **Descripción:** Construye una imagen de Docker utilizando el `Dockerfile` ubicado en el directorio actual (`.`) y le asigna una etiqueta o nombre (`-t`).
  - _Ejemplo:_ `docker build -t hola-docker .`
- `docker build -f <archivo-dockerfile> -t <etiqueta> <contexto>`
  - **Descripción:** Construye una imagen especificando un archivo Dockerfile personalizado o alternativo (usando `-f`) en lugar del valor por defecto.
  - _Ejemplo:_ `docker build -f Dockerfile.vercel -t mi-app-vercel .`

---

## 4. Gestión de Imágenes

Comandos para buscar, listar y preparar imágenes para su posterior almacenamiento o publicación en registros.

- `docker images`
  - **Descripción:** Lista todas las imágenes de Docker que se encuentran descargadas o construidas en el almacenamiento local de tu máquina.
- `docker search <nombre-imagen>`
  - **Descripción:** Busca imágenes disponibles en el registro público de Docker Hub directamente desde la terminal.
- `docker tag <imagen-origen> <imagen-destino>`
  - **Descripción:** Genera una nueva etiqueta (alias o referencia) para una imagen existente en local. Útil para renombrar imágenes y prepararlas para publicación.
  - _Ejemplo:_ `docker tag mi-app:latest mi-usuario/mi-app:1.0.0`
- `docker push <usuario>/<imagen>:<tag>`
  - **Descripción:** Sube una imagen local previamente etiquetada a tu repositorio en Docker Hub.

---

## 5. Ejecución y Control de Contenedores (`docker run`)

Comandos para instanciar e iniciar contenedores basados en imágenes con diferentes configuraciones de ejecución.

### Ejecución Básica

- `docker run <nombre-imagen>`
  - **Descripción:** Crea e inicia un contenedor a partir de la imagen especificada. Si la imagen no está en local, la descarga automáticamente de Docker Hub.
  - _Ejemplo:_ `docker run hello-world`
- `docker run --rm <nombre-imagen>`
  - **Descripción:** Ejecuta el contenedor y garantiza que este sea eliminado automáticamente del disco una vez finalice su proceso principal. Evita la acumulación de contenedores huérfanos/detenidos.

### Modo Interactivo y Ejecución de Comandos

- `docker run --rm -it <nombre-imagen> <comando-shell>`
  - **Descripción:** Inicia el contenedor en modo interactivo (`-i` de entrada estándar interactiva y `-t` para emular una consola/TTY).
  - _Ejemplo (REPL interactivo):_ `docker run --rm -it python:3.12`
  - _Ejemplo (Shell de S.O.):_ `docker run --rm -it ubuntu bash`
- `docker run --rm <nombre-imagen> <comando>`
  - **Descripción:** Ejecuta un comando único y puntual dentro del contenedor y lo destruye de inmediato.
  - _Ejemplo:_ `docker run --rm node:22 node --version`

### Configuración Avanzada (Redes, Entorno y Volúmenes)

- `docker run -d <nombre-imagen>`
  - **Descripción:** Ejecuta el contenedor en segundo plano (modo desacoplado o _detached_), devolviendo el ID único del contenedor en la terminal.
- `docker run -p <puerto-host>:<puerto-contenedor> <nombre-imagen>`
  - **Descripción:** Mapea un puerto de la máquina anfitriona (host) al puerto expuesto dentro del contenedor.
  - _Ejemplo:_ `docker run -p 5002:3000 hola-docker`
- `docker run -e CLAVE="valor" <nombre-imagen>`
  - **Descripción:** Inyecta una variable de entorno individual al contenedor para configurar comportamientos en tiempo de ejecución.
  - _Ejemplo:_ `docker run -e NODE_ENV="production" mi-app`
- `docker run --env-file <ruta-archivo-env> <nombre-imagen>`
  - **Descripción:** Inyecta múltiples variables de entorno leyendo de manera directa un archivo local (generalmente `.env`).
- `docker run -v <volumen-o-ruta-host>:<ruta-contenedor> <nombre-imagen>`
  - **Descripción:** Ejecuta un contenedor montando un volumen persistente o un directorio de la máquina local (_Bind Mount_).
  - _Ejemplo (Bind Mount para desarrollo):_ `docker run -v ${pwd}:/app mi-app`

---

## 6. Monitoreo y Estado de Contenedores

Comandos para controlar y ver el estado de los contenedores que se encuentran en el sistema.

- `docker ps`
  - **Descripción:** Muestra una lista de todos los contenedores que se están ejecutando activamente en ese momento.
- `docker ps -a`
  - **Descripción:** Lista todos los contenedores en el host, incluyendo los que están activos y aquellos que se detuvieron o finalizaron.
- `docker logs <container-id>`
  - **Descripción:** Muestra el historial completo de la salida estándar (logs) de un contenedor específico.
- `docker logs -f <container-id>`
  - **Descripción:** Sigue los logs de un contenedor en tiempo real (_follow_), refrescando la pantalla a medida que se producen nuevos eventos.
- `docker stop <container-id>`
  - **Descripción:** Detiene de forma controlada y segura un contenedor en ejecución mediante el envío de una señal de parada.

---

## 7. Persistencia (Volúmenes)

Comandos para administrar el almacenamiento persistente gestionado por Docker independientemente de la vida de los contenedores.

- `docker volume create <nombre-volumen>`
  - **Descripción:** Crea un volumen lógico nuevo gestionado enteramente por Docker para persistir información (ej. bases de datos).
- `docker volume rm <nombre-volumen>`
  - **Descripción:** Elimina definitivamente un volumen específico del disco.

---

## 8. Mantenimiento y Limpieza del Sistema

Comandos de mantenimiento para liberar espacio en disco del sistema anfitrión.

- `docker system prune`
  - **Descripción:** Elimina de forma segura la caché de construcción obsoleta, las redes no utilizadas y todos los contenedores que están detenidos.
- `docker system prune -a`
  - **Descripción:** Realiza una limpieza profunda eliminando contenedores detenidos, redes, caché de construcción y **todas** las imágenes que no estén siendo utilizadas por ningún contenedor activo.
    > [!WARNING]
    > Usa este comando con precaución, ya que obligará a descargar o reconstruir tus imágenes la próxima vez que las requieras.

---

## 9. Modelos de Inteligencia Artificial (`docker model`)

Comandos para la gestión y ejecución de modelos de IA locales compatibles con la API de OpenAI.

- `docker model search <nombre>`
  - **Descripción:** Busca modelos de inteligencia artificial disponibles dentro del catálogo nativo de Docker.
- `docker model pull <modelo>`
  - **Descripción:** Descarga localmente un modelo de IA específico (por ejemplo, `smollm2`).
- `docker model list`
  - **Descripción:** Muestra los modelos de inteligencia artificial instalados localmente y sus detalles técnicos.
- `docker model run <modelo>`
  - **Descripción:** Inicia el modelo de IA seleccionado para chatear interactivamente con él a través de la terminal.

---

## 10. Despliegue en la Nube (Vercel CLI)

Herramientas externas para configurar y desplegar contenedores directamente a Vercel.

- `npm install -g vercel`
  - **Descripción:** Instala de forma global en tu equipo la interfaz de comandos oficial de Vercel.
- `vercel login`
  - **Descripción:** Inicia sesión y autentica la CLI de Vercel con tu cuenta.
- `vercel`
  - **Descripción:** Lanza el proceso automático de detección, compilación y despliegue del proyecto actual a los servidores de Vercel.

---

## 11. Comandos Adicionales de Uso Cotidiano (Extras)

> [!NOTE]
> Estos comandos **no aparecen explícitamente en el material del curso "JSCAMP"**, pero se añaden aquí como recursos extra por ser de uso extremadamente común y útil en el desarrollo diario con Docker.

### Depuración en Contenedores Activos

- `docker exec -it <container-id> bash` (o `sh`)
  - **Descripción:** Abre una sesión interactiva de terminal (`bash` o `sh`) dentro de un contenedor que **ya se encuentra en ejecución**. Es el comando principal para inspeccionar el estado interno de la aplicación y depurar fallos en vivo.

### Limpieza y Gestión Manual

- `docker rm <container-id>`
  - **Descripción:** Elimina del sistema un contenedor específico que ya ha sido detenido.
- `docker rmi <image-id>`
  - **Descripción:** Elimina una imagen Docker específica que se encuentra almacenada localmente en la máquina.

### Orquestación Local con Docker Compose

- `docker compose up -d`
  - **Descripción:** Crea, inicia y asocia todos los servicios descritos en el archivo de configuración `compose.yaml` (o `docker-compose.yml`) ejecutándose en segundo plano (`-d`).
- `docker compose down`
  - **Descripción:** Detiene todos los servicios activos del archivo Compose y elimina de forma limpia los contenedores y redes asociadas creadas por `up`.

### Inspección de Recursos

- `docker inspect <container-id o image-id>`
  - **Descripción:** Devuelve información extremadamente detallada y de bajo nivel (en formato JSON) sobre la configuración, red, volumen y estado de un contenedor o imagen específica.
