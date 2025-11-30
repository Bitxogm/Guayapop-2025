# 🛒 Wallapop Clone -

Aplicación web tipo marketplace desarrollada con **Vanilla JavaScript** siguiendo el patrón **MVC** estricto.

---

## 👨‍💻 Autor
**Void (Víctor González)**  
Bootcamp - Keepcoding 2025

---

## ✨ Características Principales

### Requisitos Obligatorios (5/5) ✅
- ✅ Listado de anuncios con gestión de 4 estados
- ✅ Detalle de anuncio con verificación de ownership
- ✅ Creación de anuncios (solo usuarios autenticados)
- ✅ Sistema de login con JWT
- ✅ Registro de usuarios

### Requisitos Opcionales (5/5) ✅
- ✅ Paginación (10 anuncios por página)
- ✅ Buscador por nombre y descripción
- ✅ Edición de anuncios (solo propietarios)
- ✅ Tags estáticos (Electronics, Furniture, Clothing, Books, Sports)
- ✅ Filtrado por tags

---

## 🚀 Instalación Rápida

### 1️⃣ Clonar el Proyecto (Frontend)
```bash
git clone https://github.com/Bitxogm/Guayapop-2025.git
cd Guayapop-2025
```

### 2️⃣ Configurar Backend (En Carpeta Separada)
```bash
# Volver al directorio padre
cd ..

# Clonar Sparrest
git clone https://github.com/kasappeal/sparrest.js.git
cd sparrest.js

# Copiar base de datos desde el proyecto
# Linux/Mac:
cp ../Guayapop-2025/db.json .

# Windows (PowerShell):
copy ..\Guayapop-2025\db.json .

# Instalar dependencias
npm install

# Iniciar backend
npm start
```

### 3️⃣ Abrir Frontend
```bash
# En nueva terminal
cd ../Guayapop-2025

# Opción A: Live Server (VSCode)
# Click derecho en index.html → "Open with Live Server"

# Opción B: Abrir directamente
# Doble click en index.html
```

---

## 📁 Estructura Correcta
```
📁 Mis_Proyectos/
├── 📁 Guayapop-2025/          ← Frontend
│   ├── index.html
│   ├── js/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── views/
│   │   └── utils/
│   └── db.json
│
└── 📁 sparrest.js/             ← Backend (SEPARADO)
    ├── db.json                 ← Copiado desde Guayapop-2025
    ├── package.json
    └── node_modules/
```

---

## 👥 Usuarios de Prueba

| Email | Contraseña | Anuncios |
|-------|-----------|----------|
| `user1@gmail.com` | `12345678` | 10 |
| `user2@gmail.com` | `12345678` | 10 |
| `user3@gmail.com` | `12345678` | 10 |

**Total:** 30 anuncios en la base de datos inicial.

---

## 🏗️ Arquitectura MVC
```
js/
├── models/          → Comunicación con API
│   ├── adsModel.js
│   ├── adDetailModel.js
│   └── authModel.js
│
├── views/           → Construcción de HTML
│   ├── adCard.view.js
│   ├── adDetail.view.js
│   └── pagination.view.js
│
├── controllers/     → Lógica de negocio
│   ├── ads.controller.js
│   ├── adDetail.controller.js
│   └── session.controller.js
│
└── [página].js      → Entry points
    ├── index.js
    ├── login.js
    └── create-ad.js
```

**Comunicación:** Custom Events entre capas

---

## 📦 Stack Tecnológico

**Frontend:**
- Vanilla JavaScript ES6+ (Modules)
- Bootstrap 5.3.0
- Patrón MVC estricto
- Custom Events

**Backend:**
- Sparrest.js (json-server + JWT)
- Puerto: 8000
- Base de datos: db.json

---

## 🧪 Verificación

### Backend Funcionando ✅
**Abrir:** http://localhost:8000/api/products

**Deberías ver JSON con 30 anuncios**

### Frontend Funcionando ✅
**Abrir:** index.html en navegador

**Deberías ver:**
- ✅ 10 anuncios en página 1
- ✅ Paginación: "Page 1 of 3"
- ✅ Barra de búsqueda
- ✅ Filtros por tags
- ✅ Navbar: Login / Signup
- ✅ Sin errores en consola (F12)

---

## ⚠️ Troubleshooting

### Backend no inicia
```bash
cd sparrest.js
npm install
npm start
```

### Frontend no carga anuncios
**Verificar:**
1. ✅ Backend corriendo en puerto 8000
2. ✅ Abrir http://localhost:8000/api/products → Ver JSON
3. ✅ Sin errores CORS en consola (F12)

### Botones Edit/Delete no aparecen
**Solución:**
1. Logout
2. Login de nuevo con: user1@gmail.com / 12345678
3. Verificar token en DevTools > Application > Local Storage

---

## 🎯 Flujo de Trabajo

### Terminal 1: Backend
```bash
cd sparrest.js
npm start
# Mantener abierta
```

### Terminal 2: Frontend
```bash
cd Guayapop-2025
# Abrir index.html con Live Server
```

---

## 🎨 Características Destacadas

### Sistema de Toasts
- 4 tipos: info, success, error, warning
- Auto-dismiss (3 segundos)
- Apilamiento de múltiples toasts

### Gestión de Estados
- Loading, Success, Error, Empty
- Custom events para comunicación
- Loaders animados

### Verificación de Ownership
- Triple verificación en Edit/Delete
- Detección de tokens expirados
- Redirects automáticos con alerts

### Navbar Dinámica
- Login/Signup si NO autenticado
- Saludo personalizado + Create Ad si autenticado
- Actualización automática

---

## 🐛 Decisiones Técnicas

**PATCH vs PUT:** PATCH (solo campos modificados)  
**createdAt:** Generado en frontend (`new Date().toISOString()`)  
**Ownership:** Verificación con endpoint `/auth/me`  
**Tags:** Array (múltiples categorías por anuncio)

---

## 📞 Contacto
**Víctor González**  
GitHub: https://github.com/Bitxogm

---

## 📄 Licencia
Proyecto académico - Bootcamp Keepcoding 2025