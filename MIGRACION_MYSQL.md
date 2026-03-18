# Migración de Datos desde phpMyAdmin a Next.js (PostgreSQL)

Como tienes tus datos actuales en **MySQL (phpMyAdmin)** y el nuevo proyecto de Vercel usará **PostgreSQL**, tenemos que mover esa información. No te preocupes, he preparado una guía y un script para hacer esto automáticamente.

## Paso 1: Exportar tus datos actuales desde phpMyAdmin

1. Abre tu panel de **phpMyAdmin**.
2. Selecciona la base de datos de tu proyecto Laravel anterior.
3. Ve a la pestaña **Exportar**.
4. En el "Método de exportación", elige **Personalizado - mostrar todas las opciones posibles**.
5. En la sección "Formato", selecciona **CSV**.
6. Asegúrate de marcar la opción para exportar la primera fila con los **nombres de las columnas**.
7. Selecciona las tablas clave que deseas migrar (por ejemplo: `homes`, `services`, `abouts`, `founders`, `pricings`, `settings`). No necesitamos las tablas nativas de Laravel como `migrations` o `personal_access_tokens`.
8. Haz clic en **Exportar** al final de la página.

Esto te descargará uno o varios archivos `.csv` (archivos separados por comas, que abren en Excel).

## Paso 2: Usar el Script de Migración

He creado una carpeta temporal en tu proyecto llamada `scripts/` y he puesto ahí un archivo `migrate-csv.ts`.

Lo que haremos es:
1. Copiarás esos archivos `.csv` que descargaste en el paso 1 dentro del folder `yada_v2/scripts/data/` (crearás este folder).
2. Asegúrate de nombrar los archivos exactamente igual a los modelos en Prisma (ejemplo: `home.csv`, `service.csv`, `founder.csv`, etc.).
3. Ejecutaremos el script que he creado, que leerá esos archivos de Excel y los meterá de golpe en tu nueva base de datos PostgreSQL.

Primero dime, ¿ya tienes base de datos PostgreSQL localmente en tu computadora o prefieres que hagamos este proceso de importación una vez que ya despliegues el sitio web y tengas acceso a la base de datos gratuita de Vercel?
