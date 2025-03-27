import os
from google.cloud import dialogflow_v2 as dialogflow

# Set authentication
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:/Users/shamb/TherapyBot/dialogflow-key.json"

# Dialogflow setup
PROJECT_ID = "n-mentalhealthbuddy--vkhk"  # Replace with your actual project ID
SESSION_ID = "123456"  # Unique session ID for each conversation

def detect_intent_texts(project_id, session_id, text, language_code="en"):
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(project_id, session_id)

    text_input = dialogflow.TextInput(text=text, language_code=language_code)
    query_input = dialogflow.QueryInput(text=text_input)

    response = session_client.detect_intent(request={"session": session, "query_input": query_input})

    return response.query_result.fulfillment_text

# Test query
user_input = "Hello, how are you?"
response_text = detect_intent_texts(PROJECT_ID, SESSION_ID, user_input)
print("🤖 Dialogflow Response:", response_text)
