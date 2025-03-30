# TODO

## Pre-desarrollo

- [x] Identificación de requisitos
- [x] Definición de requisitos
  - [x] Requisitos comunes de las interfaces
  - [x] Requisitos funcionales
  - [x] Requisitos no funcionales
- [x] Selección de metodología
- [ ] Selección de arquitectura
  - [ ] Diseño de arquitectura
- [x] Selección de tecnologías
  - [x] Selección de lenguajes de programación
  - [ ] Selección de sistema gestor de BD
  - [ ] Selección de frameworks

## Interfaz de Usuario

- [ ] Desarrollo de prototipo
- [ ] Desarrollo de interfaz de usuario
  - [ ] Interfaz de inicio de sesión
  - [ ] Interfaz de administración de cuenta
  - [ ] Interfaz de conexión OBD
  - [ ] Interfaz de diagnóstico de auto
- [ ] Conexión de interfaces con funciones (frontend con backend)

## Modelado del Sistema

- [x] Diagrama de clases
- [ ] Diagrama de caso de uso
- [ ] Diagrama de secuencia
  - [ ] Cuenta gratis
  - [ ] Cuenta premium
- [ ] Diagrama de actividades

## Base de Datos

- [ ] Diagrama entidad-relación
- [ ] Desarrollo de tablas
  - [ ] Tablas de usuario
  - [ ] Tablas de códigos de error
- [ ] Desarrollo del CRUD
  - [ ] CRUD usuario
  - [ ] Tablas códigos de error
- [ ] Conexión de BD

### Seguridad

- [ ] Implementación de respaldos periódicos
- [ ] Hasheo de claves con Argon2
- [ ] Validación de contraseñas en base a _guidelines_
  - [ ] Minimo 12 caracteres
  - [ ] Mínimo una mayúscula, una minúscula y un símbolo
  - [ ] Validación de claves vulneradas (e.g. Have I Been Pwned API)
  - [ ] Validación de entropía mayor o igual a 80 bits
- [ ] Control de privilegios de usuario en el SGBD

## Implementación de Funciones

### Funciones de Administración de Cuenta

- [ ] Creación de cuenta
- [ ] Inicio de sesión
- [ ] Recuperación de cuenta mediante correo
- [ ] Cambio de contraseña
- [ ] Autenticación de 2 pasos (e.g., correo o TOTP)
- [ ] Cerrar sesión
- [ ] Suspender cuenta
- [ ] Eliminar cuenta

### Funciones Conexión OBD

- [ ] Conexión
- [ ] Desconexión

### Funciones Códigos OBD

- [ ] Extracción de códigos
- [x] Validación de códigos

### Funciones Plan Gratuito

- [ ] Escaneo del auto
- [ ] Visualización de códigos error con descripción
- [ ] Visualización del último registro
- [ ] Adición de publicidad

### Funciones Plan Premium

- [ ] Escaneo avanzado del auto
- [ ] Acceso a documentación del auto
- [ ] Visualización de registros
- [ ] Eliminación de anuncios en plan pro
- [ ] Uso offline (BD local para los códigos de error)

## Seguridad

- [ ] Implementación de RegEx para la validación de los campos
- [ ] Uso de .env para no exponer credenciales

## Pruebas y Depuración

- [ ] Pruebas de caja blanca
  - [ ] Validar el correcto funcionamiento de las funciones
  - [ ] Validar protección contra inyecciones SQL
  - [ ] Validar que los campos sean correctamente validados
  - [ ] Validar que los datos y _assets_ sean manejados apropiadamente para
        garantizar que se cumpla la triada CID
    - [ ] PII
    - [ ] SPII
- [ ] Pruebas de caja negra
- [ ] Depuración

## Documentación

- [ ] Manual de usuario
- [ ] Manual de implementación
