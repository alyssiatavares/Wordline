from fastapi import APIRouter, FastAPI

from wordline.health import health_router

app = FastAPI(title="Wordline API", version="1.0.0")
api_router = APIRouter(prefix="/api")
api_router.include_router(health_router)

app.include_router(api_router)
