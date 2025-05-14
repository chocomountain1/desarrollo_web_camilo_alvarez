from flask import Flask, request, render_template, redirect,url_for, session
from database import db
from werkzeug.utils import secure_filename
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#--Auth routes--#
@app.route('/')
def home():
    session = db.SessionLocal()
    actividades = session.query(db.Actividad).all() #Obtenemos todas las actividades desde la base de datos
    nombres_comunas = []
    for actividad in actividades:
        print(actividad.comuna_id)
        nombres_comunas.append(session.query(db.Comuna).filter_by(id=actividad.comuna_id).first().nombre)

    datos = list(zip(actividades,nombres_comunas)) #Hacemos una tupla de largo 2 con ambos datos
    return render_template('portada.html',datos=datos) #Le pasamos las actividades que estan en db, junto con los nombres de las comunas en un array

@app.route('/add_activity',methods=["GET","POST"])
def add_activity():
    if request.method == 'POST':
        session = db.SessionLocal()
        nueva_actividad = db.Actividad(
        nombre=request.form['nombre'],
        sector=request.form['sector'],
        email=request.form['email'],
        celular=request.form['celular'],
        dia_hora_inicio=request.form['dia_hora_inicio'],
        dia_hora_termino=request.form['dia_hora_termino'],
        descripcion=request.form['descripcion'],
        comuna_id=request.form['comuna']
        )
        session.add(nueva_actividad)
        session.commit()
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