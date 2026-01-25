from fastapi import FastAPI
from pydantic import BaseModel
from qm_api import quine_mccluskey_with_steps
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(title="Boolean Minimizer API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QMRequest(BaseModel):
    minterms: list[int]
    dontcares: list[int] = []

@app.post("/simplify")
def simplify_boolean(req: QMRequest):
    return quine_mccluskey_with_steps(
        req.minterms,
        req.dontcares
    )

@app.get("/")
def root():
    return {"status": "Backend running"}