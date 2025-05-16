from flask import Flask, request, render_template, redirect,url_for, session, flash
from database import db
from werkzeug.utils import secure_filename
import filetype
import os
from sqlalchemy import text
from utils.validations import validar_archivo, validar_celular, validar_comuna, validar_email, validar_fechas,validar_fotos,validar_nombre,validar_region,validar_tema

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


##Definición de los datos necesarios para enviar por las rutas
session = db.SessionLocal()

#--Auth routes--#
@app.route('/')
def home():
        ##Definición de los datos necesarios para enviar por las rutas
    session = db.SessionLocal()
        ##Actividades##

    actividades = session.query(db.Actividad).all() #Obtenemos todas las actividades desde la base de datos
    nombres_comunas = [] #Definimos una estructura de datos (lista) que contendrá todas los nombres de las comunas seleccionadas por la query hecha a la base de datos
    for actividad in actividades:
        nombres_comunas.append(session.query(db.Comuna).filter_by(id=actividad.comuna_id).first().nombre)#Aquí las agregamos

    ##Fotos##

    archivos = session.query(db.Foto).all() #obtenemos todas las fotos
    primeras_fotos = []
    vistos = []
    for archivo in archivos:
        if archivo.actividad_id not in vistos:
            primeras_fotos.append(archivo)
            vistos.append(archivo.actividad_id)

    max_id = session.execute(text("SELECT COUNT(*) FROM actividad")).scalar() #Necesitamos el max_id para desambiguar a que actividad pertenece cada foto,tema y contacto
    lista_fotos = []
    for i in range(1,max_id+1):
        filtered = [e for e in archivos if e.actividad_id == i] #se usa list comprehension para agrupar por id en sublist
        lista_fotos.append(filtered)

    ##Temas##

    temas = session.query(db.ActividadTema).all() #Obtenemos todos los temas de las actividades
    lista_temas = []
    for i in range(1,max_id+1):
        filtered = [e for e in temas if e.actividad_id == i] #Se usa list comprehension para agrupar por id en sublistas
        lista_temas.append(filtered)

    ##Contactos##

    contactos = session.query(db.ContactarPor).all() #Obtenemos todos los contactos
    lista_contactos = []
    for i in range(1,max_id+1):
        filtered = [e for e in contactos if e.actividad_id == i] #se usa list comprehension para agrupar por id en sublist
        lista_contactos.append(filtered)

    session.close() #Cerramos la sesión
    datos = list(zip(actividades,nombres_comunas,primeras_fotos,lista_temas)) #Hacemos una tupla con los datos que sea iterable
    return render_template('portada.html',datos=datos) #Le pasamos las actividades que estan en db, junto con los nombres de las comunas en un array, los archivos (fotos)

