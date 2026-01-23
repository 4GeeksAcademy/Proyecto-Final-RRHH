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

class User(db.Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(30), nullable=False)
    apellidos: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    dni: Mapped[str] = mapped_column(String(9), unique=True, nullable=False)
    telefono: Mapped[int] = mapped_column(nullable=True)
    foto_perfil: Mapped[str] = mapped_column(
        String(), nullable=True, default="logo.png")
    estado: Mapped[EstadoUser] = mapped_column(
        Enum(EstadoUser), nullable=False, default=EstadoUser.activo)
    link_calendly: Mapped[str] = mapped_column(String(), nullable=True)

    empresa_id: Mapped[int] = mapped_column(
        ForeignKey("empresa.id"), nullable=False)
    empresa: Mapped["Empresa"] = relationship(back_populates="users")

    rol_id: Mapped[int] = mapped_column(ForeignKey("rol.id"), nullable=True)
    rol: Mapped["Rol"] = relationship(back_populates="users")

    horario_id: Mapped[int] = mapped_column(
        ForeignKey("horario.id"), nullable=True)
    horario: Mapped["Horario"] = relationship(back_populates="users")

    reuniones: Mapped[List["Reunion"]] = relationship(
        secondary="reunion_user", back_populates="users")

    fichajes: Mapped[List["Fichaje"]] = relationship(back_populates="user")

    proyectos: Mapped[List["Proyecto"]] = relationship(
        secondary="proyecto_user", back_populates="users")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "email": self.email,
            "dni": self.dni,
            "telefono": self.telefono,
            "foto_perfil": self.foto_perfil,
            "estado": self.estado.value,
            "link_calendly": self.link_calendly,
            "empresa_id": self.empresa_id,
            "rol_id": self.rol_id,
            "horario_id": self.horario_id
        }

class Rol(db.Model):
    __tablename__ = "rol"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    es_admin: Mapped[bool] = mapped_column(Boolean())
    puede_crear_reunion: Mapped[bool] = mapped_column(Boolean(), default=False)
    puede_compartir_reunion: Mapped[bool] = mapped_column(
        Boolean(), default=False)
    puede_invitar_proyectos: Mapped[bool] = mapped_column(
        Boolean(), default=False)

    users: Mapped[List["User"]] = relationship(back_populates="rol")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "es_admin": self.es_admin,
            "puede_crear_reunion": self.puede_crear_reunion,
            "puede_compartir_reunion": self.puede_compartir_reunion,
            "puede_invitar_proyectos": self.puede_invitar_proyectos
        }

class Horario(db.Model):
    __tablename__ = "horario"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[int] = mapped_column(String(100), nullable=False)
    lunes_entrada: Mapped[datetime.time] = mapped_column(nullable=False)
    lunes_salida: Mapped[datetime.time] = mapped_column(nullable=False)
    martes_entrada: Mapped[datetime.time] = mapped_column(nullable=False)
    martes_salida: Mapped[datetime.time] = mapped_column(nullable=False)
    miercoles_entrada: Mapped[datetime.time] = mapped_column(nullable=False)
    miercoles_salida: Mapped[datetime.time] = mapped_column(nullable=False)
    jueves_entrada: Mapped[datetime.time] = mapped_column(nullable=False)
    jueves_salida: Mapped[datetime.time] = mapped_column(nullable=False)
    viernes_entrada: Mapped[datetime.time] = mapped_column(nullable=False)
    viernes_salida: Mapped[datetime.time] = mapped_column(nullable=False)
    sabado_entrada: Mapped[datetime.time] = mapped_column(nullable=True)
    sabado_salida: Mapped[datetime.time] = mapped_column(nullable=True)
    domingo_entrada: Mapped[datetime.time] = mapped_column(nullable=True)
    domingo_salida: Mapped[datetime.time] = mapped_column(nullable=True)

    users: Mapped[List["User"]] = relationship(back_populates="horario")

    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresa.id"))
    empresa: Mapped["Empresa"] = relationship(back_populates="horarios")

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lunes_entrada": self.lunes_entrada.strftime("%H:%M") if self.lunes_entrada else None,
            "lunes_salida": self.lunes_salida.strftime("%H:%M") if self.lunes_salida else None,
            "martes_entrada": self.martes_entrada.strftime("%H:%M") if self.martes_entrada else None,
            "martes_salida": self.martes_salida.strftime("%H:%M") if self.martes_salida else None,
            "miercoles_entrada": self.miercoles_entrada.strftime("%H:%M") if self.miercoles_entrada else None,
            "miercoles_salida": self.miercoles_salida.strftime("%H:%M") if self.miercoles_salida else None,
            "jueves_entrada": self.jueves_entrada.strftime("%H:%M") if self.jueves_entrada else None,
            "jueves_salida": self.jueves_salida.strftime("%H:%M") if self.jueves_salida else None,
            "viernes_entrada": self.viernes_entrada.strftime("%H:%M") if self.viernes_entrada else None,
            "viernes_salida": self.viernes_salida.strftime("%H:%M") if self.viernes_salida else None,
            "sabado_entrada": self.sabado_entrada.strftime("%H:%M") if self.sabado_entrada else None,
            "sabado_salida": self.sabado_salida.strftime("%H:%M") if self.sabado_salida else None,
            "domingo_entrada": self.domingo_entrada.strftime("%H:%M") if self.domingo_entrada else None,
            "domingo_salida": self.domingo_salida.strftime("%H:%M") if self.domingo_salida else None,
            "empresa_id": self.empresa_id
        }


