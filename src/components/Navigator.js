import { StackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import Info from '../containers/Info';

export default StackNavigator({
    Main: { screen: Home },
    Info: { screen: Info },
});
