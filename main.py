import logging
import os
import random

from flask import Flask, redirect, url_for, render_template, request, current_app, Response
from google.cloud import storage

CONFIGURATION_LOCATION = 'FLASK_CONFIG'

app = Flask(__name__)
app.config.from_object('config')  # read from config.py into app.config
if CONFIGURATION_LOCATION in os.environ.keys():  # if FLASK_CONFIG defined in environment
    app.config.from_envvar(CONFIGURATION_LOCATION)  # then overwrite app.config from that file

development = app.config['ENV'] == 'development'
if development:  # if working from my pc
    # point GOOGLE_APPLICATION_CREDENTIALS to my json credentials file
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = str(app.config['PATH_TO_GCP_CREDENTIALS'])
    # lower logging level to DEBUG
    logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.DEBUG)

# setup logging
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s',
                    level=logging.DEBUG if development else logging.INFO)

# reading image file names from a bucket in Google Cloud Storage, and putting them
# into an array. That will be my model for this demo.
gcs_client = storage.Client()
model = [blob.name for blob in gcs_client.list_blobs(app.config['BUCKET_NAME'])]


@app.route('/')
def home():
    return render_template('index.html', output=[])  # redirects / to your home page


@app.route('/process', methods=['POST'])
def process():
    search = request.form.get('search')
    current_app.logger.debug(f"Search: {search}")
    # for the demo all I do is randomize the image names to present them in a different order
    output = model.copy()
    random.shuffle(output)
    return render_template('index.html', output=output)  # return to your home page, with result data


@app.route('/get-image/<filename>')
def get_image(filename: str):
    current_app.logger.debug(filename)
    # I am using the filename to fetch the image data on GCS
    bucket = gcs_client.bucket(app.config['BUCKET_NAME'])
    blob = bucket.blob(filename)
    data = blob.download_as_bytes()
    # ok you will probably not have svg but png or jpeg
    # if you need to do some image processing, you can do it here
    return Response(data, mimetype='image/svg+xml')


@app.route('/favicon.ico')
def favicon():
    return redirect(url_for('static', filename='favicon.ico'))  # choose your own web site icon


@app.route("/hello-world")
def hello_world():
    return model  # loaded from dummy_model.txt
