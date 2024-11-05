# colorful_xg

making cool soccer visualizations with the statsbomb open data set


## developer setup and dependencies installation


1. Clone the repository

2. Setup python environment (the backend via fastapi)

```bash
cd colorful_xg/api 

# create a virtual environment
python3 -m venv venv

# use the virtual environment 
source venv/bin/activate

# verify that you are using the virtual environment
which python

# upgrade pip
pip install --upgrade pip

# install dependencies
pip install -r requirements.txt
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


# run the tests for the front end



```



## Contributing
