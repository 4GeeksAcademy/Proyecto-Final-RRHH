import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
import enum
from sqlalchemy import String, Boolean, Enum, ForeignKey
from typing import List

db = SQLAlchemy()

class EstadoUser(enum.Enum):
    activo = "Activo"
    ausente = "Ausente"
    ocupado = "Ocupado"
    no_molestar = "No Molestar"

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(30), nullable=False)
    apellidos: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    dni: Mapped[str] = mapped_column(String(9), unique=True, nullable=False)
    foto_perfil: Mapped[str] = mapped_column(String(), nullable=True, default="logo.png")
    estado: Mapped[EstadoUser]

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "email": self.email,
            "dni": self.dni,
            "foto_perfil": self.foto_perfil,
            "estado": self.estado.value
        }

class Rol(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    es_admin: Mapped[bool] = mapped_column(Boolean())
    puede_crear_reunion: Mapped[bool] = mapped_column(Boolean())
    puede_compartir_reunion: Mapped[bool] = mapped_column(Boolean())
    puede_invitar_proyectos: Mapped[bool] = mapped_column(Boolean())

    def serialize(self):
        return{
            "id": self.id,
            "nombre": self.nombre,
            "es_admin": self.es_admin,
            "puede_crear_reunion": self.puede_crear_reunion,
            "puede_compartir_reunion": self.puede_compartir_reunion,
            "puede_invitar_proyectos": self.puede_invitar_proyectos
        }
    
class Horario(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
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

    def serialize(self):
        return{
            "id": self.id,
            "lunes_entrada": self.lunes_entrada,
            "lunes_salida": self.lunes_salida,
            "martes_entrada": self.martes_entrada,
            "martes_salida": self.martes_salida,
            "miercoles_entrada": self.miercoles_entrada,
            "miercoles_salida": self.miercoles_salida,
            "jueves_entrada": self.jueves_entrada,
            "jueves_salida": self.jueves_salida,
            "viernes_entrada": self.viernes_entrada,
            "viernes_salida": self.viernes_salida,
            "sabado_entrada": self.sabado_entrada,
            "sabado_salida": self.sabado_salida,
            "domingo_entrada": self.domingo_entrada,
            "domingo_salida": self.domingo_salida
        }
    
class Empresa(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(50), nullable=False)
    imaen: Mapped[str] = mapped_column(String(), nullable=False)

    def serialize(self):
        return{
            "id": self.id,
            "nombre": self.nombre,
            "imagen": self.imagen
        }