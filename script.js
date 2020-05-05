// module for setting x's and o's
const gameBoard = (() => {
	let placedX = false;
	let gamePlay = [];
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

	return { placedX, gamePlay, winningPlays, gameSpots };
})();

// factory function for allowing player moves
const player = () => {
	let playerMarker;

	return { playerMarker }
}

// factory function for a two player game
const game = () => {
	const p1 = player();
	p1.playerMarker = "X";
	const p2 = player();
	p2.playerMarker = "O";

	const declareWinner = () => {
		let winningPlays = gameBoard.winningPlays;
		let gamePlay = gameBoard.gamePlay;
		let playArrLen = gamePlay.length;
		let xPlays = [], oPlays = [];
		let xWins, oWins;

		for (i = 0; i < playArrLen; i++) {
			if (gamePlay[i] == 'X') {
				xPlays.push(i);
			} else if (gamePlay[i] == 'O') {
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
					return "Player 1 has won!";
				} else if (oWins >= 3) {
					return "Player 2 has won!";
				}
			}
		}

	}

	gameBoard.gameSpots.forEach((spot) => {
		spot.addEventListener("click", () => {
			if (spot.innerHTML == "") {
				if (!gameBoard.placedX) {
					spot.innerHTML = "X";
					gameBoard.gamePlay[gameBoard.gameSpots.indexOf(spot)] = "X";
					gameBoard.placedX = !gameBoard.placedX;
				} else {
					spot.innerHTML = "O";
					gameBoard.gamePlay[gameBoard.gameSpots.indexOf(spot)] = "O";
					gameBoard.placedX = !gameBoard.placedX;
				}

				let winner = declareWinner();

				if (winner) {
					alert(winner);
				}
			}
		});
	});

}

game();