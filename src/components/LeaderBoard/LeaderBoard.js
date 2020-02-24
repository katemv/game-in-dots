import {fetchWinners} from "../../helpers/server";
import { List, ListItem } from '@material-ui/core';
import styles from './LeaderBoard.module.css';
import React, { PureComponent } from 'react';

class LeaderBoard extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            winners: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetchWinners().then(winners => {
            winners.reverse();
            this.setState({ winners });
        });
    };

    render () {
        const { winners } = this.state;

        return (
            <div className={styles.container}>
                <h1 className={styles.heading}>Leader Board</h1>
                <List>
                    {winners.map(el => (
                        <ListItem
                            selected
                            className={styles.listItem}
                            key={el.id}
                        >
                            <div>{el.winner}</div>
                            <div>{el.date}</div>
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }
}

export default LeaderBoard;
