const area = document.querySelector('.area')
const res = document.querySelector('.res')
const boxes = document.querySelectorAll('.cell')
const startGame = document.querySelector('.start')

const winnerX = document.querySelector('#winner-x')
const winnerNull = document.querySelector('#winner-null')
const draw = document.querySelector('#draw')

let count = 0
let move = 0
res.innerHTML = 'Ходить: x'

area.addEventListener('click', e => {

	if(e.target.textContent) return

	if(e.target.closest('.cell')) {
		if(move % 2 == 0) {
			res.innerHTML = 'Ходить: 0'
			e.target.innerHTML = 'X'
			count++
		}
		else {
			res.innerHTML = 'Ходить: x'
			e.target.innerHTML = '0'
			count++
		}
		move++
		check()
	}
	area.removeEventListener('click', e => {})
})

const check = () => {
	// Виграшні комбінації
	const arr = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]

	// Перевірка хто виграв
	// Якщо нічия
	if(count == 9) {
		res.innerHTML = 'Нічия!'
		countDraw()
	}
	
	arr.forEach(item => {
		if(
			boxes[item[0]].innerHTML == 'X' &&
			boxes[item[1]].innerHTML == 'X' &&
			boxes[item[2]].innerHTML == 'X' 
		) {
			res.innerHTML = 'Виграли хрестики!'
			countWinnX()
			boxes[item[0]].style.background = '#2E8B57'
			boxes[item[1]].style.background = '#2E8B57'
			boxes[item[2]].style.background = '#2E8B57'
			stopGame()
		}
		else if(
			boxes[item[0]].innerHTML == '0' &&
			boxes[item[1]].innerHTML == '0' &&
			boxes[item[2]].innerHTML == '0'
		) {
			res.innerHTML = 'Виграли нулики!'
			countWinnNull()
			boxes[item[0]].style.background = '#2E8B57'
			boxes[item[1]].style.background = '#2E8B57'
			boxes[item[2]].style.background = '#2E8B57'
			stopGame()
		}
	})
}

// Заборона кліка
function stopGame(){
	area.classList.add('stop')
}

// Почати гру з початку
startGame.addEventListener('click', () => {
	boxes.forEach(item => {
		item.innerHTML = ''
		item.style.background = '#fff'
	})
	// Для відловлення нічиї
	count = 0

	res.textContent == 'Виграли хрестики!' ? res.innerHTML = 'Ходить: 0' : res.innerHTML = 'Ходить: x'

	area.classList.remove('stop')
})

// Підрахунок виграшу хрестиків
let x = 0
const countWinnX = () => {
	x++
	winnerX.innerHTML = x
}

// Підрахунок виграшу нуликів
let nul = 0
const countWinnNull = () => {
	nul++
	winnerNull.innerHTML = nul
}

// Підрахунок нічиї
let d = 0
const countDraw = () => {
	d++
	draw.innerHTML = d
}

