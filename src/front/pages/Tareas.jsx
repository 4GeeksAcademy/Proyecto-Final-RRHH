import { useState, useEffect } from 'react';

export default function Tareas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);}

 // Cambiar a true cuando la api funcione
  const USAR_API_REAL = false;


  const tareasSimuladas = [
    {
      id: 1,
      nombre: "Conectar API de tareas",
      estado: "En Proceso",
      proyecto_id: 1
    },
    {
      id: 2,
      nombre: "Diseñar interfaz de usuario",
      estado: "Pendiente",
      proyecto_id: 1
    },
    {
      id: 3,
      nombre: "Revisar permisos de usuario",
      estado: "Finalizado",
      proyecto_id: 2
    }
  ];
