from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from email.message import EmailMessage
from datetime import datetime
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
import os
import smtplib
import requests

# Load environment variables
load_dotenv()

# Initialize Firebase
firebase_credentials = os.getenv("FIREBASE_CREDENTIALS", "firebase_service_account.json")
cred = credentials.Certificate(firebase_credentials)
firebase_admin.initialize_app(cred)
db = firestore.client()

# FastAPI app
app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📩 Contact form API
@app.post("/contact")
async def contact(name: str = Form(...), email: str = Form(...), message: str = Form(...)):
    try:
        msg = EmailMessage()
        msg["Subject"] = f"New message from {name}"
        msg["From"] = os.getenv("EMAIL_HOST_USER")
        msg["To"] = os.getenv("RECEIVER_EMAIL")
        msg.set_content(f"From: {name} <{email}>\n\n{message}")

        with smtplib.SMTP(os.getenv("EMAIL_HOST"), int(os.getenv("EMAIL_PORT"))) as server:
            server.starttls()
            server.login(os.getenv("EMAIL_HOST_USER"), os.getenv("EMAIL_HOST_PASSWORD"))
            server.send_message(msg)

        return {"success": True}
    except Exception as e:
        print("❌ Email Error:", e)
        return {"success": False, "error": str(e)}
    
    # Inside your /contact endpoint, after sending the email
visitor_ref = db.collection("visitors")\
    .where("ip", "==", request.client.host)\
    .order_by("timestamp", direction=firestore.Query.DESCENDING)\
    .limit(1)

docs = visitor_ref.stream()
for doc in docs:
    doc.reference.update({"contacted": True})

# 👁️ Visitor logging
@app.post("/track-visitor")
async def track_visitor(request: Request):
    ip = request.client.host
    user_agent = request.headers.get("user-agent")
    timestamp = datetime.utcnow()

    try:
        geo_url = f"https://ipapi.co/{ip}/json/"
        geo_data = requests.get(geo_url).json()

        city = geo_data.get("city", "Unknown")
        region = geo_data.get("region", "Unknown")
        country = geo_data.get("country_name", "Unknown")
    except Exception:
        city = region = country = "Unknown"

    log = {
        "ip": ip,
        "user_agent": user_agent,
        "timestamp": timestamp.isoformat(),
        "city": city,
        "region": region,
        "country": country,
        "contacted": False  # new field to track who contacted you
    }

    db.collection("visitors").add(log)

    return {"success": True}

# 📊 Dashboard data
@app.get("/visitor-data")
async def get_visitor_data():
    try:
        docs = db.collection("visitors").order_by("timestamp", direction=firestore.Query.DESCENDING).stream()
        logs = [doc.to_dict() for doc in docs]
        return {
            "count": len(logs),
            "logs": logs
        }
    except Exception as e:
        print("❌ Error loading visitors:", e)
        return {"success": False, "error": str(e)}


@app.get("/visitor-summary")
async def visitor_summary():
    visitors = db.collection("visitors").stream()
    contacted = db.collection("contact_messages").stream()

    total_visitors = len(list(visitors))
    contacted_visitors = len(list(contacted))

    return {
        "total_visitors": total_visitors,
        "contacted": contacted_visitors,
        "not_contacted": total_visitors - contacted_visitors
    }

