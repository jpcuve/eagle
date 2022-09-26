# eagle

Go to google cloud console and create a project 'eagle', or some other name.
For development you will need a json access key for remote access to 'eagle': go to 'IAM & Administration', 
'service accounts', 'create a service account'. You must add the 'owner' role to the service account.
Then after creation on the 'keys' tab you can create & download a json key.
You put your key in your home folder, and then update config.py

In production no key is necessary, this is why I only point to it in development mode.