const config = {
    connectionURL:  'https://starnavi-frontend-test-task.herokuapp.com',
    path:           {
        settings:'/game-settings',
        winners:'/winners'
    },
};

const send = async (path, payload) => {
    try {
        const response = await fetch(config.connectionURL + path, payload);

        return response.json();
    } catch(err) {
        console.log(err);
    }
};

export const fetchSettings = () => send(config.path.settings);
export const fetchWinners = () => send(config.path.winners);
export const sendWinner = (data) => send(config.path.winners, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
