from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os
import requests
from pymongo import MongoClient
# from bson import ObjectId
# import json
from flask import jsonify
uri = os.getenv("MONGODB_URI")
# Create a new client and connect to the server
client = MongoClient(uri)
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

app = Flask(__name__)
CORS(app)

info = {
    "backstory": "",
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

    backstory_prompt = f"Give me a short backstory (MAXIMUM 30 words) for a {gender} {species} named {name} who lives in {location} and is {description}"
    story_prompt = f"Write me a short story (MAXIMUM 100 words) about {name} with the theme of {theme} in {location}"
    keywords_prompt = "Give me a few keywords from that story"

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
        backstory_response = send_request(backstory_prompt)
        if 'choices' in backstory_response and backstory_response['choices']:
            last_message = backstory_response['choices'][0]['message']['content']
            backstory_text = last_message.strip()
        else:
            raise ValueError("Invalid response from OpenAI API")

        story_response = send_request(story_prompt)
        if 'choices' in story_response and story_response['choices']:
            last_message = story_response['choices'][0]['message']['content']
            story_text = last_message.strip()
        else:
            raise ValueError("Invalid response from OpenAI API")

        keywords_response = send_request(keywords_prompt)
        if 'choices' in story_response and story_response['choices']:
            last_message = story_response['choices'][0]['message']['content']
            story_text = last_message.strip()
        else:
            raise ValueError("Invalid response from OpenAI API")

        
        image_prompt = f"Create a pixel art style image of a {gender} {species} named {name}"
        image_response = openai.Image.create(
            model="dall-e-3",
            prompt=image_prompt,
            size="1024x1024",
            quality="standard",
            n=1
        )
        image_url = image_response['data'][0]['url']

        info = {
            "name": name,
            "backstory": backstory_text,
            "story": story_text,
            "image_url": image_url
        }
        db = client["Gallery"]  
        characters = db["Prompts"]
        characters.insert_one(info)
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    if '_id' in info:
        info['_id'] = str(info['_id'])
    return jsonify(info)

@app.route('/post', methods=['GET'])
def get_story():
    return jsonify(info)

@app.route('/gallery', methods=['GET'])
def get_character_list():
    db = client["Gallery"]
    character_list = db["Prompts"]
    try:
        characters = list(character_list.find().sort('_id', -1).limit(3))
        for character in characters:
            character['_id'] = str(character['_id'])
        return jsonify(characters)
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(port=3001)