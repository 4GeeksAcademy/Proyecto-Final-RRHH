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
    hecho = "Hecho"
    en_proceso = "En Proceso"
    por_hacer = "Por hacer"

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
    tareas = db.relationship('Tarea', backref='user', lazy=True)

    empresa_id: Mapped[int] = mapped_column(
        ForeignKey("empresa.id"), nullable=False)
    empresa: Mapped["Empresa"] = relationship(back_populates="users")

    rol_id: Mapped[int] = mapped_column(ForeignKey("rol.id"), nullable=True)
    rol: Mapped["Rol"] = relationship(back_populates="users")

    horario_id: Mapped[int] = mapped_column(
        ForeignKey("horario.id"), nullable=True)
    horario: Mapped["Horario"] = relationship(back_populates="users")

    reuniones: Mapped[List["Reunion"]] = relationship(
        secondary="reunion_user", back_populates="usuarios")

    organizador_reunion: Mapped["Reunion"] = relationship(back_populates="organizador")

    fichajes: Mapped[List["Fichaje"]] = relationship(back_populates="user")

   

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
            "rol": self.rol.nombre,
            "horario_id": self.horario_id,
            "horario": self.horario.name,
            "tareas": self.tareas
        }

class Rol(db.Model):
    __tablename__ = "rol"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    es_admin: Mapped[bool] = mapped_column(Boolean())
    puede_crear_reunion: Mapped[bool] = mapped_column(Boolean(), default=False)
    puede_compartir_reunion: Mapped[bool] = mapped_column(
        Boolean(), default=False)
    puede_añadir_tareas: Mapped[bool] = mapped_column(
        Boolean(), default=False)
    
    empresa_id: Mapped[int] = mapped_column(ForeignKey("empresa.id"), nullable=False)
    empresa: Mapped["Empresa"] = relationship(back_populates="roles")

    users: Mapped[List["User"]] = relationship(back_populates="rol")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "es_admin": self.es_admin,
            "puede_crear_reunion": self.puede_crear_reunion,
            "puede_compartir_reunion": self.puede_compartir_reunion,
            "puede_añadir_tareas": self.puede_añadir_tareas,
            "empresa_id": self.empresa_id
        }

class Horario(db.Model):
    __tablename__ = "horario"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
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
    imagen: Mapped[str] = mapped_column(String(), nullable=False, default="logo.jpg")
   

    users: Mapped[List["User"]] = relationship(
        back_populates="empresa", cascade="all, delete-orphan")

    horarios: Mapped[List["Horario"]] = relationship(
        back_populates="empresa", cascade="all, delete-orphan")

    roles: Mapped[List["Rol"]] = relationship(back_populates="empresa")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "imagen": self.imagen,
            

        }

class Reunion(db.Model):
    __tablename__ = "reunion"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(80), nullable=True)
    link: Mapped[str] = mapped_column(String(), nullable=False)
    fecha: Mapped[datetime.datetime] = mapped_column(nullable=False)
    duracion: Mapped[int] = mapped_column(nullable=False)

    organizador_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    organizador: Mapped["User"] = relationship(back_populates="organizador_reunion")

    usuarios: Mapped[List["User"]] = relationship(
        secondary="reunion_user", back_populates="reuniones")

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "link": self.link,
            "fecha": self.fecha.isoformat() if self.fecha else None,
            "duracion": self.duracion,
            "organizador_id": self.organizador_id,
            "usuarios": [u.serialize() for u in self.usuarios]
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

    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.id"),
        nullable=False
    )

    hora_entrada: Mapped[datetime.datetime] = mapped_column(nullable=True)
    hora_salida: Mapped[datetime.datetime] = mapped_column(nullable=True)
    fecha: Mapped[datetime.date] = mapped_column(nullable=False)

    user: Mapped["User"] = relationship(back_populates="fichajes")

    def serialize(self):
        return {
            "id": self.id,
            "hora_entrada": self.hora_entrada.isoformat() if self.hora_entrada else None,
            "hora_salida": self.hora_salida.isoformat() if self.hora_salida else None,
            "fecha": self.fecha.isoformat(),
            "user_id": self.user_id
        }



class Tarea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    estado = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "estado": self.estado.value,
            "user_id": self.user_id
            
        }
    
# cambios de yessi para mensaje
