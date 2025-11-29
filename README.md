# 🛒 Wallapop Clone - Proyecto Final JavaScript

Aplicación web tipo marketplace similar a Wallapop, desarrollada con **Vanilla JavaScript** siguiendo el patrón **MVC** estricto.

---

## 👨‍💻 Autor
**Void (Víctor González)**  
---

## 🚀 Instalación y Configuración

### ⚠️ Importante: Backend y Frontend Separados
El backend (Sparrest) y el frontend (Wallapop Clone) deben estar en **carpetas separadas** para evitar conflictos.

---

### 1️⃣ Clonar el Repositorio del Proyecto (Frontend)
```bash
git clone https://github.com/Bitxogm/Guayapop-2025.git
cd Guayapop-2025
```

---

### 2️⃣ Configurar el Backend (En Carpeta Separada)

#### Opción A: Clonar Sparrest Fuera del Proyecto ⭐ (Recomendado)
```bash
# Volver al directorio padre
cd ..

# Clonar Sparrest en carpeta separada
git clone https://github.com/kasappeal/sparrest.js.git

# Entrar a Sparrest
cd sparrest.js
```
**Estructura resultante:**
```
📁 Mis_Proyectos/
├── 📁 Guayapop-2025/          ← Frontend
│   ├── index.html
│   ├── js/
│   └── db.json
└── 📁 sparrest.js/             ← Backend (SEPARADO)
    ├── package.json
    └── db.json (será reemplazado)
```

---

### 3️⃣ Reemplazar Base de Datos en Sparrest
```bash
# Estando dentro de sparrest.js/
rm db.json

# Copiar el db.json desde el proyecto Guayapop
# Linux/Mac:
cp ../Guayapop-2025/db.json .

# Windows (PowerShell):
copy ..\Guayapop-2025\db.json .

# Windows (CMD):
copy ..\Guayapop-2025\db.json .
```

**Verificar que el archivo se copió:**
```bash
# Linux/Mac:
ls -la db.json

# Windows:
dir db.json
```

---

### 4️⃣ Instalar Dependencias del Backend
```bash
# Estando dentro de sparrest.js/
npm install
```

---

### 5️⃣ Iniciar el Servidor Backend
```bash
npm start
```
**Dejar esta terminal abierta** - el backend debe estar corriendo mientras usas la aplicación.

---

### 6️⃣ Abrir el Frontend (En Nueva Terminal)
```bash
# Abrir NUEVA terminal/pestaña
cd Guayapop-2025

# Opción A: Usar Live Server de VSCode (Recomendado)
# Click derecho en index.html → "Open with Live Server"

# Opción B: Abrir directamente en navegador
# Doble click en index.html
```

---

## 📂 Estructura de Directorios (Correcta)
```
📁 Mis_Proyectos/
│
├── 📁 Guayapop-2025/                    ← FRONTEND
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── create-ad.html
│   ├── ad-detail.html
│   ├── edit-ad.html
│   ├── db.json                          ← Original (para copiar a Sparrest)
│   ├── README.md
│   └── js/
│       ├── controllers/
│       ├── models/
│       ├── views/
│       └── utils/
│
└── 📁 sparrest.js/                      ← BACKEND (SEPARADO)
    ├── db.json                          ← Copiado desde Guayapop-2025/
    ├── package.json
    ├── node_modules/
    └── index.js
```

---

## 🎯 Flujo de Trabajo

### Terminal 1: Backend
```bash
cd sparrest.js
npm start

# Mantener esta terminal abierta
# Verás logs de las peticiones HTTP
```

### Terminal 2: Frontend
```bash
cd Guayapop-2025

# Abrir con Live Server o navegador
```

---

## ⚠️ Errores Comunes y Soluciones

### ❌ "Error: Cannot find module 'json-server'"
**Causa:** No se instalaron las dependencias del backend

**Solución:**
```bash
cd sparrest.js
npm install
npm start
```

---

### ❌ "Error: Failed to fetch ads" en el frontend
**Causa:** Backend no está corriendo

**Solución:**
```bash
# En terminal separada
cd sparrest.js
npm start

# Verificar que está corriendo:
# Abrir http://localhost:8000/api/products en el navegador
```

---

## 🧪 Verificación de la Instalación

