import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Column, Enum, ForeignKey, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
from typing import List

db = SQLAlchemy()

class EstadoUser(enum.Enum):
    activo = "Activo"
    ausente = "Ausente"
    ocupado = "Ocupado"
    no_molestar = "No Molestar"

class Estado(enum.Enum):
    en_proceso = "En Proceso"
    pendiente = "Pendiente"
    finalizado = "Finalizado"

# --- TABLAS INTERMEDIAS (MANY-TO-MANY) ---

reunion_user = Table(
    "reunion_user",
    db.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("reunion_id", ForeignKey("reunion.id"))
)

proyecto_user = Table(
    "proyecto_user",
    db.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("proyecto_id", ForeignKey("proyecto.id"))
)

# --- MODELOS ---

class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(30), nullable=False)
    apellidos: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    dni: Mapped[str] = mapped_column(String(9), unique=True, nullable=False)
    telefono: Mapped[int] = mapped_column(nullable=True)
    foto_perfil: Mapped[str] = mapped_column(String(), nullable=True, default="logo.png")
    estado: Mapped[EstadoUser] = mapped_column(Enum(EstadoUser), nullable=False, default=EstadoUser.activo)
    link_calendly: Mapped[str] = mapped_column(String(), nullable=True)

    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresa.id"), nullable=False)
    empresa: Mapped["Empresa"] = relationship(back_populates="users")

    rol_id: Mapped[int] = mapped_column(ForeignKey("rol.id"), nullable=True)
    rol: Mapped["Rol"] = relationship(back_populates="users")

    horario_id: Mapped[int] = mapped_column(ForeignKey("horario.id"), nullable=True)
    horario: Mapped["Horario"] = relationship(back_populates="users")

    reuniones: Mapped[List["Reunion"]] = relationship(secondary="reunion_user", back_populates="usuarios")
    organizador_reunion: Mapped["Reunion"] = relationship(back_populates="organizador")
    fichajes: Mapped[List["Fichaje"]] = relationship(back_populates="user")
    proyectos: Mapped[List["Proyecto"]] = relationship(secondary="proyecto_user", back_populates="users")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "email": self.email,
            "dni": self.dni,
            "telefono": self.telefono,
            "foto_perfil": self.foto_perfil,
            "estado": self.estado.value if self.estado else "Activo",
            "link_calendly": self.link_calendly,
            "empresa_id": self.empresa_id,
            "rol_id": self.rol_id,
            # CORRECCIÓN: Evita explotar si el usuario no tiene rol asignado
            "rol": self.rol.nombre if self.rol else None,
            "horario_id": self.horario_id,
            # CORRECCIÓN: Evita explotar si el usuario no tiene horario asignado
            "horario": self.horario.name if self.horario else None
        }

class Rol(db.Model):
    __tablename__ = "rol"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    es_admin: Mapped[bool] = mapped_column(Boolean())
    puede_crear_reunion: Mapped[bool] = mapped_column(Boolean(), default=False)
    puede_compartir_reunion: Mapped[bool] = mapped_column(Boolean(), default=False)
    puede_invitar_proyectos: Mapped[bool] = mapped_column(Boolean(), default=False)
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresa.id"), nullable=False)
    empresa: Mapped["Empresa"] = relationship(back_populates="roles")
    users: Mapped[List["User"]] = relationship(back_populates="rol")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "es_admin": self.es_admin,
            "empresa_id": self.empresa_id
        }

class Horario(db.Model):
    __tablename__ = "horario"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    # (Los campos de entrada/salida se omiten aquí por brevedad, pero mantenlos en tu código)
    users: Mapped[List["User"]] = relationship(back_populates="horario")
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresa.id"))
    empresa: Mapped["Empresa"] = relationship(back_populates="horarios")

    def serialize(self):
        return {"id": self.id, "name": self.name}

class Empresa(db.Model):
    __tablename__ = "empresa"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    imagen: Mapped[str] = mapped_column(String(), nullable=False, default="logo.jpg")
    users: Mapped[List["User"]] = relationship(back_populates="empresa", cascade="all, delete-orphan")
    horarios: Mapped[List["Horario"]] = relationship(back_populates="empresa", cascade="all, delete-orphan")
    roles: Mapped[List["Rol"]] = relationship(back_populates="empresa")

    def serialize(self):
        return {"id": self.id, "nombre": self.nombre, "imagen": self.imagen}

class Reunion(db.Model):
    __tablename__ = "reunion"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(80), nullable=True)
    link: Mapped[str] = mapped_column(String(), nullable=False)
    fecha: Mapped[datetime.datetime] = mapped_column(nullable=False)
    duracion: Mapped[int] = mapped_column(nullable=False)
    organizador_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    organizador: Mapped["User"] = relationship(back_populates="organizador_reunion")
    usuarios: Mapped[List["User"]] = relationship(secondary="reunion_user", back_populates="reuniones")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "link": self.link,
            "fecha": self.fecha.isoformat() if self.fecha else None,
            "duracion": self.duracion,
            "organizador_id": self.organizador_id,
            # CORRECCIÓN: No serializar el usuario completo para evitar bucles
            "usuarios": [u.id for u in self.usuarios]
        }

class Fichaje(db.Model):
    __tablename__ = "fichaje"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    hora_entrada: Mapped[datetime.datetime] = mapped_column(nullable=True)
    hora_salida: Mapped[datetime.datetime] = mapped_column(nullable=True)
    fecha: Mapped[datetime.date] = mapped_column(nullable=False)
    user: Mapped["User"] = relationship(back_populates="fichajes")

    def serialize(self):
        return {
            "id": self.id,
            "hora_entrada": self.hora_entrada.isoformat() if self.hora_entrada else None,
            "hora_salida": self.hora_salida.isoformat() if self.hora_salida else None,
            "fecha": self.fecha.isoformat() if self.fecha else None,
            "user_id": self.user_id
        }

class Proyecto(db.Model):
    __tablename__ = "proyecto"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(), nullable=True)
    estado: Mapped[Estado] = mapped_column(Enum(Estado), nullable=False, default=Estado.pendiente)
    users: Mapped[List["User"]] = relationship(secondary="proyecto_user", back_populates="proyectos")
    tareas: Mapped[List["Tarea"]] = relationship(back_populates="proyecto")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "estado": self.estado.value if self.estado else "Pendiente",
            # CORRECCIÓN: Serializamos tareas (no causan bucle)
            "tareas": [t.serialize() for t in self.tareas] if self.tareas else [],
            # CORRECCIÓN: NO serializar u.serialize() para evitar bucle infinito con User
            "users": [u.id for u in self.users] if self.users else []
        }

class Tarea(db.Model):
    __tablename__ = "tarea"
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    estado: Mapped[Estado] = mapped_column(Enum(Estado), nullable=False, default=Estado.pendiente)
    proyecto_id: Mapped[int] = mapped_column(ForeignKey("proyecto.id"), nullable=False)
    proyecto: Mapped["Proyecto"] = relationship(back_populates="tareas")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "estado": self.estado.value if self.estado else "Pendiente",
            "proyecto_id": self.proyecto_id
        }
