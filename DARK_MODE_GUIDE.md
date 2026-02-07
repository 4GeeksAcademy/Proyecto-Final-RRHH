# Sistema de Tema Claro/Oscuro

## Descripción

Se ha implementado un sistema completo de tema claro/oscuro para tu aplicación web. El botón para cambiar entre temas está ubicado en la barra de navegación (Navbar) y es visible tanto para usuarios logeados como para visitantes.

## Características

### 1. **Hook Personalizado `useTheme`**

- Ubicación: `src/front/hooks/useTheme.jsx`
- Maneja el estado del tema y persiste la preferencia en localStorage
- Aplica automáticamente la clase `dark` al elemento HTML
- Detecta la preferencia del sistema si no hay preferencia guardada

### 2. **Botón de Cambio de Tema**

- Ubicado en el Navbar para fácil acceso
- Icono de luna para modo oscuro
- Icono de sol para modo claro
- Disponible para todos los usuarios

### 3. **Estilos Aplicados**

- Navbar: estilos oscuros en fondo y bordes
- Dropdowns de usuario: estilos oscuros
- Transiciones suaves entre temas

## Componentes Actualizados

### Navbar.jsx

- Importa el hook `useTheme`
- Incluye el botón de cambio de tema
- Aplica clases `dark:` de Tailwind a todos los elementos

### Configuración de Tailwind

- `tailwind.config.js`: Configurado con `darkMode: 'class'`
- `postcss.config.js`: Necesario para procesar Tailwind
- `src/front/index.css`: Importa directivas de Tailwind

### main.jsx

- Aplica el tema guardado al iniciar la aplicación
- Detecta preferencias del sistema operativo

## Cómo Usar

### Para agregar estilos oscuros a otros componentes:

```jsx
// En cualquier elemento, usa clases de Tailwind con prefijo dark:

<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-white">Texto</p>
  <button className="bg-blue-500 dark:bg-blue-700 hover:bg-gray-100 dark:hover:bg-gray-800">
    Botón
  </button>
</div>
```

### Estructura de clases Tailwind para temas:

| Elemento         | Modo Claro          | Modo Oscuro              |
| ---------------- | ------------------- | ------------------------ |
| Fondo            | `bg-white`          | `dark:bg-gray-900`       |
| Texto principal  | `text-gray-900`     | `dark:text-white`        |
| Texto secundario | `text-gray-500`     | `dark:text-gray-400`     |
| Bordes           | `border-gray-200`   | `dark:border-gray-700`   |
| Hover            | `hover:bg-gray-100` | `dark:hover:bg-gray-800` |

## Persistencia

- La preferencia del usuario se guarda en localStorage con la clave `theme`
- Al recargar la página, se mantiene la preferencia seleccionada
- Si no hay preferencia guardada, detecta automáticamente la del sistema

## Próximas Mejoras (Opcionales)

- Aplicar tema oscuro a todas las páginas del sistema
- Agregar más variantes de colores para temas
- Crear un selector de tema en la configuración del usuario
- Agregar transiciones CSS más suaves entre temas
