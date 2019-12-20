console.log('Tamagotchi');

class Tamagotchi {
	constructor(name, age, hunger, boredom, sleepiness) {
		this.name = name
		this.age = age
		this.boredom = boredom
		this.sleepiness = sleepiness
		this.hunger = hunger
		this.lightSwitcher = false

		console.log(this);
	}

	turnLinghtOnOff() {
		if(this.lightSwitcher) {
			this.lightSwitcher = false
		} else {
			this.lightSwitcher = true
		}
	}
}

// Object
const game = {
	name: '',
	age: 0,
	hunger: 0,
	sleepiness: 0,
	boredom: 0,
	setInterval: 0,
	timer: 0,
	light: false,
	lightTime: 0,
	startGame() {
		$('.form').text(`I'm ${this.name}`)

		this.setInterval = setInterval(() => {
			this.timer++
			this.showStatus()
			if(this.timer % 4 === 0) {
				this.age++
			}
			if(this.timer % 2 === 0 && this.light === false) {
				this.sleepiness++
				this.showDead()
			}
			if(this.timer % 3 === 0) {
				this.boredom++
				this.showDead()
			}
			if(this.timer % 2 === 0) {
				this.hunger++
				this.showDead()
			}
			if(this.light === true && this.timer % 1 === 0 && this.light){
				this.lightTime++
				this.sleepiness--
				if(this.lightTime >= 2) {
					this.light = false
					$('.container').css('background-color', 'white')
				} 
			}
		}, 1000)

		$('<img class="alive" src="images/active.gif">').appendTo($('.container'))

	},
	birthTamagotchi() {
		const newTamagotchi = new Tamagotchi(this.name, this.age, this.hunger, this.boredom, this.sleepiness)
	},
	showDead() {
		if(this.hunger === 10) {
			alert('Your pet died!')
			clearInterval(this.setInterval)
		} else if(this.sleepiness === 10) {
			alert('Your pet died!')
			clearInterval(this.setInterval)
		} else if(this.boredom === 10) {
			alert('Your pet died!')
			clearInterval(this.setInterval)
		}
	},
	showStatus() {
		$('.age').text(this.age)
		$('.boredom').text(this.boredom)
		$('.sleepiness').text(this.sleepiness)
		$('.hunger').text(this.hunger)
	},
	subHunger() {
		if(this.hunger >= 3) {
			this.hunger -= 3
		}
	},
	subSleepiness() {
		if(this.sleepiness >= 2) {
			this.sleepiness -= 2
		}
	},
	subBoredom() {
		if(this.boredom >= 4) {
			this.boredom -= 4
		}
	},

	lightSwitch() {
		$('.container').css({'background-color': 'rgba(0, 0, 0, 0.8)'})
		if(this.light === false) {
			this.light = true
		}
		
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

//age
$('.play').on('click', (e) => {
	game.subBoredom()
})
//sleep
$('.sleep').on('click', (e) => {
	game.subSleepiness()
})
//hunger
$('.feed').on('click', (e) => {
	game.subHunger()
})
// light
$('.light').on('click', (e) => {
	game.lightSwitch()
	// console.log(e.target);
})