### 1️⃣ Backend Funcionando ✅
**En el navegador, abrir:** http://localhost:8000/api/products

**Deberías ver JSON con 30 anuncios:**
```json
[
  {
    "name": "iPad Air",
    "description": "Tablet Apple...",
    "price": 450,
    "type": "sell",
    "image": "https://...",
    "tags": ["electronics"],
    "userId": 1,
    "createdAt": "2024-11-...",
    "updatedAt": "2024-11-...",
    "id": 1
  },
  ...
]
```

**Si ves `[]` (array vacío):** El db.json no se copió correctamente.

---

### 2️⃣ Autenticación Funcionando ✅
**Prueba el endpoint de login:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1@gmail.com","password":"12345678"}'
```

**Deberías recibir:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "user1@gmail.com",
    "id": 1
  }
}
```

---

### 3️⃣ Frontend Funcionando ✅
**Abrir `index.html` en el navegador**

**Deberías ver:**
- ✅ Listado de 10 anuncios
- ✅ Paginación: "Page 1 of 3"
- ✅ Barra de búsqueda
- ✅ Filtros: Electronics, Furniture, Clothing, Books, Sports
- ✅ Navbar: Login / Signup
- ✅ Sin errores en consola (F12)

**Si ves errores:**
1. Verificar que el backend está corriendo (Terminal 1)
2. Verificar que no hay errores CORS en consola
3. Verificar la URL del backend en `js/utils/constants.js`:
```javascript
   apiUrl: 'http://localhost:8000'
```

---

## 🔧 Comandos Útiles

### Ver logs del backend en tiempo real
```bash
cd sparrest.js
npm start

# Verás algo como:
# GET /api/products 200 45.123 ms
# POST /auth/login 200 89.456 ms
```

### Verificar contenido de db.json
```bash
cd sparrest.js

# Linux/Mac:
cat db.json | jq '.products | length'  # Cantidad de anuncios
cat db.json | jq '.users | length'      # Cantidad de usuarios

# Windows PowerShell:
Get-Content db.json | ConvertFrom-Json | Select-Object -ExpandProperty products | Measure-Object
```

### Resetear base de datos
```bash
cd sparrest.js
cp ../Guayapop-2025/db.json .
npm start
```

---

## 👥 Usuarios de Prueba

El archivo `db.json` incluye **3 usuarios de prueba**:

| Email | Contraseña | Anuncios Propios |
|-------|-----------|------------------|
| `user1@gmail.com` | `12345678` | 10 anuncios |
| `user2@gmail.com` | `12345678` | 10 anuncios |
| `user3@gmail.com` | `12345678` | 10 anuncios |

**Total:** 30 anuncios en la base de datos inicial.

---

## ✅ Requisitos Obligatorios Implementados

### 1. Listado de Anuncios (index.html)
- ✅ Muestra nombre, descripción, precio, tipo (compra/venta) e imagen
- ✅ 4 estados gestionados: **vacío**, **error**, **carga**, **éxito**
- ✅ Toasts informativos en cada estado
- ✅ Click en anuncio → Navegación a detalle
- ✅ Botón "Create Ad" visible si usuario autenticado

### 2. Detalle de Anuncio (ad-detail.html)
- ✅ Muestra toda la información del anuncio
- ✅ 4 estados gestionados correctamente
- ✅ Botones **Edit** y **Delete** solo si eres el propietario
- ✅ Confirmación antes de eliminar
- ✅ Verificación de ownership robusta

### 3. Creación de Anuncio (create-ad.html)
- ✅ Formulario con todos los campos requeridos
- ✅ Validación HTML5 + JavaScript
- ✅ Protección: Solo usuarios autenticados
- ✅ Tags mediante checkboxes
- ✅ 3 estados: **carga**, **error**, **éxito**

### 4. Login (login.html)
- ✅ Autenticación con JWT
- ✅ Validación de email con regex
- ✅ 3 estados gestionados
- ✅ Almacenamiento seguro del token

### 5. Registro (signup.html)
- ✅ Formulario de registro funcional
- ✅ Validación de email
- ✅ 3 estados gestionados

---

## 🎁 Requisitos Opcionales Implementados (5/5)

### ✅ 1. Paginación
- 10 anuncios por página
- Botones **Previous** / **Next**
- Indicador "Page X of Y"
- Botones deshabilitados en primera/última página
- Reset a página 1 al crear/eliminar anuncio

