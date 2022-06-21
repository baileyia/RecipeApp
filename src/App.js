import React, { useEffect, useState } from 'react'
import './App.css';
import Recipe from './Recipe';
import { Container } from './Container';


function App() {
	//need to update host url whenever you restart the flask server, very inefficient, should find better solution.
	const [recipes, setRecipes] = useState([]);
	const triggerText = 'Add Recipe';
	const hostUrl = 'http://localhost:58759/'

	//updates the website information on render
	useEffect(() => {
		getRecipes();
	})
	const getRecipes = async () => {
		const response = await fetch
			(hostUrl, {
				method: 'GET',
				headers: {
					accept: 'application/json'
			}
			});
		if (!response.ok) {
			throw new Error(`Error! status: ${response.status}`);
		}
		const data = await response.json();
		console.debug("in get")

		setRecipes(data);
		console.debug(JSON.stringify(recipes))
	};
	//container code influenced heavily by https://codesandbox.io/s/9j7m6mmw3o?file=/src/Container/index.js
	const onSubmit = (event) => {
		event.preventDefault(event);
		var submitted = {}
		submitted['recipe_name'] =  event.target.recipe_name.value
		submitted['ingredients'] = event.target.ingredients.value
		submitted['instructions'] = event.target.instructions.value
		submitted['serving_size'] = event.target.serving_size.value
		submitted['category'] = event.target.category.value
		submitted['notes'] = event.target.notes.value
		//console.debug(JSON.stringify(submitted))
		//posts data to the api 
		fetch(hostUrl, {
			method: 'POST',
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
		<div className="App">
			<Container triggerText={triggerText} onSubmit={onSubmit} />
			<div className="Recipe">
				<p>Recipes</p>
				{recipes?.map(recipe => (
					<Recipe
						key={recipe.id}
						id={recipe.id}
						recipe_name={recipe.recipe_name}
						ingredients={recipe.ingredients}
						instructions={recipe.instructions}
						serving_size={recipe.serving_size}
						category={recipe.category}
						notes={recipe.notes}
						date_added={recipe.date_added}
						date_modified={recipe.date_modified}
					/>

				))}
			</div>
		</div>
	);
}
export default App;
