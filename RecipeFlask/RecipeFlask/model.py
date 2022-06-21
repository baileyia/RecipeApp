from database import db

#creating the database representation
class Recipe(db.Model):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    recipe_name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(100), nullable=False)
    instructions = db.Column(db.String(100), nullable=False)
    serving_size = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    notes = db.Column(db.String(100), nullable=True)
    date_added = db.Column(db.DateTime)
    date_modified = db.Column(db.DateTime)


    def to_json(self):
        return {
            'id': self.id,
            'recipe_name': self.recipe_name,
            'ingredients': self.ingredients,
            'instructions': self.instructions,
            'serving_size': self.serving_size,
            'category': self.category,
            'notes': self.notes,
            'date_added': self.date_added,
            'date_modified': self.date_modified
        }
