FROM tiangolo/uvicorn-gunicorn-starlette:python3.11

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./ /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]