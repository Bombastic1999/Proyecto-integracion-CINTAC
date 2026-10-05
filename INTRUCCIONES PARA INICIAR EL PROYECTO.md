# Instalación e inicio del proyecto

El proyecto tiene un backend Django y un frontend React con Vite. Necesitas tener instalados Python, Node.js y npm.

## Backend (Django)

Abre PowerShell en la carpeta `cintac-proyecto` y ejecuta:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install Django djangorestframework django-cors-headers python-dotenv dj-database-url
```

El backend lee la variable `DATABASE_URL` desde el archivo `.env` en la raíz del proyecto. Asegúrate de que ese archivo exista y tenga una URL válida para la base de datos que usarás. Si la base de datos es PostgreSQL, instala también su controlador:

```powershell
python -m pip install "psycopg[binary]"
```

Aplica las migraciones y arranca el servidor:

```powershell
python manage.py migrate
python manage.py runserver
```

El backend queda disponible, por defecto, en `http://127.0.0.1:8000`.

## Frontend (React + Vite)

Abre otra ventana de PowerShell y ejecuta:

```powershell
Set-Location .\frontend
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local del frontend (normalmente `http://localhost:5173`).

## Próximas veces

No necesitas recrear el entorno virtual ni volver a instalar las dependencias. En una ventana de PowerShell, desde la raíz:

```powershell
.\.venv\Scripts\Activate.ps1
python manage.py runserver
```

En otra ventana:

```powershell
Set-Location .\frontend
npm run dev
```

Si PowerShell bloquea la activación del entorno virtual, ejecuta `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` en esa ventana y vuelve a activar `.venv`.
