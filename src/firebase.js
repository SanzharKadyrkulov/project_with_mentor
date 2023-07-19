import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyD0OUSi5Z_NbasMoIhG9YV2tMGfCqQTOtc",
	authDomain: "project-with-mentor-d318c.firebaseapp.com",
	projectId: "project-with-mentor-d318c",
	storageBucket: "project-with-mentor-d318c.appspot.com",
	messagingSenderId: "896456371078",
	appId: "1:896456371078:web:e09894fc4c2c5cd633da07",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
