import { StyleSheet } from "react-native";



export const GlobalStyle = StyleSheet.create({
    // Fælles styles (bruges på tværs af skærme)
    container: {
        flex: 1,
        backgroundColor: "#181A20",
        padding: 20,
    },
    card: {
        backgroundColor: "#23262F",
        borderRadius: 12,
        padding: 20,
        marginVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        width: "100%",
        alignSelf: "center",
    },
    text: {
        color: "#F2F2F2",
        fontSize: 16,
    },

    // HomeScreen styles
    homeWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    homeTitle: {
        justifyContent: "center",
        alignContent: "center",
        fontSize: 24,
        marginBottom: 32,
        textAlign: "center",
        color: "#F2F2F2",
    },

    // AppHeader styles
    header: {
        backgroundColor: "#181A20",
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#23262F",
        marginBottom: 0,
        marginTop: 16,
        width: "100%",
        alignSelf: "center",
    },
    headerText: {
        color: "#A3A3A3",
        fontSize: 14,
        fontStyle: "italic",
        letterSpacing: 1,
    },
    headerButton: {
        backgroundColor: "#23262F",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    headerButtonText: {
        color: "#A3A3A3",
        fontSize: 14,
        fontWeight: "bold",
        letterSpacing: 1,
    },

    // AddQuestion skærm
    addFormWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    addFormular: {
        backgroundColor: "#23262F",
        borderRadius: 12,
        padding: 20,
        marginVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        width: "100%",
    },
    label: {
        color: "#A3A3A3",
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        backgroundColor: "#23262F",
        color: "#F2F2F2",
        borderRadius: 8,
        padding: 14,
        marginVertical: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#353945",
    },
    button: {
        backgroundColor: "#3772FF",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: "center",
        marginVertical: 12,
    },
    buttonText: {
        color: "#F2F2F2",
        fontWeight: "bold",
        fontSize: 16,
        letterSpacing: 1,
    },
    error: {
        color: "#FF4D4F",
        fontSize: 14,
        marginTop: 4,
    },

    // ViewQuestions skærm
    addButton: {
        backgroundColor: "#3772FF",
        borderRadius: 24,
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 12,
        width: 48,
        height: 48,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    questionsList: {
        marginTop: 16,
    },
    tilbageButton: {
        backgroundColor: "transparent",
        padding: 8,
        alignSelf: "flex-start",
    },

    // QuestionDetails skærm
    commentBox: {
        backgroundColor: "#23262F",
        borderRadius: 8,
        padding: 12,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
        alignItems: "flex-start",
        width: "100%",
        alignSelf: "center",
    },
    commentActions: {
        flexDirection: "row",
        marginTop: 8,
        gap: 12,
    },
    likeButton: {
        backgroundColor: "transparent",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    dislikeButton: {
        backgroundColor: "transparent",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
    },
    likeIcon: {
        color: "#A3A3A3",
        fontSize: 16,
        marginRight: 4,
    },
    dislikeIcon: {
        color: "#A3A3A3",
        fontSize: 16,
        marginRight: 4,
    },
    commentCount: {
        color: "#A3A3A3",
        fontSize: 14,
        marginRight: 2,
    },
    centerScreen: {
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContent: {
        alignItems: "center",
        paddingBottom: 32,
    },
    width: {
        width: "100%",
    },
});