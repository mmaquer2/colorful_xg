# colorful_xg

making cool soccer visualizations with the statsbomb open data set. The goal of this project is to present soccer match data in an interesting and interactive way.

the data from this application is sourced from statsbomb open data set, which is a collection of soccer match data that is freely available for public use. The data is available in json format and contains detailed information about soccer matches, players, and events that occur during the matches. More details can be viewed on the statsbomb website: https://statsbomb.com/what-we-do/soccer-data/

also view the statsbombpy for more information on how to use the statsbomb data:
https://github.com/statsbomb/statsbombpy


### Technologies Used

- FastAPI
- React (via Vite) and typescript
- Docker and Docker Compose


## developer setup and dependencies installation


1. Clone the repository

2. Setup python virtual environment from scratch (the backend via fastapi)

docs from fastapi on setting up a virtual environment:
https://fastapi.tiangolo.com/virtual-environments/?h=virt#create-a-virtual-environment


```bash
cd colorful_xg/api/app 

# create a virtual environment
python3 -m venv .venv

# use the virtual environment 
source .venv/bin/activate

# verify that you are using the virtual environment
which python

# upgrade pip
pip install --upgrade pip

# install dependencies
pip install -r ../requirements.txt

## update gitignore with the venv directory
echo "*" > .venv/.gitignore

```

3. Setup the frontend

```bash

# created with vite using the react-ts template
npm create vite@latest colorful-xg -- --template react-ts

cd colorful_xg/app

# install dependencies
npm install

```

4. Run the backend

```bash
 fastapi dev main.py
```

5. Run the frontend

```bash
 npm run dev
```


## Containerization with Docker and Docker Compose

these applications can be run in containers using docker and docker-compose, which is useful for deployment and testing in a controlled environment and reproducibility.

1. Build the images

```bash

# build the front and backend images
docker build -t colorful_xg_api -f api/Dockerfile .
dcoker build -t colorful_xg_app -f app/Dockerfile .

```

2. Run the containers

```bash

# run the containers
docker-compose up

```

3. Stopping the containers

```bash
docker-compose down
```


### Testing

Run the test suite(s)

```bash
# run the tests for the api back end
coming soon

# run the tests for the front end
coming soon

```



## Contributing
coming soon
