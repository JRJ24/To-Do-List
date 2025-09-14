# To-Do List — Frontend (client/to-do-list)
Este repositorio contiene la parte cliente de una aplicación "To-Do List". Está construido con Vite y soporta componentes en React y Vue (el proyecto incluye dependencias y plugins para ambas tecnologías).

## Descripción

Frontend para una aplicación de lista de tareas. El objetivo es proporcionar una interfaz para registrarse/login y gestionar tareas (crear, listar, actualizar, eliminar). El proyecto incluye recursos estáticos y configuración para desarrollo rápido con Vite.

## Estructura del proyecto (resumen)

- `index.html` — punto de entrada principal.
- `LoginRegister.html` — página de login/registro usada por el script `dev`.
- `src/` — código fuente del cliente:
	- `main.jsx`, `main.js`, `App.jsx` — entradas y componentes React.
	- `login&register.vue` — componente Vue para vistas de login/registro.
	- `assets/` — imágenes y recursos estáticos.
	- `config/index.js` — configuración compartida para el cliente.
	- `scss/` — estilos Sass.
- `public/` — archivos públicos (no procesados por Vite).
- `package.json` — scripts y dependencias.

## Requisitos

- Node.js (recomendado v18+)
- npm o pnpm/yarn

Nota: El proyecto usa Vite; verifica la versión de Node si encuentras problemas.

## Scripts disponibles

Los scripts definidos en `package.json` son:

- `dev`: Inicia el servidor de desarrollo de Vite y abre `LoginRegister.html` en el navegador.
	- Comando: `vite --open /LoginRegister.html`
- `build`: Genera una versión de producción con Vite.
	- Comando: `vite build`
- `preview`: Sirve la build de producción localmente.
	- Comando: `vite preview`
- `lint`: Ejecuta ESLint en el proyecto.
	- Comando: `eslint .`

Ejemplos para ejecutar:

```powershell
npm run dev
npm run build
npm run preview
npm run lint
```

## Variables de entorno

Este proyecto incluye `dotenv` como dependencia — puedes añadir un archivo `.env` en la raíz de `client/to-do-list` para variables de entorno que quieras usar en el cliente (por ejemplo, URL del backend):

Ejemplo `.env`:

```
VITE_API_URL=http://localhost:3000
```

Nota: En Vite las variables públicas deben empezar con `VITE_` para ser expuestas al código cliente.

## Despliegue

El proyecto se encuentra desplegado en Vercel y funciona como un web service, lo que permite acceder a la aplicación directamente desde la nube sin necesidad de infraestructura propia.

https://to-do-list-drab-beta-20.vercel.app/LoginRegister.html


## Contribuciones

1. Haz un fork del repositorio.
2. Crea una rama con la mejora: `git checkout -b feat/mi-cambio`.
3. Realiza cambios y escribe pruebas si procede.
4. Abre un Pull Request describiendo los cambios.

## Notas y recomendaciones

- El proyecto tiene dependencias tanto para React como para Vue; elige la stack que usarás y elimina lo innecesario si quieres simplificar.
- Asegúrate de que la API backend (carpeta `backend/` del repositorio) esté corriendo y que `VITE_API_URL` apunte a ella si usas llamadas reales.
- Usa `npm run lint` antes de abrir un PR para mantener la consistencia del código.

## Licencia

Este código está bajo la licencia MIT.




