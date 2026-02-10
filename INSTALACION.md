# 🚀 Guía de Instalación - Links Gastronomi

## ✅ Requisitos Previos

1. **Node.js** (v18 o superior)
2. **PostgreSQL** instalado y corriendo
3. **Git** (opcional)

## 📦 Paso 1: Instalar Dependencias

```bash
npm install
```

## 🗄️ Paso 2: Configurar PostgreSQL

### Opción A: PostgreSQL Local (Recomendado)

1. Asegúrate de que PostgreSQL esté corriendo
2. Crea una base de datos llamada `linksgastronomi`:

```sql
CREATE DATABASE linksgastronomi;
```

3. El archivo `.env` ya está configurado con:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/linksgastronomi?schema=public"
```

**Nota:** Si tu usuario/contraseña de PostgreSQL es diferente, edita el `.env`

### Opción B: PostgreSQL con Docker

```bash
docker run --name postgres-links -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=linksgastronomi -p 5432:5432 -d postgres
```

## 🔧 Paso 3: Configurar Prisma

### 3.1 Generar el cliente de Prisma

```bash
npx prisma generate
```

### 3.2 Ejecutar las migraciones

```bash
npx prisma migrate dev --name init
```

O si prefieres hacer push directo:

```bash
npx prisma db push
```

## 🌱 Paso 4: Cargar Datos de Prueba

```bash
node prisma/seed-simple.js
```

Esto creará:
- ✅ 1 Admin (admin@linksgastronomi.com / admin123)
- ✅ 1 Restaurante: Elys Restobar
- ✅ 3 Categorías: Pizzas, Hamburguesas, Bebidas
- ✅ 8 Productos de ejemplo

## 🎯 Paso 5: Ejecutar el Proyecto

```bash
npm run dev
```

El proyecto estará disponible en:
- **Menú del Restaurante:** http://localhost:3000/elysrestobar
- **Panel Admin:** http://localhost:3000/admin

## 🔑 Credenciales de Prueba

**Admin:**
- Email: `admin@linksgastronomi.com`
- Password: `admin123`

## 🛠️ Comandos Útiles

```bash
# Ver la base de datos en Prisma Studio
npx prisma studio

# Resetear la base de datos
npx prisma migrate reset

# Ver logs de Prisma
npx prisma db push --help
```

## ❓ Solución de Problemas

### Error: "Can't reach database server"
- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en `.env`

### Error: "Prisma Client not generated"
```bash
npx prisma generate
```

### Error en migraciones
```bash
npx prisma migrate reset
npx prisma db push
node prisma/seed-simple.js
```

## 📱 Próximos Pasos

1. Visita http://localhost:3000/elysrestobar para ver el menú
2. Personaliza los productos en Prisma Studio
3. Accede al panel admin en http://localhost:3000/admin

---

**¿Todo funcionando?** 🎉 Ya puedes empezar a personalizar tu menú digital!
