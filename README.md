## Backend de Gamepedia 🎮

Este proyecto corresponde al backend de **Gamepedia**, una aplicación donde los usuarios pueden explorar videojuegos, ver sus detalles, realizar búsquedas y agregar nuevos juegos a la base de datos. El backend proporciona operaciones CRUD para gestionar videojuegos y géneros, además de soporte para filtrado y búsqueda.

### Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios (para consumo de la API externa de RAWG)

### Instrucciones de Uso

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/LeandroLicata/PI-Videogames-Backend
   cd PI-Videogames-Backend
   ```

2. Instala las dependencias usando npm:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

   ```env
   PORT=3001
   MONGODB_URI=tu_uri_de_conexion_a_mongodb
   API_KEY=tu_clave_de_api_de_rawg
   ```

   Podés obtener tu API key gratuita desde: https://rawg.io/apidocs.

   Para la base de datos, podés crear una cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) y generar un URI de conexión para usar como valor de `MONGODB_URI`.

5. Inicia el servidor:

   ```bash
   npm start
   ```

   O si prefieres usar nodemon para desarrollo:

   ```bash
   npm run dev
   ```

### Endpoints Disponibles

#### Videojuegos

- `GET /videogames`: Obtiene todos los videojuegos, incluyendo los de la API externa y la base de datos.
- `GET /videogames/:id`: Obtiene un videojuego por su ID (puede ser de la API o la DB).
- `GET /videogames?name=...`: Busca videojuegos por nombre.
- `POST /videogames`: Crea un nuevo videojuego en la base de datos.
- `PUT /videogames/:id`: Actualiza la información de un videojuego existente en la base de datos según su ID.
- `DELETE /videogames/:id`: Elimina un videojuego de la base de datos según su ID. Solo afecta a los juegos creados por el usuario (no a los de la API).

#### Géneros

- `GET /genres`: Devuelve todos los géneros almacenados en la base de datos.
Si la base de datos no contiene géneros, los obtiene desde la API externa de RAWG, los guarda localmente y luego los devuelve.

#### Plataformas

- `GET /platforms`: Devuelve todas las plataformas almacenadas en la base de datos.
Si no existen, las obtiene desde la API de RAWG, las almacena en la base de datos y luego las retorna.

### Notas Adicionales

- El proyecto consume datos de la [API pública de RAWG](https://rawg.io/apidocs), por lo que es necesario contar con una API key válida.
- Los videojuegos creados mediante `POST /videogames` se almacenan localmente en la base de datos y pueden tener uno o varios géneros y plataformas asociados.
