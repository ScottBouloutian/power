import Navigator from '../components/Navigator';

export default function (state, action) {
    const newState = Navigator.router.getStateForAction(action, state);
    return newState || state;
}
