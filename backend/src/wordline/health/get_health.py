from datetime import UTC, datetime

from fastapi import APIRouter
from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    timestamp: str


router = APIRouter(prefix="/v1/health", tags=["health"])


@router.get("/", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    return HealthResponse(
        status="OK",
        timestamp=datetime.now(UTC).isoformat(),
    )
