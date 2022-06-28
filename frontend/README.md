# Gym Log (frontend)

## Local development

Setup local environment for the development process in the current directory `gym-log/frontend`.

### Run in a terminal

Run in the terminal:

```shell
npm install 
npm start
```

### Run in a docker

```shell
docker build -t frontend:latest .   
docker run -it -p 3000:3000 frontend:latest
```