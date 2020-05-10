// module for setting x's and o's
const gameboard = (() => {
	let placedX = false;
	let gameplay = [];
	const winningPlays = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[6,4,2]
	];
	const gameSpots = (function() {
		let arr = [];
		let nodelist = document.querySelectorAll(".container div");

		for (i = 0; i < nodelist.length; i++) {
			arr[i] = nodelist[i];
		}

		return arr;
	})();
	const declare = (() => {
		const h2 = document.querySelector("h2");
		const declareTurn = "'s Turn!";

		const player = (name1, name2) => {
			const declareP1 = name1 + declareTurn;
			const declareP2 = name2 + declareTurn;

			if (h2.innerHTML == declareP1) {
				h2.innerHTML = declareP2;
			} else {
				h2.innerHTML = declareP1;
			}
		}

		const winner = (declaration) => {
			h2.innerHTML = declaration;
		}

		const userInput = () => {
			h2.innerHTML = "Enter your names!"
		}

		return { player, winner, userInput };
	})();
	const board = (() => {
		const input1 = document.querySelector("input");
		const input2 = document.querySelectorAll("input")[1];
		const gameboard = document.querySelector(".container");
		const startPage = document.querySelector(".inputNames");

		const switchToGame = () => {
			let name1 = input1.value;
			let name2 = input2.value;

			input1.value = "";
			input2.value = "";

			startPage.classList.add("noDisplay");
			gameboard.classList.remove("noDisplay");

			if (!name1) {
				name1 = "Player 1";
			}

			if (!name2) {
				name2 = "Player 2";
			}

			declare.player(name1, name2);

			return { name1, name2 };
		}
		// const reset = () => {
		// 	placedX = false;
		// 	gameplay = [];

		// 	gameSpots.forEach((spot) => {
		// 		spot.innerHTML = "";
		// 	});
		// }

		return { switchToGame }
	})();

	return { placedX, gameplay, winningPlays, gameSpots, declare, board };
})();

// factory function for allowing player moves
const player = () => {
	let name;
	let playerMarker;

	return { name, playerMarker }
}

// factory function for a two player game
const game = () => {
	const p1 = player();
	p1.playerMarker = "X";
	const p2 = player();
	p2.playerMarker = "O";

	gameboard.declare.userInput();

	document.querySelector(".inputNames button").addEventListener("click", () => {
			let namesObj = gameboard.board.switchToGame();
			p1.name = namesObj.name1;
			p2.name = namesObj.name2;
	});

	// document.querySelector(".container button").addEventListener("click", gameboard.board.reset);

	const determineWinner = () => {
		let winningPlays = gameboard.winningPlays;
		let gameplay = gameboard.gameplay;
		let playArrLen = gameplay.length;
		let xPlays = [], oPlays = [];
		let xWins, oWins;

		for (i = 0; i < playArrLen; i++) {
			if (gameplay[i] == 'X') {
				xPlays.push(i);
			} else if (gameplay[i] == 'O') {
				oPlays.push(i);
			}
		}

		for (i = 0; i < winningPlays.length; i++) {
			xWins = 0, oWins = 0;

			for (j = 0; j < 3; j++) {
				xPlays.forEach(play => {
					if (winningPlays[i][j] == play) {
						xWins++;
					}
				});

				oPlays.forEach(play => {
					if (winningPlays[i][j] == play) {
						oWins++;
					}
				});

				if (xWins >= 3) {
					return `${p1.name} has won!`;
				} else if (oWins >= 3) {
					return `${p2.name} has won!`;
				}
			}
		}

	}

	gameboard.gameSpots.forEach((spot) => {
		spot.addEventListener("click", () => {
			if (spot.innerHTML == "") {
				if (!gameboard.placedX) {
					spot.innerHTML = "X";
					gameboard.gameplay[gameboard.gameSpots.indexOf(spot)] = "X";
					gameboard.placedX = !gameboard.placedX;
				} else {
					spot.innerHTML = "O";
					gameboard.gameplay[gameboard.gameSpots.indexOf(spot)] = "O";
					gameboard.placedX = !gameboard.placedX;
				}

				gameboard.declare.player(p1.name, p2.name);

				let winner = determineWinner();

				if (winner) {
					gameboard.declare.winner(winner);
					gameboard.gameSpots.forEach((spot) => {
						if (spot.innerHTML == "") {
							spot.innerHTML = " ";
						}
					});
				}
			}
		});
	});

}

game();