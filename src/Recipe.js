import React from "react";
import style from './recipe.module.css';
import { Container } from './Container';

const Recipe = ({ id, recipe_name, ingredients, instructions, serving_size, category, notes, date_added, date_modified }) => {
	//need to update host url whenever you restart the flask server, very inefficient, should find better solution.
	const hostUrl = 'http://localhost:58759/'
	const triggerText = 'Edit Recipe';

	//deletes data from the api when the delete button is pressed
	const deleteItem = (id) => () => {
		var url = hostUrl + id
		console.debug(hostUrl)
		fetch(url, {
			method: 'DELETE',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(response => response.json())
			.then(data => {
				console.debug('Success:', data);
			})
			.catch((error) => {
				console.debug('Error:', error);
			});
	};
	//updates data when the update button is pressed.
	const onSubmit = (event) => {
		event.preventDefault(event);
		var url = hostUrl + id
		var submitted = {}
		submitted['recipe_name'] = event.target.recipe_name.value
		submitted['ingredients'] = event.target.ingredients.value
		submitted['instructions'] = event.target.instructions.value
		submitted['serving_size'] = event.target.serving_size.value
		submitted['category'] = event.target.category.value
		submitted['notes'] = event.target.notes.value
		//console.debug(JSON.stringify(submitted))
		fetch(url, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(submitted)
		}).then(response => response.json())
			.then(data => {
				console.debug('Success:', data);
			})
			.catch((error) => {
				console.debug('Error:', error);
			});
	};
	return (
		<div className={style.recipe}>
			<button onClick={deleteItem(id)}>delete</button>
			<Container triggerText={triggerText} onSubmit={onSubmit} />
			<h1>{recipe_name}</h1>
			<p>Ingredients: {ingredients} </p>
			<p>instructions: {instructions} </p>
			<p>serving_size: {serving_size} </p>
			<p>category: {category} </p >
			<p>notes : {notes}</p>
			<p id="date_added">Date Added : {date_added }</p>
			<p id="date_modified">Date Modified : {date_modified }</p>
		</div>
	);
};
export default Recipe;

