import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginPage() {
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: "530840899474-buh28n2ucp8g87hco41e0fkb0guc4t71.apps.googleusercontent.com",
        //androidClientId: "YOUR_ANDROID_CLIENT_ID",
        webClientId: "530840899474-o1t356qp0hrnt6egv4gb8vm7a8l4pa0o.apps.googleusercontent.com",
        redirectUri: "http://10.200.72.130:8084",
        scopes: ["profile", "email"],
        responseType: "code",
    });

    useEffect(() => {
        handleEffect();
    }, [response, token]);

    async function handleEffect() {
        const user = await getLocalUser();
        console.log("user", user);
        if (!user) {
            if (response?.type === "success") {
                const code = response.params.code;
                exchangeCodeForToken(code);
            }
        } else {
            setUserInfo(user);
            console.log("loaded locally");
        }
    }

    const exchangeCodeForToken = async (code) => {
        try {
            const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `code=${code}&client_id=YOUR_WEB_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=http://10.200.72.130:8084&grant_type=authorization_code`
            });

            const { access_token } = await tokenResponse.json();
            getUserInfo(access_token);
        } catch (error) {
            console.error(error);
        }
    };

    const getLocalUser = async () => {
        const data = await AsyncStorage.getItem("@user");
        if (!data) return null;
        return JSON.parse(data);
    };

    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            {!userInfo ? (
                <Button
                    title="Sign in with Google"
                    disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }}
                />
            ) : (
                <View style={styles.card}>
                    {userInfo?.picture && (
                        <Image source={{ uri: userInfo?.picture }} style={styles.image} />
                    )}
                    <Text style={styles.text}>Email: {userInfo.email}</Text>
                    <Text style={styles.text}>
                        Verified: {userInfo.verified_email ? "yes" : "no"}
                    </Text>
                    <Text style={styles.text}>Name: {userInfo.name}</Text>
                </View>
            )}
            <Button
                title="Remove local store"
                onPress={async () => await AsyncStorage.removeItem("@user")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    text: {
        fontSize: 16,
        marginVertical: 5,
    },
});
