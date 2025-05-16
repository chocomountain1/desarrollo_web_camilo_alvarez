#Validation.py

import re
from datetime import datetime
import filetype

def validar_nombre(nombre):
    if not nombre:
        return "El nombre es obligatorio", 400

def validar_region(region):
    if not region:
        return "La región no fue seleccionada", 400
    
def validar_comuna(comuna):
    if not comuna:
        return "La comuna no fue seleccionada", 400
    
def validar_archivo(files):
    for file in files:
        tipo = filetype.guess(file)
        if tipo is None or tipo.mime.split('/')[0] != 'image':
            return "Archivo no válido. Debe ser una imagen", 400 #Buscamos que los archivos sean solo de tipo image
    
def validar_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+",email) #Buscamos un correo del tipo algo + @ + algo + . + algo

def validar_celular(celular):
    if celular == "":
        return 
    else:
        if not celular[1:].isdigit():
            return "El celular debe ser numérico", 400

def validar_fechas(inicio_str, termino_str):
    try:
        inicio = datetime.strptime(inicio_str, '%Y-%m-%dT%H:%M')
        termino = datetime.strptime(termino_str, '%Y-%m-%dT%H:%M')
        return inicio < termino
    except ValueError:
        return False

def validar_tema(temas):
    for tema in temas or tema == "":
        if not tema:
            return "La elección de almenos un tema es obligatorio", 400
        
def validar_fotos(fotos):
    for foto in fotos:
        if not foto:
            return "La elección de almenos una foto es obligatoria", 400
