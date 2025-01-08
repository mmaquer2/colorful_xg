FROM python:3.9-slim

WORKDIR /code

# Copy requirements.txt from api directory
COPY api/requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY api/app /code/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]