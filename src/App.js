import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Tab from "./Tab.js";
import "./Tab.css";
import Content from "./Content";

let url = " https://www.thecocktaildb.com/api/json/v1/1/random.php";

// let cocktails = [];

class App extends Component {
	constructor() {
		super();
		this.state = {
			cocktails: [],
		};
	} //constructor

	render() {
		let allTabs = this.state.cocktails.map((cocktail, idx) => {
			return <Tab cocktailName={cocktail.name} key={idx} />;
		});

		let allContents = this.state.cocktails.map((cocktail, idx) => {
			return <Content cocktail={cocktail} key={idx} />;
		});

		return (
			<div className="App">
				<Header />
				<ul className="tabs">{allTabs}</ul>
				<div className="contents">{allContents}</div>
				{/* <Content cocktails={this.state.cocktails} /> */}
			</div>
		);
	} //render

	getCocktails = () => {
		// * Fetch five random cocktails
		// * See https://gomakethings.com/waiting-for-multiple-all-api-responses-to-complete-with-the-vanilla-js-promise.all-method/
		Promise.all([fetch(url), fetch(url), fetch(url), fetch(url), fetch(url)])
			.then((responses) => {
				return Promise.all(
					responses.map((res) => {
						return res.json();
					})
				);
			})
			.then((data) => {
				let objArr = [];
				data.forEach((obj) => {
					let cocktail = {
						name: obj.drinks[0].strDrink,
						instructions: obj.drinks[0].strInstructions,
						image: obj.drinks[0].strDrinkThumb,
						spirits: {
							spirit1: obj.drinks[0].strIngredient1,
							spirit2: obj.drinks[0].strIngredient2,
							spirit3: obj.drinks[0].strIngredient3,
							spirit4: obj.drinks[0].strIngredient4,
							spirit5: obj.drinks[0].strIngredient5,
							spirit6: obj.drinks[0].strIngredient6,
							spirit7: obj.drinks[0].strIngredient7,
							spirit8: obj.drinks[0].strIngredient8,
							spirit9: obj.drinks[0].strIngredient9,
							spirit10: obj.drinks[0].strIngredient10,
						},
						measures: {
							measure1: obj.drinks[0].strMeasure1,
							measure2: obj.drinks[0].strMeasure2,
							measure3: obj.drinks[0].strMeasure3,
							measure4: obj.drinks[0].strMeasure4,
							measure5: obj.drinks[0].strMeasure5,
							measure6: obj.drinks[0].strMeasure6,
							measure7: obj.drinks[0].strMeasure7,
							measure8: obj.drinks[0].strMeasure8,
							measure9: obj.drinks[0].strMeasure9,
							measure10: obj.drinks[0].strMeasure10,
						},
					};
					objArr.push(cocktail);
				});
				this.setState({
					cocktails: objArr,
				}); //setState
			});
	}; //getCocktails

	componentDidMount() {
		this.getCocktails();
	} //componentDidMount
} //App

export default App;
