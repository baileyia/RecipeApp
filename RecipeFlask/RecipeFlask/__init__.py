"""
The flask application package.
"""

from flask import Flask
app = Flask(__name__)

import RecipeFlask.views

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5555)