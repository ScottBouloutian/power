import { StackNavigator } from 'react-navigation';
import Home from '../containers/Home';
import Info from '../containers/Info';
import Device from '../containers/Device';

export default StackNavigator({
    Main: { screen: Home },
    Device: { screen: Device },
    Info: { screen: Info },
});
