from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from databases import Database
import sqlalchemy
from sqlalchemy import Table, Column, Integer, String, MetaData
import os

metadata = MetaData()

documents = sqlalchemy.Table(
    "documents",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("type", sqlalchemy.String),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("thumbnail", sqlalchemy.String),
    sqlalchemy.Column("position", sqlalchemy.Integer),
    schema='app'
)

app = Starlette()
# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Only allow same-site requests
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.route("/")
async def homepage(request):
    return JSONResponse({"message": "Hello World!"})

# Example database connection (adjust with your actual settings)
DATABASE_URL = os.getenv('DATABASE_URL');
database = Database(DATABASE_URL)
engine = sqlalchemy.create_engine(DATABASE_URL);
metadata.create_all(engine)


@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.route("/")
async def homepage(request):
    return JSONResponse({"message": "Hello World!"})

@app.route("/data", methods=["GET"])
async def get_data(request):
    query = documents.select().order_by(documents.c.position.asc())
    results = await database.fetch_all(query)
    print(results)
    return JSONResponse([dict(result) for result in results])


@app.route("/data", methods=["POST"])
async def save_data(request: Request):
    collection = await request.json()
    if isinstance(collection, list):
        for data in collection:
            query = documents.select().where(documents.c.id == data["id"] and documents.c.position != data["position"])
            result = await database.fetch_one(query)
            
            if result:
                update_query = documents.update().where(documents.c.id == data["id"]).values(position=data["position"])
                await database.execute(update_query)
        return JSONResponse({"message": "Data inserted successfully!"})
    else:
         return JSONResponse({"error": "Request body should be a JSON array"}, status_code=400)

