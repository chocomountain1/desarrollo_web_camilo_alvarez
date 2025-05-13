from flask import Flask, request, render_template, redirect,url_for, session
#from utils.validations 
from database import db
from werkzeug.utils import secure_filename
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/',methods=["GET","POST"])
def home():
    return render_template('portada.html')

@app.route('/add_activity',methods=["GET","POST"])
def add_activity():
    return render_template('formulario_agregar_actividades.html')