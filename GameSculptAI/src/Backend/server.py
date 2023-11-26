from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)

info = {
    "background": "",
    "story": ""
}

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/post', methods=['POST'])
def post_story():
    global info
    openai_api_key = os.getenv("OPENAI_API_KEY")

    data = request.json

    name = data['characterName']
    species = data['species']
    gender = data['gender']
    description = data['characterDescription']
    theme = data['themes']
    location = data['location']

    background_prompt = f"Give me a short backstory (MAXIMUM 30 words) for a {gender} {species} named {name} who lives in {location} and is {description}"
    story_prompt = f"Write me a short story (MAXIMUM 30 words) about {name} with the theme of {theme} in {location}"

    headers = {
        "Authorization": f"Bearer {openai_api_key}"
    }

    def send_request(prompt):
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json={
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": prompt}]
            }
        )
        return response.json()

    try:
        background_response = send_request(background_prompt)
        if 'choices' in background_response and background_response['choices']:
            last_message = background_response['choices'][0]['message']['content']
            background_text = last_message.strip()
        else:
            raise ValueError("Invalid response from OpenAI API")

        story_response = send_request(story_prompt)
        if 'choices' in story_response and story_response['choices']:
            last_message = story_response['choices'][0]['message']['content']
            story_text = last_message.strip()
        else:
            raise ValueError("Invalid response from OpenAI API")

        info = {
            "background": background_text,
            "story": story_text
        }

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

    return jsonify(info)

@app.route('/post', methods=['GET'])
def get_story():
    return jsonify(info)

if __name__ == '__main__':
    app.run(port=3001)