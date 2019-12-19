console.log('Tamagotchi');

class Tamagotchi {
	constructor(name, age, hunger, boredom, sleepiness) {
		this.name = name
		this.age = age
		this.boredom = boredom
		this.sleepiness = sleepiness
		this.hunger = hunger

		console.log(this);
	}
	tamagotchi() {

	}
}

// Object
const game = {
	name: '',
	age: 0,
	hunger: 0,
	sleepiness: 0,
	boredom: 0,
	timer: 0,
	setInterval: 0,
	startGame() {
		$('.form').text(`Name: ${this.name}`)
		this.setInterval = setInterval(() => {
			this.age++
			console.log('Age ', this.age);
			this.birthTamagotchi()
		}, 1800)

	},
	birthTamagotchi() {
		const newTamagotchi = new Tamagotchi(this.name, this.age, this.hunger, this.boredom, this.sleepiness)
	}
}

// Listeners
// Get name
$('.form').on('submit', (e) => {
	e.preventDefault()
	const $name = $('.name-field')
	game.name = $name.val()
	game.startGame()

	$('.name-field').val('')
})
