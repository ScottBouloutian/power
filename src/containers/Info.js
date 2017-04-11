import React, { PropTypes } from 'react';
import { View, Image, StyleSheet, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import profile from '../../assets/images/profile.png';
import IconButton from '../components/IconButton';
import { loadProducts, purchaseProduct, restorePurchases } from '../actions/purchases';

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    header: {
        backgroundColor: '#e74c3c',
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 16,
        marginBottom: 8,
    },
    bio: {
        width: 200,
        margin: 8,
        textAlign: 'center',
    },
    name: {
        fontWeight: 'bold',
    },
});

function Info({ load, products, purchase, restore }) {
    const productButtons = products.map(product => (
        <IconButton
          key={product.identifier} icon="credit-card" color="#27ae60"
          text={product.title} onPress={purchase(product.identifier)}
        />
    ));
    if (productButtons.length > 0) {
        productButtons.push((
            <IconButton
              key="restore-button" icon="refresh" color="#27ae60"
              text="Restore Purchases" onPress={restore}
            />
        ));
    }
    const openWebsite = () => Linking.openURL('http://www.ScottBouloutian.com');
    const openGithub = () => Linking.openURL('https://github.com/scottbouloutian');
    return (
        <View style={styles.view} onLayout={load}>
            <Image style={styles.profile} source={profile} resizeMode="contain" />
            <Text style={styles.bio}>
                My name is
                <Text style={styles.name}> Scott Bouloutian </Text>
                and I am a software engineer with a passion for technology.
            </Text>
            <IconButton icon="safari" text="www.ScottBouloutian.com" onPress={openWebsite} />
            <IconButton icon="github" text="ScottBouloutian" onPress={openGithub} />
            {productButtons}
        </View>
    );
}
Info.propTypes = {
    load: PropTypes.func.isRequired,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    purchase: PropTypes.func.isRequired,
    restore: PropTypes.func.isRequired,
};
Info.navigationOptions = {
    title: 'Information',
    header: {
        tintColor: '#ecf0f1',
        style: styles.header,
    },
};
const mapStateToProps = state => ({
    products: state.purchases.products,
});
const mapDispatchToProps = dispatch => ({
    load: () => dispatch(loadProducts).catch(() => {}),
    purchase: id => () => dispatch(purchaseProduct(id)).catch(() => {}),
    restore: () => dispatch(restorePurchases).catch(() => {}),
});
export default connect(mapStateToProps, mapDispatchToProps)(Info);