class Empresa(db.Model):
    __tablename__ = "empresa"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    imagen: Mapped[str] = mapped_column(String(), nullable=False)

    users: Mapped[List["User"]] = relationship(
        back_populates="empresa", cascade="all, delete-orphan")

    horarios: Mapped[List["Horario"]] = relationship(
        back_populates="empresa", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "imagen": self.imagen
        }

class Reunion(db.Model):
    __tablename__ = "reunion"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(80), nullable=False)
    link: Mapped[str] = mapped_column(String(), nullable=False)
    hora_inicio: Mapped[datetime.time] = mapped_column(nullable=False)
    duracion: Mapped[datetime.time] = mapped_column(nullable=False)

    users: Mapped[List["User"]] = relationship(
        secondary="reunion_user", back_populates="reuniones")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "link": self.link,
            "hora_inicio": self.hora_inicio.strftime("%H:%M") if self.hora_inicio else None,
            "duracion": self.duracion.strftime("%H:%M") if self.duracion else None
        }

reunion_user = Table(
    "reunion_user",
    db.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("reunion_id", ForeignKey("reunion.id"))
)

class Fichaje(db.Model):
    __tablename__ = "fichaje"

    id: Mapped[int] = mapped_column(primary_key=True)
    entrada: Mapped[datetime.time] = mapped_column(nullable=True)
    salida: Mapped[datetime.time] = mapped_column(nullable=True)
    fecha: Mapped[datetime.date] = mapped_column(nullable=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    user: Mapped["User"] = relationship(back_populates="fichajes")

    def serialize(self):
        return {
            "id": self.id,
            "entrada": self.entrada.strftime("%H:%M") if self.entrada else None,
            "salida": self.salida.strftime("%H:%M") if self.salida else None,
            "fecha": self.fecha.strftime('%Y-%m-%d') if self.fecha else None,
            "user_id": self.user_id
        }

class Proyecto(db.Model):
    __tablename__ = "proyecto"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(), nullable=True)
    estado: Mapped[Estado] = mapped_column(
        Enum(Estado), nullable=False, default=Estado.pendiente)

    users: Mapped[List["User"]] = relationship(
        secondary="proyecto_user", back_populates="proyectos")

    tareas: Mapped[List["Tarea"]] = relationship(back_populates="proyecto")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "estado": self.estado.value,
            "tareas": [t.serialize() for t in self.tareas]
        }


proyecto_user = Table(
    "proyecto_user",
    db.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("proyecto_id", ForeignKey("proyecto.id"))
)


class Tarea(db.Model):
    __tablename__ = "tarea"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    estado: Mapped[Estado] = mapped_column(
        Enum(Estado), nullable=False, default=Estado.pendiente)

    proyecto_id: Mapped[int] = mapped_column(
        ForeignKey("proyecto.id"), nullable=False)
    proyecto: Mapped["Proyecto"] = relationship(back_populates="tareas")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "estado": self.estado.value,
            "proyecto_id": self.proyecto_id
        }
