
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install Python dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Api app code into the container
COPY . .

# Expose port 8000 for the server
EXPOSE 8000

# Run python fastapi app using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
