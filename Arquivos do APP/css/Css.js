import {
    StyleSheet
} from 'react-native';

const css = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerTop: {
        justifyContent: 'flex-start'
    },

    darkbg: {
        backgroundColor: "#333"
    },

    login__logomarca: {
        marginBottom: 10
    },

    msg__cadastro: {
        fontWeight: "bold",
        fontSize: 22,
        color: "red",
        marginTop: 5,
        marginBottom: 15,
    },

    login__msg: (text = 'none') => ({
        fontWeight: "bold",
        fontSize: 22,
        color: "red",
        marginTop: 5,
        marginBottom: 15,
        display: text
    }),

    login__form: {
        width: "80%"
    },

    login__input: {
        backgroundColor: "#fff",
        fontSize: 19,
        padding: 7,
        marginBottom: 15
    },

    login__button: {
        padding: 12,
        backgroundColor: "blue",
        alignSelf: "center",
        borderRadius: 10
    },

    cadastro__button: {
        padding: 12,
        backgroundColor: "blue",
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 10,
    },

    login__buttonText: {
        fontWeight: "bold",
        fontSize: 22,
        color: "#333"

    },

    cadastro__buttonText: {
        fontWeight: "bold",
        fontSize: 22,
        color: "#333"
    },

    area__tab: {
        backgroundColor: '#333',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },

    area__menu: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingBottom: 10,
        width: '100%',
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center'
    },

    btn__home: {
        textAlign: 'left',
    },

    area__title: {
        width: '80%',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },

    btn__logout: {
        textAlign: 'right'
    },

    // FORMULÁRIO
    scroll_view: {
        backgroundColor: '#333',
    },

    card: {
        backgroundColor: '#32383e',
        borderWidth: 1,
        borderRadius: 4,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },

    card_header: {
        backgroundColor: '#515960',
        borderBottomColor: 'rgba(0, 0, 0, 0.6)',
        borderBottomWidth: 1,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
    },

    text_headerTitle: {
        paddingTop: 10,
        color: '#fff',
        fontSize: 22.5,
        fontWeight: '500',
        lineHeight: 27,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textTransform: "uppercase",
    },

    text_headerSubtitle: {
        paddingTop: 10,
        color: '#111',
        fontSize: 18.5,
        fontWeight: '500',
        lineHeight: 27,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textTransform: "uppercase",
    },

    card_body: {
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },

    view_title: {
        width: '100%',
    },

    /*title_label_danger: {
        color: '#ee5f5b',
        fontSize: 18,
        fontWeight: '400',
        fontHeight: 22.5,
        textAlign: 'left',
    },*/

    title_label: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 22.5,
        textAlign: "left",
    },

    title_text_input: {
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingHorizontal: 10,
        fontSize: 20,
        color: '#52575c',
    },

    view_description: {
        width: '100%',
    },

    /*description_label_danger: {
        color: '#ee5f5b',
        fontSize: 18,
        fontWeight: '400',
        fontHeight: 22.5,
        textAlign: 'left',
    },*/

    description_label: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 22.5,
        textAlign: "left",
        paddingTop: 10,
    },

    description_text_input: {
        backgroundColor: '#fff',
        borderRadius: 4,
        paddingHorizontal: 10,
        fontSize: 20,
        color: '#52575c',
        height: 150, //tamanho
        textAlignVertical: 'top',
    },

    card_button: {
        backgroundColor: '#515960',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderTopColor: 'rgba(0, 0, 0, 0.6)',
        borderTopWidth: 1,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
        display: 'flex',
        flexDirection: 'row',
    },

    button: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 50,
        width: '48%',
    },

    button_text: {
        color: '#fff',
        fontSize: 22.5,
        fontWeight: '500',
        lineHeight: 27,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        margin: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    msg_bemVindo: {
        color: '#111',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    }

});

export {
    css
};



/*button__login:{
       marginRight:20
   }*/