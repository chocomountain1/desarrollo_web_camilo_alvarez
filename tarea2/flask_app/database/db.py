from sqlalchemy import create_engine, Column, Integer, BigInteger, String, ForeignKey, DateTime, Enum, text
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
import enum

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306

DATABASE_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

# --- ENUMS ---
class TemaEnum(str, enum.Enum):
    música = "Música,"
    deporte = "Deporte,"
    ciencias = "Ciencias,"
    religión = "Religión,"
    política = "Política,"
    tecnología = "Tecnología,"
    juegos = "Juegos,"
    baile = "Baile,"
    comida = "Comida,"
    otro = "Otro,"

class ContactoEnum(str, enum.Enum):
    whatsapp = "Whatsapp"
    telegram = "Telegram"
    X = "X"
    instagram = "Instagram"
    tiktok = "Tiktok"
    otra = "Otra"

# --- MODELOS ---

class Region(Base):
    __tablename__ = 'region'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(200), nullable=False)

    comunas = relationship("Comuna", back_populates="region")


class Comuna(Base):
    __tablename__ = 'comuna'

    id = Column(Integer, primary_key=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(Integer, ForeignKey('region.id'), nullable=False)

    region = relationship("Region", back_populates="comunas")
    actividades = relationship("Actividad", back_populates="comuna")


class Actividad(Base):
    __tablename__ = 'actividad'

    id = Column(Integer, primary_key=True)
    comuna_id = Column(Integer, ForeignKey('comuna.id'), nullable=False)
    sector = Column(String(100))
    nombre = Column(String(200), nullable=False)
    email = Column(String(100), nullable=False)
    celular = Column(String(15))
    dia_hora_inicio = Column(DateTime, nullable=False)
    dia_hora_termino = Column(DateTime)
    descripcion = Column(String(500))

    comuna = relationship("Comuna", back_populates="actividades")
    temas = relationship("ActividadTema", back_populates="actividad", cascade="all, delete-orphan")
    contactos = relationship("ContactarPor", back_populates="actividad", cascade="all, delete-orphan")
    fotos = relationship("Foto", back_populates="actividad", cascade="all, delete-orphan")


class ActividadTema(Base):
    __tablename__ = 'actividad_tema'

    id = Column(Integer, primary_key=True)
    tema = Column(Enum(TemaEnum), nullable=False)
    glosa_otro = Column(String(15))
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad = relationship("Actividad", back_populates="temas")


class ContactarPor(Base):
    __tablename__ = 'contactar_por'

    id = Column(Integer, primary_key=True)
    nombre = Column(Enum(ContactoEnum), nullable=False)
    identificador = Column(String(150))
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad = relationship("Actividad", back_populates="contactos")


class Foto(Base):
    __tablename__ = 'foto'

    id = Column(Integer, primary_key=True)
    ruta_archivo = Column(String(300), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    actividad_id = Column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad = relationship("Actividad", back_populates="fotos")

# ---Database Functions--- #

def create_activity(nombre,email,celular,sector,dia_hora_inicio,dia_hora_termino,descripcion,comuna_id):
    session = SessionLocal()
    nueva_actividad = Actividad(
        nombre=nombre,
        sector=sector,
        email=email,
        celular=celular,
        dia_hora_inicio=dia_hora_inicio,
        dia_hora_termino=dia_hora_termino,
        descripcion=descripcion,
        comuna_id=comuna_id
        ) #Preguntamos al form por los datos correspondientes a la actividad que estamos agregando
    session.add(nueva_actividad) #Agregamos la actividad a la respectiva tabla de Actividad definida en db
    session.commit()
    session.close()

def register_activity(nombre,email,celular,sector,dia_hora_inicio,dia_hora_termino,descripcion,comuna_id):
    create_activity(nombre=nombre,email=email,celular=celular,sector=sector,dia_hora_inicio=dia_hora_inicio,dia_hora_termino=dia_hora_termino,descripcion=descripcion,comuna_id=comuna_id)
    return True,""

def create_photo(nombres_archivos,rutas_archivos):
    session = SessionLocal()
    data_archivos = zip(nombres_archivos,rutas_archivos)
    for nombre_archivo,ruta_archivo in data_archivos:
        nueva_foto = Foto(
                    nombre_archivo = nombre_archivo,
                    ruta_archivo = ruta_archivo,
                    actividad_id = session.execute(text("SELECT COUNT(*) FROM actividad")).scalar() #Aquí ejecutamos una instruccion de SQL para obtener el proximo id de la actividad
                )
        session.add(nueva_foto) 
        session.commit() #Mandamos los cambios
        session.close()

def register_photo(nombres_archivos, rutas_archivos):
    create_photo(nombres_archivos=nombres_archivos, rutas_archivos=rutas_archivos)
    return True,""