@app.route('/add_activity',methods=["GET","POST"])
def add_activity():
    if request.method == 'POST':
        session = db.SessionLocal() #Iniciamos una sesión en la base de datos

        ##Actividad##
        nombre=request.form['nombre']
        if type(validar_nombre(nombre)) == str:
            flash(validar_nombre)

        email = request.form['email']
        validar_email(email)

        celular = request.form['celular']
        if celular != "":
            validar_celular(celular)

        dia_hora_inicio=request.form['dia_hora_inicio']
        dia_hora_termino=request.form['dia_hora_termino']
        if not validar_fechas(dia_hora_inicio,dia_hora_termino):
            flash("hola")
            return redirect(url_for('add_activity'))

        nueva_actividad = db.Actividad(
        nombre=nombre,
        sector=request.form['sector'],
        email=email,
        celular=celular,
        dia_hora_inicio=dia_hora_inicio,
        dia_hora_termino=dia_hora_termino,
        descripcion=request.form['descripcion'],
        comuna_id=request.form['comuna']
        ) #Preguntamos al form por los datos correspondientes a la actividad que estamos agregando
        session.add(nueva_actividad) #Agregamos la actividad a la respectiva tabla de Actividad definida en db

        ##Fotos_actividad##
        session.commit() #necesitamos que se cree antes la actividad que su foto, debido a que si no la llave foránea de Foto apuntará a un id que no existe
        files = request.files.getlist('foto') #Guardamos los files de la fotos en una lista de files
        validar_fotos(files)
        for file in files:
            nombre_archivo = secure_filename(file.filename) #Accedemos de forma segura al nombre del archivo
            ruta_archivo = os.path.join(app.config['UPLOAD_FOLDER'], nombre_archivo) #Guardamos la ruta del archivo en uploads de static, definido por flask
            file.save(ruta_archivo) #Guardamos el file en esta carpeta para mostrarla en el futuro ya que sabemos donde se guardó
            nueva_foto = db.Foto(
                nombre_archivo = nombre_archivo,
                ruta_archivo = ruta_archivo,
                actividad_id = session.execute(text("SELECT COUNT(*) FROM actividad")).scalar() #Aquí ejecutamos una instruccion de SQL para obtener el proximo id de la actividad
            )
            session.add(nueva_foto) 
        session.commit() #Mandamos los cambios

        ##Tema_actividad##
        temas = request.form.getlist('tema')
        validar_tema(temas)
        glosa_otro = request.form.get('otro')
        if glosa_otro is None:
            glosa_otro = "no_aplica"
        for tema in temas:
            nuevo_tema = db.ActividadTema(
            tema=tema,
            glosa_otro=glosa_otro,
            actividad_id = session.execute(text("SELECT COUNT(*) FROM actividad")).scalar() #Aquí ejecutamos una instruccion de SQL para obtener el proximo id de la actividad
            )
            session.add(nuevo_tema) #Agregamos el tema

        ##Contacto##
        #si bien no lo usaremos para mostrar las actividades guardadas en la portada, aprovechamos de captarlos para agregarlos a la db

        nombres = request.form.getlist('contacto')
        identificadores = request.form.getlist('rss')
        
        for nombre,identificador in zip(nombres,identificadores):
            nuevo_contacto = db.ContactarPor(
                nombre = nombre,
                identificador = identificador,
                actividad_id = session.execute(text("SELECT COUNT(*) FROM actividad")).scalar()
        )
            session.add(nuevo_contacto)
        session.commit() #Mandamos los cambios
        return redirect(url_for('saved_msg'))
    return render_template('formulario_agregar_actividades.html')
    
@app.route('/activity_list',methods=["GET","POST"])
def activity_list():
    ##Definición de los datos necesarios para enviar por las rutas
    session = db.SessionLocal()
        ##Actividades##

    actividades = session.query(db.Actividad).all() #Obtenemos todas las actividades desde la base de datos
    nombres_comunas = [] #Definimos una estructura de datos (lista) que contendrá todas los nombres de las comunas seleccionadas por la query hecha a la base de datos
    for actividad in actividades:
        nombres_comunas.append(session.query(db.Comuna).filter_by(id=actividad.comuna_id).first().nombre)#Aquí las agregamos

    ##Fotos##

    archivos = session.query(db.Foto).all() #obtenemos todas las fotos
    primeras_fotos = []
    vistos = []
    for archivo in archivos:
        if archivo.actividad_id not in vistos:
            primeras_fotos.append(archivo)
            vistos.append(archivo.actividad_id)

    max_id = session.execute(text("SELECT COUNT(*) FROM actividad")).scalar() #Necesitamos el max_id para desambiguar a que actividad pertenece cada foto,tema y contacto
    lista_fotos = []
    for i in range(1,max_id+1):
        filtered = [e for e in archivos if e.actividad_id == i] #se usa list comprehension para agrupar por id en sublist
        lista_fotos.append(filtered)

    ##Temas##

    temas = session.query(db.ActividadTema).all() #Obtenemos todos los temas de las actividades
    lista_temas = []
    for i in range(1,max_id+1):
        filtered = [e for e in temas if e.actividad_id == i] #Se usa list comprehension para agrupar por id en sublistas
        lista_temas.append(filtered)

    ##Contactos##

    contactos = session.query(db.ContactarPor).all() #Obtenemos todos los contactos
    lista_contactos = []
    for i in range(1,max_id+1):
        filtered = [e for e in contactos if e.actividad_id == i] #se usa list comprehension para agrupar por id en sublist
        lista_contactos.append(filtered)

    session.close() #Cerramos la sesión
    datos = zip(actividades,nombres_comunas,lista_temas,lista_fotos,lista_contactos)
    return render_template('listado_actividades.html',datos=datos,lista_fotos=lista_fotos) #Mandamos todos los datos que requiera el listado de actividades

@app.route('/statistics',methods=["GET","POST"])
def statistics():
    return render_template('estadistica.html')

@app.route('/saved_msg',methods=["GET","POST"])
def saved_msg():
    return render_template('mensaje_guardado.html')