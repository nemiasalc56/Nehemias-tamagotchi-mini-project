class Tamagotchi {
	constructor(name, age, hunger, boredom, sleepiness) {
		this.name = name
		this.age = age
		this.boredom = boredom
		this.sleepiness = sleepiness
		this.hunger = hunger
		this.lightSwitcher = false
		this.eatTimePic = false
		this.boreTime = false
	}

	turnLinghtOnOff() {
		if(this.lightSwitcher) {
			this.lightSwitcher = false

		} else {
			this.lightSwitcher = true
		}
	}

	eatStatus() {
		if(this.eatTimePic) {
			this.eatTimePic = false

		} else {
			this.eatTimePic = true
		}
	}

	boreStatus() {
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
	lightTime: 0,
	eatTime: 0,
	newTamagotchi: new Tamagotchi(),
	startGame() {
		$('.form').text(`I'm ${this.name}`)
		
		this.setInterval = setInterval(() => {
			this.timer++
			this.showStatus()
			this.checkBore()
			if(this.timer % 7 === 0) {
				this.age++
			}
			if(this.timer % 5 === 0 && this.newTamagotchi.lightSwitcher === false) {
				this.sleepiness++
				this.showDead()
			}
			if(this.timer % 4 === 0 && this.newTamagotchi.lightSwitcher === false) {
				this.boredom++
				this.showDead()
			}
			if(this.timer % 2 === 0 && this.newTamagotchi.lightSwitcher === false) {
				this.hunger++
				this.showDead()
			}
			if(this.newTamagotchi.lightSwitcher&& this.timer % 1 === 0){
				this.lightTime++
				if(this.sleepiness >0){
					this.sleepiness--
				}
				if(this.lightTime >= 3) {
					this.newTamagotchi.turnLinghtOnOff()
					$('.container').css({'background': 'url(https://i.pinimg.com/originals/b0/1f/f7/b01ff7a81d06aa2ac6f71b7b68634bf1.gif)', 'background-size': 'contain'}).css({'transition': '1s ease-in'})
					this.lightTime = 0
					$('.my-pet').attr('src', 'images/active.gif').css({'transition': '1s ease-in'})
				} 
			}
			if(this.newTamagotchi.eatTimePic && this.timer%1 ===0){
				this.eatTime++
				if(this.eatTime >= 3) {
					this.newTamagotchi.eatStatus()
					$('.my-pet').attr('src', 'images/active.gif').css({'transition': '1s ease-in'})
				}
			}
		}, 1200)

		$('<img class="my-pet" src="images/active.gif">').appendTo($('.container'))

	},
	birthTamagotchi() {
		const newTamagotchi2 = new Tamagotchi(this.name, this.age, this.hunger, this.boredom, this.sleepiness)
	},
	showDead() {
		if(this.hunger === 10) {
			this.deadTamagotchi()
		} else if(this.sleepiness === 10) {
			this.deadTamagotchi()
		} else if(this.boredom === 10) {
			this.deadTamagotchi()
		}
	},
	showStatus() {
		$('.age').text(this.age)
		$('.boredom').text(this.boredom)
		$('.sleepiness').text(this.sleepiness)
		$('.hunger').text(this.hunger)
	},
	subHunger() {
		if(this.hunger >= 3 && this.newTamagotchi.eatTimePic === false) {
			this.hunger -= 3
			this.newTamagotchi.eatStatus()
			$('.my-pet').attr('src', 'images/eat.gif').css({'transition': '1s ease-in'})
		}
	},
	subSleepiness() {
		if(this.sleepiness >= 2) {
			this.sleepiness -= 2
		}
		$('.my-pet').attr('src', 'images/sonicsleep.jpg').css({'transition': '1s ease-in'})
		this.lightSwitch()
	},
	deadTamagotchi() {
		clearInterval(this.setInterval)
		$('.my-pet').attr('src', 'images/dead.gif').css({'transition': '1s ease-in'})
		$('.form').text(`Your pet died`)
	},
	subBoredom() {
		if(this.boredom >= 2) {
			this.boredom -= 2
			$('.my-pet').attr('src', 'images/play.gif').css({'transition': '1s ease-in'})
		}
	},

	lightSwitch() {
		$('.container').css({'background': 'rgba(0, 0, 0, 0.8)'}).css({'transition': '1s ease-in'})
		if(this.newTamagotchi.lightSwitcher === false) {
			this.newTamagotchi.turnLinghtOnOff()
		}
	},

	checkEatTime() {
		if(this.newTamagotchi.eatTimePic === false) {
			this.newTamagotchi.eatStatus()
		}
	},
	checkBore() {
		if(this.boredom ===3 || this.boredom === 7) {
		$('.my-pet').attr('src', 'images/bore.gif').css({'transition': '1s ease-in'})

		}
	}
}


$('.form').on('submit', (e) => {
	e.preventDefault()
	const $name = $('.name-field')
	game.name = $name.val()
	game.startGame()

	$('.name-field').val('')
})

$('.play').on('click', (e) => {
	game.subBoredom()
})

$('.sleep').on('click', (e) => {
	game.subSleepiness()
})

$('.feed').on('click', (e) => {
	game.subHunger()
})

$('.light').on('click', (e) => {
	game.lightSwitch()
})