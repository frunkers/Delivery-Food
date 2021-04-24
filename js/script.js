'use strict';

const sizes = [{
		id: 'small',
		text: 'Маленький',
		price: 50,
		calories: 20
	},
	{
		id: 'big',
		text: 'Большой',
		price: 100,
		calories: 40
	}
];

const toppings = [{
		id: 'cheese',
		text: 'Сыр',
		price: 10,
		calories: 20
	},
	{
		id: 'salad',
		text: 'Салат',
		price: 20,
		calories: 5
	},
	{
		id: 'potatoes',
		text: 'Картофель',
		price: 15,
		calories: 10
	},
	{
		id: 'seasoning',
		text: 'Приправа',
		price: 15,
		calories: 0
	},
	{
		id: 'mayonnaise',
		text: 'Майонез',
		price: 20,
		calories: 5
	}
];

/* ===== write options  ===== */
const sizeBlock = document.querySelector('.size');
const toppingBlock = document.querySelector('.topping');
const hamburgerBlock = document.querySelector('.hamburger');
const totalBlock = document.querySelector('.total');

const generateToppings = (id, text, price) =>
	`<label for="${id}" class="label-topping label-topping-${id}">
		<input type="checkbox" id="${id}" class="btn-input">
		<span class="title-option title-topping-${id}">${text}
			<span class="price">+ ${price} руб.</span>
		</span>
	 </label>`;

const generateSizes = (id, text, price) =>
	`<label for="${id}" class="label-size label-size-${id}">
		<input type="radio" id="${id}" class="btn-input" name="option-size">
		<span class="title-option title-size-${id}">${text}
			<span class="price">+ ${price} руб.</span>
		</span>
	 </label>`;

// вывод sizes & toppings
const writeOptions = (obj, blockPaste, functionStringHTML) => { // functionStringHTML => аргумет, как функция, туда прилетает шаблонная строка
	obj.forEach(prop => {
		blockPaste.insertAdjacentHTML('beforeend', functionStringHTML(prop.id, prop.text, prop.price));
	});
}

writeOptions(sizes, sizeBlock, generateSizes);
writeOptions(toppings, toppingBlock, generateToppings);

/* ===== class Hamburger ===== */
const labelToppings = document.querySelectorAll('.label-topping');
const labelSizes = document.querySelectorAll('.label-size');
const totalPrice = document.querySelector('.total__price');
const totalCalories = document.querySelector('.total__calories');
let priceHamburger = 0;
let caloriesHamburger = 0;
let priceHamburgerSize = 0;
let caloriesHamburgerSize = 0;

totalPrice.innerHTML = `${priceHamburger} руб.`;
totalCalories.innerHTML = `${caloriesHamburger} ккал.`;

sizeBlock.insertAdjacentHTML('beforeend', `<button class="btn-buy">Купить</button>`);
const btnBuy = document.querySelector('.btn-buy');

sizeBlock.insertAdjacentHTML('beforeend', `<p class="pop-up">${'Гамбургер должей иметь размер и быть с одним из нескольких видов начинок!'}</p>`);

class Hamburger {
	// Добавить или убрать добавку
	changedTopping(obj, arrayLabels) {
		arrayLabels.forEach((label, index) => {
			label.querySelector('.btn-input').addEventListener('click', event => {
				if (event.target.checked && event.target.type === 'radio') {
					priceHamburgerSize = 0;
					caloriesHamburgerSize = 0;
					priceHamburgerSize += obj[index].price;
				}

				if (event.target.checked && event.target.type !== 'radio') {
					priceHamburger += obj[index].price;
					caloriesHamburger += obj[index].calories;
				} else if (!event.target.checked && event.target.type !== 'radio') {
					priceHamburger -= obj[index].price;
					caloriesHamburger -= obj[index].calories;
				}
			});
		});
	}

	// Узналь цену и калорийность
	getTotalData() {
		btnBuy.addEventListener('click', () => {
			if (priceHamburger !== 0 && priceHamburgerSize !== 0) {
				document.querySelector('.pop-up').style.display = 'none';
				totalPrice.innerHTML = `${priceHamburger + priceHamburgerSize} руб.`;
				totalCalories.innerHTML = `${caloriesHamburger + caloriesHamburgerSize} ккал.`;
			} else {
				document.querySelector('.pop-up').style.display = 'block';
			}
		});
	}
}

Hamburger.prototype.changedTopping(toppings, labelToppings);
Hamburger.prototype.changedTopping(sizes, labelSizes);

Hamburger.prototype.getTotalData();

// getToppings(topping) // Получить список добавок
// getSize() // Узнать размер гамбургера
// getStuffing() // Узнать начинку гамбургера