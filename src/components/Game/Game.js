import { fetchSettings, fetchWinners, sendWinner } from '../../helpers/server';
import {CELL_STATUSES} from "../../helpers/constants";
import LeaderBoard from '../LeaderBoard/LeaderBoard';
import Controls from '../Controls/Controls';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import styles from './Game.module.css';
import Field from '../Field/Field';

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			settings: {},
			mode: '',
			name: '',
			field: 5,
			delay: 500,
			isPlaying: false,
			isFirstGame: true,
			message: 'Press PLAY to start'
		};

		this.timer = null;
		this.field = React.createRef();
		this.board = React.createRef();
	}

	componentDidMount() {
		fetchSettings().then(settings => {
			this.setState({ settings });
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.mode !== this.state.mode) {
			this.updateFieldSettings();
		}
	}

	componentWillUnmount() {
		this.stopGame();
	}

	onChangeControls = (event, key) => {
		this.setState({
			[key]: event.target.value
		});
	};

	updateFieldSettings = () => {
		const { settings, mode } = this.state;

		this.setState({
			field: settings[mode].field,
			delay: settings[mode].delay
		});
	};

	startGame = () => {
		this.field.current.createField();
		this.timer = setInterval(this.tick, this.state.delay);
		this.setState({
			isPlaying: true,
			message: ''
		});
	};

	stopGame = () => {
		clearInterval(this.timer);
		this.field.current.resetField();
		this.setState({
			isPlaying: false,
			message: `${this.getWinner()} won`,
			isFirstGame: false
		});

		sendWinner({
			winner: this.state.name,
			date: new Date().toLocaleString()
		}).then(() => {
			this.board.current.fetchData();
		});
	};

	tick = () => {
		const { freeCells, activeCell, field} = this.field.current.state;

		const halfField = Math.round(Math.pow(this.state.field, 2) / 2);

		if (activeCell) {
			const cell = field[activeCell.x][activeCell.y];

			if (cell !== CELL_STATUSES.USER_WON) {
				this.field.current.updateCellStatus(activeCell, CELL_STATUSES.COMPUTER_WON);
			}
		}

		if (freeCells.length >= halfField) {
			this.field.current.setActiveCell();
		} else {
			this.stopGame();
		}
	};

	getWinner = () => {
		const flatField = this.field.current.state.field.flat();

		const computerScore = flatField.filter(cell => cell === CELL_STATUSES.COMPUTER_WON);
		const userScore = flatField.filter(cell => cell === CELL_STATUSES.USER_WON);

		return computerScore.length > userScore.length ? 'Computer' : this.state.name;
	};

	render() {
		const {
			settings,
			mode,
			name,
			field,
			isPlaying,
			message,
			isFirstGame
		} = this.state;

		return (
			<Grid container spacing={3}>
				<Grid item xs={12} md={9}>
					<Controls
						mode={mode}
						settings={settings}
						name={name}
						disabled={isPlaying}
						onChange={this.onChangeControls}
						onPlay={this.startGame}
						isFirstGame={isFirstGame}
					/>
					<div className={styles.message}>{message}</div>
					<Field
						ref={this.field}
						field={field}
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<LeaderBoard
						ref={this.board}
					/>
				</Grid>
			</Grid>
		);
	}
}

export default Game;

