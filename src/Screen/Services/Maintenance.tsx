import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, images } from '../../themes/variables';
import { Select } from '../../Components/Select';
import Touchable from '../../Components/Touchable';

const options = [{ label: 'test', value: 'test' }];
export default function Maintenance(props: any) {
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <Select
                        pickerStyle={{ inputIOS: { borderWidth: 0 }, inputAndroid: { borderWidth: 0, borderBottomWidth: 0 }, }}
                        style={styles.selectType}
                        placeholder="Select"
                        value={''}
                        // onValueChange={(country: string) => countryChangeHandler(country)}
                        iconStyle={styles.iconStyle}
                        items={options} />
                </View>
            </View>
            <View style={styles.maintenanceContainer}>
                <View style={styles.dataContainer}>
                    <View style={styles.dataInnerContainer}>
                        <Text style={styles.idLabel}>A13456</Text>
                        <Image style={{ marginLeft: 20 }} source={images.Phone} />
                        <Text style={[styles.status, { color: colors.red }]}>Finished&N</Text>
                        <Text style={styles.paymentStatus}>Collected</Text>
                    </View>
                    <View style={styles.dataInnerContainer}>
                        <Image source={images.WhatsApp}/>
                        <Text style={[styles.status, { color: colors.black }]}>Mobile</Text>
                        <Image source={images.Arrow_Right} style={{ marginLeft: 10 }} />
                        <Text style={[styles.idLabel, { marginLeft: 10 }]}>Fix</Text>
                        <Text style={styles.dateLabel}>21/01/2021 10:30</Text>
                    </View>
                </View>
                <Touchable style={styles.nextContainer} onPress={() => props.navigation.navigate('OrderTracking')}>
                    <Image source={images.Arrow_Next} />
                </Touchable>
            </View>

            <View style={styles.maintenanceContainer}>
                <View style={styles.dataContainer}>
                    <View style={styles.dataInnerContainer}>
                        <Text style={styles.idLabel}>A13456</Text>
                        <Text style={[styles.status, { marginLeft: 80 }]}>Waiting</Text>
                    </View>
                    <View style={styles.dataInnerContainer}>
                        <Text style={[styles.status, { color: colors.black }]}>Mobile</Text>
                        <Image source={images.Arrow_Right} style={{ marginLeft: 10 }} />
                        <Text style={[styles.idLabel, { marginLeft: 10 }]}>Fix</Text>
                        <Text style={styles.dateLabel}>21/01/2021 10:30</Text>
                    </View>
                </View>
                <View style={styles.nextContainer}>
                    <Image source={images.Arrow_Next} />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.white
    },
    container: {
        width: '92%',
        marginLeft: 15,
        height: 79,
        backgroundColor: colors.white,
        borderColor: colors.black,
        elevation: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterContainer: {
        width: '60%',
    },
    selectType: {
        paddingLeft: 7,
        backgroundColor: colors.white,
        borderColor: colors.white,
        elevation: 10,
        borderRadius: 8,
    },
    iconStyle: {
        right: 5,
        top: 10,
    },
    maintenanceContainer: {
        width: '92%',
        marginLeft: 15,
        marginTop: 15,
        height: 79,
        backgroundColor: colors.white,
        borderColor: colors.black,
        elevation: 5,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dataContainer: {
        width: '85%'
    },
    dataInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        padding: 10
    },
    nextContainer: {
        height: 60,
        width: 24,
        backgroundColor: colors.theme,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    idLabel: {
        fontFamily: 'Lato-Bold'
    },
    status: {
        fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: colors.pending,
        marginLeft: 20
    },
    paymentStatus: {
        fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: 'blue',
        marginLeft: 30
    },
    dateLabel: {
        fontFamily: 'Lato-Bold',
        fontSize: 14,
        marginLeft: 20
    }
})
