import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp({
	// will package temporary API keys for judges to use
    // apiKey: process.env.REACT_APP_FB_API_KEY,
    // authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FB_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FB_APP_ID,
    // measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
    apiKey: 'AIzaSyCO29RrNO2SwUV4jCo2VdFue0mQPepbJ9k',
    authDomain: 'eventr-5570c.firebaseapp.com',
    projectId: 'eventr-5570c',
    storageBucket: 'eventr-5570c.appspot.com',
    messagingSenderId: '443058415636',
    appId: '1:443058415636:web:b675ba93313075cd62df01',
    measurementId: 'G-K91TYYP2M6',
});

export const auth = getAuth(app);
export default app;
