import { CELL_STATUSES } from '../../helpers/constants';
import React, { Component}  from 'react';
import styles from './Cell.module.css';

class Cell extends Component {
    static colors = {
        [CELL_STATUSES.CLEAR]: 'white',
        [CELL_STATUSES.ACTIVE]: 'blue',
        [CELL_STATUSES.COMPUTER_WON]: 'red',
        [CELL_STATUSES.USER_WON]: 'green',
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.status !== this.props.status;
    }

    render() {
        const { status, onClick } = this.props;

        return (
            <div
                className={`${styles.cell} ${styles[Cell.colors[status]]}`}
                onClick={onClick}
            />
        );
    }
}

export default Cell;
