from flask import Flask, request, render_template, redirect,url_for, session
from database import db
from werkzeug.utils import secure_filename
import filetype
import os
from sqlalchemy import text

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#--Auth routes--#
@app.route('/')
def home():
    session = db.SessionLocal()
    ##Actividades##

    actividades = session.query(db.Actividad).all() #Obtenemos todas las actividades desde la base de datos
    nombres_comunas = [] #Definimos una estructura de datos (lista) que contendrá todas los nombres de las comunas seleccionadas por la query hecha a la base de datos
    for actividad in actividades:
        nombres_comunas.append(session.query(db.Comuna).filter_by(id=actividad.comuna_id).first().nombre)#Aquí las agregamos

    ##Fotos##

    archivos = session.query(db.Foto).all() #obtenemos todas las fotos
    primeras_fotos = []
    max_id = session.execute(text("SELECT COUNT(*) FROM actividad")).scalar()
    vistos = []
    for archivo in archivos:
        if archivo.actividad_id not in vistos:
            primeras_fotos.append(archivo)
            vistos.append(archivo.actividad_id)
    print(vistos,max_id)
    ##Temas##

    temas = session.query(db.ActividadTema).all() #Obtenemos todos los temas de las actividades
    print(len(actividades),len(nombres_comunas),len(primeras_fotos),len(temas))
    datos = list(zip(actividades,nombres_comunas,primeras_fotos,temas)) #Hacemos una tupla con los datos que sea iterable
    return render_template('portada.html',datos=datos) #Le pasamos las actividades que estan en db, junto con los nombres de las comunas en un array, los archivos (fotos)

@app.route('/add_activity',methods=["GET","POST"])
def add_activity():
    if request.method == 'POST':
        session = db.SessionLocal() #Iniciamos una sesión en la base de datos
        ##Actividad##
        nueva_actividad = db.Actividad(
        nombre=request.form['nombre'],
        sector=request.form['sector'],
        email=request.form['email'],
        celular=request.form['celular'],
        dia_hora_inicio=request.form['dia_hora_inicio'],
        dia_hora_termino=request.form['dia_hora_termino'],
        descripcion=request.form['descripcion'],
        comuna_id=request.form['comuna']
        ) #Preguntamos al form por los datos correspondientes a la actividad que estamos agregando
        session.add(nueva_actividad) #Agregamos la actividad a la respectiva tabla de Actividad definida en db

        ##Fotos_actividad##
        session.commit() #necesitamos que se cree antes la actividad que su foto, debido a que si no la llave foránea de Foto apuntará a un id que no existe
        files = request.files.getlist('foto') #Guardamos los files de la fotos en una lista de files
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
        glosa_otro = request.form.get('otro')
        if glosa_otro is None:
            glosa_otro = "no_aplica"
        nuevo_tema = db.ActividadTema(
            tema=request.form['tema'],
            glosa_otro=glosa_otro,
            actividad_id = session.execute(text("SELECT COUNT(*) FROM actividad")).scalar() #Aquí ejecutamos una instruccion de SQL para obtener el proximo id de la actividad
        )
        session.add(nuevo_tema) #Agregamos el tema
        session.commit() #Mandamos los cambios
        return redirect(url_for('saved_msg'))
    return render_template('formulario_agregar_actividades.html')
    
@app.route('/activity_list',methods=["GET","POST"])
def activity_list():
    return render_template('listado_actividades.html')

@app.route('/statistics',methods=["GET","POST"])
def statistics():
    return render_template('estadistica.html')

@app.route('/saved_msg',methods=["GET","POST"])
def saved_msg():
    return render_template('mensaje_guardado.html')