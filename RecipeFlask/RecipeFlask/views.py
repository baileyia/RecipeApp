"""
Routes and views for the flask application.
"""
import json
import copy

from datetime import datetime
from flask import Flask, request, jsonify, make_response
from flask_restful import Api, Resource
from RecipeFlask import app


api = Api(app)

recipes = [{"recipe_name": "Meatballs",
			"ingredients": "ground beef, salt, pepper, spices",
			"instructions": "mix all ingredients in a bowl",
			"serving_size": "8",
			"category": "dinner",
			"notes": "non-vegetarian",
			"date_added": 1655676670,
			"date_modified": 1655676670
		   }]

class Recipe(Resource):
	# corresponds to the GET request.
	# this function is called whenever there
	# is a GET request for this resource
	def get(self):
  
		return jsonify(recipes)
  
	# Corresponds to POST request
	def post(self):
		recipes.append(copy.deepcopy(request.get_json()))
		return make_response(jsonify(recipes), 201)
class RecipeIndex(Resource):
	def put(self, idx):
		if len(recipes) > idx:
			recipes[idx] = copy.deepcopy(request.get_json())
		else:
			return "Item does not exist", 404
		return make_response(jsonify(recipes), 200)
	def delete(self, idx):
		if len(recipes) > idx:
			recipes.pop(idx)
		else:
			return "Item does not exist", 404
		return make_response(jsonify(recipes), 200)


api.add_resource(Recipe, '/')
api.add_resource(RecipeIndex, '/<int:idx>')

