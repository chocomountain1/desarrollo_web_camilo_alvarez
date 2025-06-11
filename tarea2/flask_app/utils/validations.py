#Validation.py

import re
from datetime import datetime
import filetype

def validar_nombre(nombre):
    if not nombre:
        return False
    else:
        return True

def validar_region(region):
    if not region:
        return False
    else:
        return True
    
def validar_comuna(comuna):
    if not comuna:
        return False
    else:
        return True
    
def validar_archivo(files):
    for file in files:
        tipo = filetype.guess(file)
        if tipo is None or tipo.mime.split('/')[0] != 'image':
            return False #Buscamos que los archivos sean solo de tipo image
        else:
            return True
def validar_email(email):
    if not bool(re.match(r"[^@]+@[^@]+\.[^@]+",email)): #Buscamos un correo del tipo algo + @ + algo + . + algo
        return False
    else:
        return True

def validar_celular(celular):
    if not celular[1:].isdigit():
        return False
    else:
        return True


def validate_add_activity(nombre,email,celular):
    return validar_nombre(nombre=nombre) and validar_email(email=email) and validar_celular(celular=celular)

def validar_tema(temas):
    for tema in temas or tema == "":
        if not tema:
            return "La elección de almenos un tema es obligatorio"
        
def validar_fotos(fotos):
    if not fotos[0]:
            return False
    else:
        return True

def validar_nombre_comentario(nombre_comentario): 
    if not nombre_comentario:
        return ["El nombre de quien comentó no puede ser vacío!", False]
    elif len(nombre_comentario) > 80 or len(nombre_comentario)<3:
        return["El nombre de quien comentó debe tener largo mínimo 3 y máximo de 80 caractéres!", False]
    else:
        return ["ok",True]

def validar_texto_comentario(comentario):
    if not comentario:
        return["El texto del comentario es obligatorio!",False]
    elif len(comentario)<5:
        return["El texto debe tener largo mínimo 5 caractéres!", False]
    else:
        return["ok", True]