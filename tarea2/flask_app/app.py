from flask import Flask, request, render_template, redirect,url_for, session as flask_session, flash, jsonify
from utils.validations import validate_add_activity
from database import db
from werkzeug.utils import secure_filename
import filetype
import os
from sqlalchemy import text, extract, func, case
from utils.validations import validar_archivo, validar_celular, validar_comuna, validar_email,validar_fotos,validar_nombre,validar_region,validar_tema, validar_nombre_comentario,validar_texto_comentario
import calendar

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

        ##Actividad##
        nombre=request.form['nombre']
        email = request.form['email']
        celular = request.form['celular']
        sector = request.form['sector']
        dia_hora_inicio=request.form['dia_hora_inicio']
        dia_hora_termino=request.form['dia_hora_termino']
        descripcion = request.form['descripcion']
        comuna_id = request.form['comuna']

        error = "" #por ahora el error queda vacío

        flask_session["form_data"] = {"nombre": nombre, "sector": sector, "email": email, "celular":celular, "dia_hora_inicio":dia_hora_inicio, "dia_hora_termino": dia_hora_termino, "descripcion": descripcion, "comuna":comuna_id}
        if validate_add_activity(nombre,email,celular):
            #lo tratamos de registrar en la base de datos, llamando la funcion que se encarga de eso
            status, msg = db.register_activity(nombre,email,celular,sector,dia_hora_inicio,dia_hora_termino,descripcion,comuna_id)
        else:
            error += msg
            flash(error)
            return redirect(url_for('add_activity'))
            
        ##Fotos_actividad##

        files = request.files.getlist('foto') #Guardamos los files de la fotos en una lista de files
        lista_nombres = [] #guardamos los nombres para despues pasarselos al html en caso de errores de envio
        rutas_archivos = []
        if not validar_archivo(files=files):
            msg = "¡Tipos de archivos subidos no válidos!"
            error += msg
            flash(error)
            return redirect(url_for('add_activity'))
        for file in files:
             nombre_archivo = secure_filename(file.filename) #Accedemos de forma segura al nombre del archivo
             lista_nombres.append(nombre_archivo)
             ruta_archivo = os.path.join(app.config['UPLOAD_FOLDER'], nombre_archivo) #Guardamos la ruta del archivo en uploads de static, definido por flask
             rutas_archivos.append(ruta_archivo)
             file.save(ruta_archivo) #Guardamos el file en esta carpeta para mostrarla en el futuro ya que sabemos donde se guardó
        if validar_fotos(lista_nombres):
            status, msg = db.register_photo(nombres_archivos=lista_nombres,rutas_archivos=rutas_archivos)
        else:
            msg = "¡Almenos debe haber una foto!"
            error += msg
            flash(error)
            return redirect(url_for('add_activity'))
        
        ##Tema_actividad##
        temas = request.form.getlist('tema')
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

        flask_session.pop("form_data",None) #Sacamos los datos guardados pues fueron aceptados
        return redirect(url_for('saved_msg'))
    #El método es GET
    datos = flask_session.get("form_data", {})
    return render_template('formulario_agregar_actividades.html', datos = datos)
    
    
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

@app.route('/chart_data')
def chart_data():
    conteo_por_dia = (
        session.query(
            func.date(db.Actividad.dia_hora_inicio).label('dia'),func.count().label('cantidad')
        ).group_by(func.date(db.Actividad.dia_hora_inicio)).all()
    )
    if len(conteo_por_dia)> 0:
        dias, cantidad = zip(*conteo_por_dia)
        dias_str = [f"{d.year}/{d.month}/{d.day}" for d in dias]
        return jsonify({"status": "ok", "dias": dias_str, "cantidad": cantidad}), 200
    else:
        status = "No hay ninguna actividad agregada aún"
        flash("Aún no hay ninguna actividad para las estadísticas, agrega alguna accediendo al formulario")
        redirect(url_for('statistics'))
        return jsonify({"status": status}), 400
    
@app.route('/chart_data2')
def chart_data2():
    conteo_por_tema = (
        session.query(
            db.ActividadTema.tema.label('tema'),func.count().label('cantidad')
        ).group_by(db.ActividadTema.tema).all()
    )
    if len(conteo_por_tema)> 0:
        tema, cantidad = zip(*conteo_por_tema)
        tema = [temas.value for temas in tema]
        return jsonify({"status": "ok", "tema": tema, "cantidad": cantidad}), 200
    else:
        status = "No hay ninguna actividad agregada aún"
        flash("Aún no hay ninguna actividad para las estadísticas, agrega alguna accediendo al formulario")
        redirect(url_for('statistics'))
        return jsonify({"status": status}), 400

@app.route('/chart_data3')
def chart_data3():
    franja_horaria = case(
        (extract('hour', db.Actividad.dia_hora_inicio) < 12, 'mañana'),
        (extract('hour', db.Actividad.dia_hora_inicio) < 18, 'tarde'),
    else_='noche'
    )

    consulta = (
        session.query(
            extract('month', db.Actividad.dia_hora_inicio).label('mes'),
            franja_horaria.label('franja'),
            func.count().label('cantidad')
        )
        .group_by('mes', 'franja')
        .order_by('mes', 'franja')
        .all()
    )
    if len(consulta)> 0:
        result = []
        for c in consulta:
            nombre_mes = calendar.month_name[c[0]]
            result.append([nombre_mes, c[1],c[2]])
        
        meses, horario, cantidad = zip(*result)
        
        print(result)
        print(meses)
        return jsonify({"status": "ok", "meses": meses, "horario": horario, "cantidad": cantidad}), 200
    
    else:
        status = "No hay ninguna actividad agregada aún"
        flash("Aún no hay ninguna actividad para las estadísticas, agrega alguna accediendo al formulario")
        redirect(url_for('statistics'))
        return jsonify({"status": status}), 400

@app.route('/comments', methods=["GET","POST"])
def add_comment():
    if request.method == "POST":
        nombre = request.form['comentario_nombre']
        texto = request.form['comentario_texto']
        print("pase por aca")
    #Validamos los campos a los que accedimos antes de postearlos
        if validar_nombre_comentario(nombre)[1] and validar_texto_comentario(texto)[1]:
            #Solo si pasa esto queremos agregar a la base de datos
            print("por aca igual")
            db.register_comment(nombre, texto)
            return jsonify({"nombre": nombre, "texto": texto})
        else:
            #Si no, alertamos al usuario a través del js de la modal
            return jsonify({"data": [validar_nombre_comentario(nombre),validar_texto_comentario(texto)]})