"""
Routes and views for the flask application.
"""
import json

from datetime import datetime
from flask import Flask, request, jsonify, make_response
from flask_restful import Api, Resource
from .model import Recipe
from database import db
from flask import Flask
from database import db
from flask_cors import CORS
import cryptography
import time    



#creating the app and sending it to the mysql database
def create_app():
    app = Flask(__name__)
    app.config['DEBUG'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:ZaphodBeeblebrox42@localhost:3306/flaskapp"
    CORS(app)
    db.init_app(app)
    return app

app = create_app()

api = Api(app)

class Recipes(Resource):
	
	# get response for /. simply returns all available data
	def get(self):
		recipes = Recipe.query.all()
		response = jsonify([recipe.to_json() for recipe in recipes])
		response.headers['Access-Control-Allow-Origin'] = '*'
		return response
  
	# posts 1 recipe. Fails if there is no body. 
	def post(self):
		if not request.json:
			return 400
		recipe = Recipe(
			recipe_name=request.json.get('recipe_name'),
			ingredients=request.json.get('ingredients'),
			instructions=request.json.get('instructions'),
			serving_size=request.json.get('serving_size'),
			category=request.json.get('category'),
			notes=request.json.get('notes'),
			date_added=time.strftime('%Y-%m-%d %H:%M:%S'),
			date_modified=time.strftime('%Y-%m-%d %H:%M:%S')
		)
		db.session.add(recipe)
		db.session.commit()
		response = make_response(jsonify(recipe.to_json()), 201)
		response.headers['Access-Control-Allow-Origin'] = '*'
		return response
class RecipeIndex(Resource):
	# updates a recipe at the given index /<index>
	def put(self, idx):
		if not request.json:
			return 400
		recipe = Recipe.query.get(idx)
		if recipe is None:
			return 404
		recipe.recipe_name=request.json.get('recipe_name',recipe.recipe_name),
		recipe.ingredients=request.json.get('ingredients',recipe.ingredients),
		recipe.instructions=request.json.get('instructions',recipe.instructions),
		recipe.serving_size=request.json.get('serving_size',recipe.serving_size),
		recipe.category=request.json.get('category',recipe.category),
		recipe.notes=request.json.get('notes',recipe.notes),
		#recipe.date_added=request.json.get('date_added',recipe.date_added),
		recipe.date_modified = time.strftime('%Y-%m-%d %H:%M:%S')
		db.session.commit()
		response = make_response(jsonify(recipe.to_json()), 200)
		response.headers['Access-Control-Allow-Origin'] = '*'
		return response
	#deletes the recipe at the given index 
	def delete(self, idx):
		recipe = Recipe.query.get(idx)
		if recipe is None:
			return 404
		db.session.delete(recipe)
		db.session.commit()
		response = make_response(jsonify({'result': True}), 200)
		response.headers['Access-Control-Allow-Origin'] = '*'
		return response


api.add_resource(Recipes, '/')
api.add_resource(RecipeIndex, '/<int:idx>')

