import { FormControl, MenuItem, Select, TextField, Button } from "@material-ui/core";
import styles from './Controls.module.css';
import React from 'react';

const Controls = ({ mode, settings, name, onChange, onPlay, disabled, isFirstGame }) => {
    const transformLabel = (label) => {
        return label.replace(/([a-z])([A-Z])/g, '$1 $2');
    };

    return (
        <div className={styles.container}>
            <FormControl variant="outlined">
                <Select
                    className={styles.select}
                    value={mode}
                    displayEmpty
                    disabled={disabled}
                    onChange={(event) => onChange(event, 'mode')}
                >
                    <MenuItem value={''} disabled>
                        Pick game mode
                    </MenuItem>
                    {Object.keys(settings).map(el => (
                        <MenuItem
                            className={styles.select}
                            value={el}
                            key={el}
                        >
                            {transformLabel(el)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Enter your name"
                variant="outlined"
                value={name}
                disabled={disabled}
                onChange={(event) => onChange(event, 'name')}
            />
            <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={onPlay}
                disabled={disabled || !name || !mode}
            >
                {isFirstGame ? 'Play' : 'Play again'}
            </Button>
        </div>
    );
};

export default Controls;