### ✅ 2. Buscador
- Campo de búsqueda en el listado
- Búsqueda por nombre y descripción
- Búsqueda parcial (substring match)
- Botón **"Show All"** para limpiar búsqueda
- Funciona con **Enter** o click en botón

### ✅ 3. Editar Anuncio
- Solo propietarios pueden editar
- Formulario pre-rellenado con datos actuales
- Verificación triple de ownership
- Actualización con método PATCH
- Redirect a detalle después de editar

### ✅ 4. Tags Estáticos
- 5 categorías: Electronics, Furniture, Clothing, Books, Sports
- Implementado en formularios de crear/editar
- Almacenado como array en base de datos
- Múltiples tags por anuncio

### ✅ 5. Filtrado por Tags
- Botones de filtro por categoría en el listado
- Muestra solo anuncios con el tag seleccionado
- Botón **"Clear Filter"** para mostrar todos
- Compatible con paginación
- No compatible con búsqueda (se limpian mutuamente)

---

## 🏗️ Arquitectura del Proyecto

### Patrón MVC Estricto
```
js/
├── models/          → Comunicación con API (fetch)
│   ├── adsModel.js
│   ├── adDetailModel.js
│   ├── authModel.js
│   └── ...
├── views/           → Construcción de HTML
│   ├── adCard.view.js
│   ├── adDetail.view.js
│   ├── pagination.view.js
│   └── ...
├── controllers/     → Lógica de negocio
│   ├── ads.controller.js
│   ├── adDetail.controller.js
│   ├── session.controller.js
│   └── ...
├── utils/           → Constantes y helpers
│   ├── constants.js
│   
└── [página].js      → Entry points
    ├── index.js
    ├── login.js
    └── ...
```

### Sistema de Custom Events
- Comunicación entre capas mediante eventos personalizados
- Separación clara de responsabilidades
- Toasts y loaders controlados por eventos
- Desacoplamiento entre componentes


## 📦 Stack Tecnológico

### Frontend
- **Vanilla JavaScript ES6+** (Modules)
- **Bootstrap 5.3.0** (Diseño responsive)
- **Bootstrap Icons** (Iconografía)
- **Patrón MVC** estricto
- **Custom Events** para comunicación

### Backend
- **Sparrest.js** (json-server wrapper)
- **JSON file database** (db.json)
- **JWT Authentication** (bcrypt)
- Puerto: 8000

---

## 🎨 Características Destacadas

### Sistema de Toasts Profesional
- 4 tipos: info, success, error, warning
- Auto-dismiss después de 3 segundos
- Apilamiento de múltiples toasts
- Transiciones suaves

### Gestión de Estados
- Loading, Success, Error, Empty
- Custom events para comunicación
- Loaders animados con Bootstrap Spinner
- Mensajes contextuales

### Verificación de Ownership
- Triple verificación en Edit/Delete:
  1. Frontend: Botones solo si eres owner
  2. URL: Verificación al cargar página
  3. Submit: Verificación antes de enviar
- Detección de tokens expirados
- Redirects automáticos con alerts

### Navbar Dinámica
- Login/Signup si NO autenticado
- Saludo personalizado si autenticado
- Botón Create Ad protegido
- Actualización automática en cada página


---

## 📂 Estructura de Archivos Completa
```
Guayapop-2025/
├── index.html                 # Listado de anuncios
├── login.html                 # Página de login
├── signup.html                # Página de registro
├── create-ad.html             # Crear anuncio
├── ad-detail.html             # Detalle de anuncio
├── edit-ad.html               # Editar anuncio
├── db.json                    # Base de datos (usuarios + anuncios)
├── README.md                  # Este archivo
├── js/
│   ├── controllers/
│   │   ├── ads.controller.js
│   │   ├── adDetail.controller.js
│   │   ├── createAd.controller.js
│   │   ├── editAd.controller.js
│   │   ├── login.controller.js
│   │   ├── signup.controller.js
│   │   ├── session.controller.js
│   │   ├── toast.controller.js
│   │   └── loader.controller.js
│   ├── models/
│   │   ├── adsModel.js
│   │   ├── adDetailModel.js
│   │   └── authModel.js
│   ├── views/
│   │   ├── adCard.view.js
│   │   ├── adDetail.view.js
│   │   ├── pagination.view.js
│   │   └── states.view.js
│   ├── utils/
│   │   ├── constants.js
│   │
│   ├── index.js               # Entry point listado
│   ├── login.js               # Entry point login
│   ├── signup.js              # Entry point signup
│   ├── create-ad.js           # Entry point crear
│   ├── ad-detail.js           # Entry point detalle
│   └── edit-ad.js             # Entry point editar
└── sparrest-backend/
    ├── db.json                # Copiado desde raíz
    ├── package.json
    ├── node_modules/
    └── index.js
```

