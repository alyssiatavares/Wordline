# Use a Python image with uv pre-installed
FROM ghcr.io/astral-sh/uv:python3.14-bookworm-slim

# Setup a non-root user
RUN groupadd --system --gid 999 nonroot \
    && useradd --system --gid 999 --uid 999 --create-home nonroot

# Install the project into `/app/backend`
WORKDIR /app/backend

# Enable bytecode compilation
ENV UV_COMPILE_BYTECODE=1

# Copy from the cache instead of linking since it's a mounted volume
ENV UV_LINK_MODE=copy

# Ensure installed tools can be executed out of the box
ENV UV_TOOL_BIN_DIR=/usr/local/bin

COPY pyproject.toml uv.lock ./

# Install the project's dependencies using the lockfile and settings
RUN uv sync --frozen --no-install-project

# Then, add the rest of the project source code and install it
# Installing separately from its dependencies allows optimal layer caching
COPY . .
RUN uv sync --frozen

# Place executables in the environment at the front of the path
ENV PATH="/app/backend/.venv/bin:$PATH"

# Fix permissions for the non-root user
RUN chown -R nonroot:nonroot /app/backend

# Reset the entrypoint, don't invoke `uv`
ENTRYPOINT []

# Switch to non-root user
USER nonroot

EXPOSE 8000

# Run the FastAPI application by default
# Note in production, you should use `fastapi run` instead
CMD ["python", "-m", "uvicorn", "wordline.main:app", "--host", "0.0.0.0", "--port", "8000"]
