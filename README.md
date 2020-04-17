## DocApp

1. Fork the reppo and open terminal/cmd
2. Clone the repo and change directory
```
$ git clone <Repo_link>
$ cd DocApp
```
3. Create Virtualenvironment
```
$ pip install virtualenv
$ virtualenv env
$ source env/bin/activate
```
4. Install requirements
```
$ pip install -r requirements.txt
```

5. Set credentials(Put the credentials.json file in the base directory)
```
$ export GOOGLE_APPLICATION_CREDENTIALS='<credential-filename>.json'
```

6. Migrate and makemigrations
```
$ python DocApp/manage.py migrate
$ python DocApp/manage.py makemigrations
```

7. Runserver
```
$ python DocApp/manage.py runserver
```
