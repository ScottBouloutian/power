import { StackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import Info from '../containers/Info';
import Add from '../containers/Add';

export default StackNavigator({
    Main: { screen: Home },
    Add: { screen: Add },
    Info: { screen: Info },
});
