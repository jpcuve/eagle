import os
from pathlib import Path

from flask import Flask, current_app, redirect, url_for, render_template

CONFIGURATION_LOCATION = 'FLASK_CONFIG'


def load_my_model():
    with open(Path('.') / 'dummy_model.txt') as f:
        return f.read()


app = Flask(__name__)
app.config.from_object('config')  # read from config.py into app.config
if CONFIGURATION_LOCATION in os.environ.keys():  # if FLASK_CONFIG defined in environment
    app.config.from_envvar(CONFIGURATION_LOCATION)  # then overwrite app.config from that file
if app.config['ENV'] == 'development':  # if working from my pc
    # point GOOGLE_APPLICATION_CREDENTIALS to my json credentials file
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = str(app.config['PATH_TO_GCP_CREDENTIALS'])
# at this point I can attach any variable to app so that it is available anywhere: app.key = value
# for instance, my ML model
app.model = load_my_model()
print(app.model)


@app.route('/')
def home():
    # redirection de l'url principal vers la page d'accueil
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return redirect(url_for('static', filename='favicon.ico'))


@app.route("/hello-world")
def hello_world():
    return current_app.model  # loaded from dummy_model.txt

