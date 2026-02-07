# Sistema de Tema Claro/Oscuro - Documentación Completa

## ✨ Descripción General

Se ha implementado un sistema completo y funcional de tema claro/oscuro para toda la aplicación web **TeamCore**. El cambio de tema se puede realizar en cualquier momento mediante el botón ubicado en la barra de navegación (Navbar), el cual es visible para todos los usuarios.

## 🎯 Características Principales

### 1. **Hook Personalizado `useTheme`**

- **Ubicación**: `src/front/hooks/useTheme.jsx`
- Maneja el estado del tema (light/dark)
- Persiste la preferencia en `localStorage`
- Aplica la clase `dark` al elemento `<html>`
- Detecta automáticamente la preferencia del sistema operativo

### 2. **Botón de Tema en Navbar**

- Ubicado en la barra de navegación superior
- Icono de luna 🌙 para activar modo oscuro
- Icono de sol ☀️ para activar modo claro
- Disponible para usuarios logeados y visitantes
- Transiciones suaves al hacer clic

### 3. **Cobertura Completa de Estilos Oscuros**

La aplicación completa tiene soporte para tema oscuro:

- ✅ **Navbar**: Navegación superior
- ✅ **Sidebar**: Menú lateral con todas las opciones
- ✅ **Footer**: Pie de página
- ✅ **Cards**: Tarjetas de contenido (Cards.jsx y Cards2.jsx)
- ✅ **Formularios**: Inputs y selects
- ✅ **Página Login**: Formulario de acceso
- ✅ **Layout Principal**: Fondo y contenedor general
- ✅ **Todos los Componentes**: Texto, bordes, iconos, etc.

## 📁 Archivos Modificados/Creados

### Nuevos

- `src/front/hooks/useTheme.jsx` - Hook para manejar temas
- `tailwind.config.js` - Configuración de Tailwind con darkMode
- `postcss.config.js` - Configuración de PostCSS

### Actualizados

| Archivo                                   | Cambios                                |
| ----------------------------------------- | -------------------------------------- |
| `src/front/components/Navbar.jsx`         | Botón de tema + estilos oscuros        |
| `src/front/pages/Layout.jsx`              | Fondo adaptativo                       |
| `src/front/components/Sidebar.jsx`        | Navegación con tema oscuro             |
| `src/front/components/Footer.jsx`         | Pie de página adaptativo               |
| `src/front/components/Cards.jsx`          | Tarjetas con tema                      |
| `src/front/components/Cards2.jsx`         | Tarjetas secundarias                   |
| `src/front/components/InputForm.jsx`      | Inputs con tema                        |
| `src/front/components/FloatingSelect.jsx` | Selects con tema                       |
| `src/front/pages/Login.jsx`               | Página login completa                  |
| `src/front/index.css`                     | Imports de Tailwind + estilos globales |
| `src/front/main.jsx`                      | Inicialización del tema                |

## 🎨 Paleta de Colores

### Modo Claro (Light)

```
Fondo principal:    bg-white
Fondo secundario:   bg-gray-50
Texto principal:    text-gray-900
Texto secundario:   text-gray-600
Bordes:             border-gray-200
Hover:              hover:bg-gray-100
```

### Modo Oscuro (Dark)

```
Fondo principal:    dark:bg-gray-900
Fondo secundario:   dark:bg-gray-950
Texto principal:    dark:text-white
Texto secundario:   dark:text-gray-400
Bordes:             dark:border-gray-700
Hover:              dark:hover:bg-gray-800
```

## 💡 Cómo Usar en Nuevos Componentes

### Ejemplo Básico

```jsx
import React from "react";

export default function MiComponente() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-4">Mi Componente</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Este texto es legible en ambos temas
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg">
        Acción
      </button>
    </div>
  );
}
```

### Patrón Recomendado para Componentes

