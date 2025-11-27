from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import smtplib
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
def send_email_notification(contact: ContactMessage):
    """Send email notification when someone submits the contact form."""
    
    # Get email configuration from environment variables
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    SENDER_EMAIL = os.getenv("GMAIL_EMAIL")
    SENDER_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")
    RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL")
    
    if not all([SENDER_EMAIL, SENDER_PASSWORD, RECIPIENT_EMAIL]):
        print("❌ Email configuration missing in .env file")
        return
    
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECIPIENT_EMAIL
        msg['Subject'] = f"Portfolio Contact: {contact.name}"
        msg['Reply-To'] = contact.email
        
        # Email body
        body = f"""
        ========================================
        NEW CONTACT FORM SUBMISSION
        ========================================
        
        FROM: {contact.name}
        EMAIL: {contact.email}
        
        ----------------------------------------
        MESSAGE:
        ----------------------------------------
        {contact.message}
        
        ----------------------------------------
        
        To reply, just click "Reply" in your email client.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
            
        print(f"✅ Email sent successfully from {contact.name}")
        
    except Exception as e:
        print(f"❌ Failed to send email: {str(e)}")

# Run with: uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)