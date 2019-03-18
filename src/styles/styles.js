import { StyleSheet } from 'react-native';
export default (styles = StyleSheet.create({
    toolBar: {
        height: 50,
        backgroundColor: '#F21655',
        flexDirection: 'row'
    },
    toolBarText: {
        fontSize: 15,
        color: '#B6AEB0',
        textAlign: 'center',
        color: 'white',
        padding: 13
    },
    toolBarTextView: {
        flex: 10
    },
    toolBarImageView: {
        textAlign: 'center',
        flex: 1,
        padding: 13
    },
    flatListCell: {
        borderBottomWidth: 1,
        borderBottomColor: '#E8DCDF',
        padding: 20,
        flexDirection: 'row'
    },
    cellText: {
        flex: 10
    },
    cellImage: {
        flex: 1
    },
    arrowImageStyle: {
        width: 15,
        height: 15
    },
    plusImageStyle: {
        width: 20,
        height: 20
    }
}));