```jsx
// Estructura clara y consistente
<div
  className="
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-700
  text-gray-900 dark:text-white
  hover:bg-gray-50 dark:hover:bg-gray-800
  transition-colors duration-200
"
>
  {/* Contenido */}
</div>
```

## 📊 Tabla de Referencia Rápida

| Elemento       | Claro                      | Oscuro                                  |
| -------------- | -------------------------- | --------------------------------------- |
| **Contenedor** | `bg-white`                 | `dark:bg-gray-900`                      |
| **Fondo Alt**  | `bg-gray-50`               | `dark:bg-gray-950`                      |
| **Texto**      | `text-gray-900`            | `dark:text-white`                       |
| **Texto Alt**  | `text-gray-600`            | `dark:text-gray-400`                    |
| **Bordes**     | `border-gray-200`          | `dark:border-gray-700`                  |
| **Focus**      | `focus:ring-indigo-500`    | `dark:focus:ring-indigo-400`            |
| **Hover**      | `hover:bg-gray-100`        | `dark:hover:bg-gray-800`                |
| **Shadow**     | `shadow`                   | `dark:shadow-lg`                        |
| **Input**      | `bg-white border-gray-300` | `dark:bg-gray-800 dark:border-gray-600` |

## 🔄 Flujo de Funcionamiento

1. **Inicialización**
   - Usuario accede a la app
   - `main.jsx` revisa localStorage por tema guardado
   - Si existe, aplica la clase `dark` al HTML
   - Si no existe, detecta preferencia del SO

2. **Durante la Sesión**
   - Usuario hace clic en botón de tema en Navbar
   - Hook `useTheme` ejecuta `toggleTheme()`
   - Cambia el estado y guarda en localStorage
   - Tailwind CSS aplica/elimina clase `dark` en HTML
   - Todos los componentes se actualizan automáticamente

3. **Persistencia**
   - Preferencia guardada en `localStorage['theme']`
   - Se mantiene al recargar página
   - Se mantiene entre sesiones

## ✅ Checklist de Compatibilidad

- ✅ Navegación (Navbar)
- ✅ Menú lateral (Sidebar)
- ✅ Contenido principal
- ✅ Tarjetas (Cards)
- ✅ Formularios (inputs, selects, buttons)
- ✅ Pie de página (Footer)
- ✅ Página de Login
- ✅ Iconos y SVG
- ✅ Textos e información
- ✅ Bordes y divisores
- ✅ Estados hover/focus
- ✅ Sombras

## 📱 Responsive Design

El tema funciona perfectamente en:

- ✅ Teléfonos móviles (320px+)
- ✅ Tablets (768px+)
- ✅ Computadoras (1024px+)
- ✅ Pantallas grandes (1280px+)

## 🚀 Mejoras Futuras (Opcionales)

- [ ] Agregar más temas (Sepia, Alto Contraste)
- [ ] Crear página de preferencias de tema
- [ ] Sincronizar tema entre pestañas
- [ ] Guardar preferencia en BD del usuario
- [ ] Agregar animaciones de transición más sofisticadas
- [ ] Crear selector visual de colores
- [ ] Exportar configuración de colores

## 🐛 Troubleshooting

### El tema no cambia

- Verificar que Tailwind esté procesando los archivos
- Revisar que `darkMode: 'class'` esté en `tailwind.config.js`
- Limpiar caché del navegador

### Estilos inconsistentes

- Asegurar que todos los elementos tienen clases `dark:`
- Usar la paleta de colores consistentemente
- Revisar que no haya CSS inline conflictivo

### Problemas de contraste

- Usar valores suficientemente distintos entre claro y oscuro
- Probar la accesibilidad con herramientas online
- Asegurar ratio de contraste mínimo 4.5:1

## 📖 Recursos Útiles

- [Tailwind Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

**Última actualización**: Febrero 2026  
**Versión**: 1.0  
**Estado**: ✅ Implementado y funcionando correctamente
