from fastapi import FastAPI
from app.ready import ready_app
import uvicorn
from app.auth.router import router as auth_router
from app.channel.router import router as channel_router


app: FastAPI = ready_app()

app.include_router(auth_router)
app.include_router(channel_router)

if __name__ == '__main__':
    uvicorn.run(app='main:app', host='0.0.0.0', port=8080, reload=True, log_level='info')
