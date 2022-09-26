import logging
import os
import random
from pathlib import Path

from flask import Flask, redirect, url_for, render_template, request, current_app, send_file, jsonify
from flask_cors import CORS

CONFIGURATION_LOCATION = 'FLASK_CONFIG'

app = Flask(__name__)
CORS(app)
app.config.from_object('config')  # read from config.py into app.config
if CONFIGURATION_LOCATION in os.environ.keys():  # if FLASK_CONFIG defined in environment
    app.config.from_envvar(CONFIGURATION_LOCATION)  # then overwrite app.config from that file

development = app.config['ENV'] == 'development'
if development:  # if working from my pc
    # point GOOGLE_APPLICATION_CREDENTIALS to my json credentials file
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = str(app.config['PATH_TO_GCP_CREDENTIALS'])

# setup logging
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s',
                    level=logging.DEBUG if development else logging.INFO)


# reading image file names from a bucket in Google Cloud Storage, and putting them
# into an array. That will be my model for this demo.
# gcs_client = storage.Client()
# model = [blob.name for blob in gcs_client.list_blobs(app.config['BUCKET_NAME'])]


@app.route('/')
def home():
    # redirects / to your home page
    return redirect('/app/home')


# @app.route('/app/')
# def app():
#     return app_more(None)


@app.route('/app/<path:text>')
def app_more(text: str):
    index = Path(__file__).parent / 'static' / 'build' / 'index.html'
    return send_file(str(index), mimetype='text/html')


@app.route('/process', methods=['POST'])
def process():
    search = request.form.get('search')
    current_app.logger.debug(f"Search: {search}")
    # for the demo all I do is randomize the image names to present them in a different order
    # output = model.copy()
    output = []
    random.shuffle(output)
    # return to your home page, with result data
    return render_template('index.html', output=output, captcha_site_key=current_app.config['CAPTCHA_SITE_KEY'])


# @app.route('/get-image/<filename>')
# def get_image(filename: str):
#     current_app.logger.debug(filename)
# I am using the filename to fetch the image data on GCS
# bucket = gcs_client.bucket(app.config['BUCKET_NAME'])
# blob = bucket.blob(filename)
# data = blob.download_as_bytes()
# ok you will probably not have svg but png or jpeg
# if you need to do some image processing, you can do it here
# I just output the data from the blob
# return Response(data, mimetype='image/svg+xml')


@app.route('/api/search', methods=['POST'])
def search():
    data = request.json
    print(data)
    return jsonify([{'filename': f'image-{i}'} for i in range(1000)])


@app.route('/favicon.ico')
def favicon():
    return redirect(url_for('static', filename='favicon.ico'))  # choose your own icon


@app.route("/hello-world")
def hello_world():
    return ",".join(model)
