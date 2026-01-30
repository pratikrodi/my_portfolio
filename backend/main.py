from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import json
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = FastAPI(title="Portfolio Contact API")

# CORS configuration - allows your React app to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Contact form data model
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

# In-memory storage (for development - use database in production)
messages_db = []

@app.get("/")
async def root():
    return {
        "message": "Portfolio Contact API",
        "status": "running",
        "endpoints": {
            "/api/contact": "POST - Submit contact form",
            "/api/messages": "GET - View all messages (dev only)"
        }
    }

@app.post("/api/contact")
async def submit_contact(contact: ContactMessage):
    """
    Endpoint to handle contact form submissions.
    Saves the message and optionally sends an email notification.
    """
    try:
        # Create message record
        message_record = {
            "id": len(messages_db) + 1,
            "name": contact.name,
            "email": contact.email,
            "message": contact.message,
            "timestamp": datetime.now().isoformat(),
            "status": "received"
        }
        
        # Store in database (in-memory for now)
        messages_db.append(message_record)
        
        # Optional: Send email notification
        # Uncomment and configure the send_email_notification function below
        send_email_notification(contact)
        
        print(f"New contact message from {contact.name} ({contact.email})")
        print(f"Message: {contact.message}")
        
        return {
            "status": "success",
            "message": "Your message has been received! I'll get back to you soon.",
            "id": message_record["id"]
        }
        
    except Exception as e:
        print(f"Error processing contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process message")

@app.get("/api/messages")
async def get_messages():
    """
    Development endpoint to view all received messages.
    In production, add authentication here!
    """
    return {
        "total": len(messages_db),
        "messages": messages_db
    }

@app.delete("/api/messages/{message_id}")
async def delete_message(message_id: int):
    """
    Delete a specific message by ID.
    In production, add authentication!
    """
    global messages_db
    messages_db = [msg for msg in messages_db if msg["id"] != message_id]
    return {"status": "deleted", "id": message_id}

# Optional: Email notification function
import requests

def send_email_notification(contact: ContactMessage):
    """Send email using Brevo API (Works on Render, no SMTP needed)."""

    BREVO_API_KEY = os.getenv("BREVO_API_KEY")
    RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL")

    if not BREVO_API_KEY or not RECIPIENT_EMAIL:
        print("❌ Missing BREVO_API_KEY or RECIPIENT_EMAIL in environment variables")
        return

    email_data = {
        "sender": {"name": "Portfolio Contact", "email": RECIPIENT_EMAIL},
        "to": [{"email": RECIPIENT_EMAIL}],
        "subject": f"New Portfolio Message from {contact.name}",
        "htmlContent": f"""
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Message:</strong></p>
            <p>{contact.message}</p>
        """
    }

    try:
        response = requests.post(
            "https://api.brevo.com/v3/smtp/email",
            headers={
                "accept": "application/json",
                "api-key": BREVO_API_KEY,
                "content-type": "application/json"
            },
            json=email_data
        )

        if response.status_code == 201:
            print("✅ Email sent successfully via Brevo")
        else:
            print("❌ Email failed:", response.text)

    except Exception as e:
        print(f"❌ Email error: {str(e)}")


# Run with: uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)