---

## ⚠️ Notas Importantes

### Puerto del Backend
- El backend **debe** correr en el puerto **8000**
- Si el puerto está ocupado, libéralo antes:
```bash
  # Linux/Mac
  lsof -i :8000
  kill -9 [PID]
  
  # Windows
  netstat -ano | findstr :8000
  taskkill /PID [PID] /F
```

### Base de Datos
- ⚠️ **CRÍTICO:** Usar el `db.json` incluido en el proyecto
- NO usar el `db.json` original de sparrest (está vacío)
- El archivo incluye:
  - 3 usuarios con contraseñas hasheadas (bcrypt)
  - 30 anuncios (10 por usuario)
  - Fechas de creación y actualización realistas

### Frontend
- Se recomienda usar **Live Server** de VSCode
- O abrir `index.html` directamente en navegador moderno
- Asegurarse de que el backend esté corriendo primero
- CORS está habilitado en Sparrest por defecto

### Contraseñas
- Todos los usuarios de prueba tienen la misma contraseña: `12345678`
- Están hasheadas con bcrypt en `db.json`
- NO modificar el hash manualmente

---

## 🧪 Verificación de la Instalación

### 1. Backend Funcionando ✅
Abrir en el navegador: http://localhost:8000/api/products

**Deberías ver:**
```json
[
  {
    "name": "iPad Air",
    "price": 450,
    "type": "sell",
    ...
  },
  ...
]
```

### 2. Autenticación Funcionando ✅
Probar endpoint de login:
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1@gmail.com","password":"12345678"}'
```

**Deberías recibir:**
```json
{
  "accessToken": "eyJhbGc...",
  "user": {...}
}
```

### 3. Frontend Funcionando ✅
Abrir `index.html` en el navegador.

**Deberías ver:**
- ✅ Listado de 10 anuncios (página 1)
- ✅ Botones de paginación: "Page 1 of 3"
- ✅ Barra de búsqueda
- ✅ Filtros por tags: Electronics, Furniture, etc.
- ✅ Navbar con Login/Signup
- ✅ Sin errores en consola

---


### ❌ Botones Edit/Delete no aparecen en anuncios propios
**Causa:** Token expirado o userId incorrecto

**Solución:**
1. Logout
2. Login de nuevo
3. Verificar en DevTools > Application > Local Storage que existe `accessToken`

---

## 🐛 Decisiones Técnicas

### PATCH vs PUT para Editar
- **Elegido:** PATCH
- **Razón:** Solo enviamos campos modificados, no todo el objeto
- **Ventaja:** Menos datos en red, más eficiente

### createdAt Manual en POST
- **Razón:** json-server no genera createdAt automáticamente
- **Solución:** Generamos `new Date().toISOString()` en frontend
- **Ventaja:** Control total sobre ordenamiento

### getUserData() vs Decodificar JWT
- **Elegido:** getUserData() (petición a /auth/me)
- **Razón:** Valida que el token sea válido en backend
- **Ventaja:** Más seguro, detecta tokens expirados

### Tags como Array
- **Razón:** Un anuncio puede tener múltiples categorías
- **Ejemplo:** ["electronics", "books"] para una Kindle
- **Query:** `tags_like=electronics` busca en array automáticamente

---


## 📞 Contacto
**Víctor González **  
Bootcamp JavaScript Backend - 2025  
GitHub: https://github.com/Bitxogm

---

## 📄 Licencia
Proyecto académico - Bootcamp Keepcoding 2025

---

## 🙏 Agradecimientos
- Profesor del bootcamp(**Edu Aguilar**) por la guía
- Compañeros por el feedback
- Sparrest.js por el backend simplificado