import { CELL_STATUSES } from '../../helpers/constants';
import React, { Component}  from 'react';
import styles from './Field.module.css';
import PropTypes from 'prop-types';
import Cell from '../Cell/Cell';

class Field extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: [],
            freeCells: [],
            activeCell: null
        };

    }

    componentDidMount() {
        this.createField();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.field !== this.props.field) {
            this.createField();
        }
    }

    createField = () => {
        let freeCells = [];

        const field = Array(this.props.field).fill(0)
            .map((row, x) => Array(this.props.field).fill(0)
                .map((cell, y) => {
                    freeCells.push({ x, y });

                    return CELL_STATUSES.CLEAR;
                }));

        this.setState({
            field,
            freeCells
        });

    };

    handleCellClick = (coords) => {
        const { field } = this.state;

        const cell = field[coords.x][coords.y];

        if (cell === CELL_STATUSES.ACTIVE) {
            this.updateCellStatus(coords, CELL_STATUSES.USER_WON);
        }
    };

    updateCellStatus = (coords, status) => {
        const newField = this.state.field;
        newField[coords.x][coords.y] = status;

        this.setState({
            field: newField
        });
    };

    setActiveCell = () => {
        const randomCell = this.randomizeCoords();

        this.updateCellStatus(randomCell, CELL_STATUSES.ACTIVE);

        this.setState(prevState => ({
            activeCell: randomCell,
            freeCells: prevState.freeCells.filter(cell => cell !== randomCell)
        }));
    };

    randomizeCoords = () => {
        const { freeCells } = this.state;

        return freeCells[Math.floor(Math.random() * freeCells.length)];
    };

    resetField = () => {
        this.setState({
            activeCell: null
        });
    };

    render() {
        const { field } = this.state;

        return (
            <div className={styles.container}>
                {field.map((row, x) => (
                    <div key={`row-${x}`} className={styles.row}>
                        {row.map((cell, y) => (
                            <Cell
                                key={`${x}-${y}`}
                                onClick={() => this.handleCellClick({ x, y })}
                                status={cell}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

Field.propTypes = {
    field: PropTypes.number.isRequired,
};

export default Field;
