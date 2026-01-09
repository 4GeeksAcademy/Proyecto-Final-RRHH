from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(30), nullable=False)
    apellidos: Mapped[str] = mapped_column(String(50), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    dni: Mapped[str] = mapped_column(String(9), unique=True, nullable=False)
    foto_perfil: Mapped[str] = mapped_column(String(), nullable=True, default="logo.png")


    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "email": self.email,
            "dni": self.dni,
            "foto_perfil": self.foto_perfil
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