import React from 'react';

export const Form = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="recipe_name">Recipe Name</label>
                <input className="form-control" id="recipe_name" />
            </div>
            <div className="form-group">
                <label htmlFor="ingredients">Ingredients</label>
                <input className="form-control" id="ingredients" />
            </div>
            <div className="form-group">
                <label htmlFor="instructions">Instructions</label>
                <input className="form-control" id="instructions" />
            </div>
            <div className="form-group">
                <label htmlFor="serving_size">Serving Size</label>
                <input className="form-control" id="serving_size" />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <input className="form-control" id="category" />
            </div>
            <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <input className="form-control" id="notes" />
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};
export default Form;
