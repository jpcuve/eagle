# eagle

Go to google cloud console and create a project 'eagle'
For development you will need a json access key for remote access to 'eagle': go to 'IAM & Administration', 
'service accounts', 'create a service account'. On the 'keys' tab you can create & download a json key.
I have put my own key in the project but that is a big no no. You put your key in your home folder, and then
you point to it using the GOOGLE_CLOUD_CREDENTIALS environment variable.

With Google Cloud Platform: once you deploy on GCP, Google Cloud Storage is available without any
credentials. But when you develop from your PC, you need to load a json key that gives you access
to your GCP project from your PC. Here I give you a key that gives you access to my private GPC account;
you will need to replace it with your own.
