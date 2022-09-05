# Nuxt 3 Starter
A minimal Nuxt 3 Starter Template with Tailwind CSS 3.0+ and Firebase 9.0+

## Setup Project

```bash
# npm
npx nuxi init nuxt3-starter
```

## Add Firebase 9
```bash
# npm
npm install --save-dev firebase

# Add .env file with your Firebase Project ID and API Key
FIREBASE_API_KEY="AIzaSyASV8fdNJuv0Gwy**********"
FIREBASE_PROJECT_ID="FIREBASE_PROJECT_ID"

# Update nuxt.config.ts with Firebase env variables
publicRuntimeConfig: {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID
},
privateRuntimeConfig: {
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID
},

# Add auth.ts to server > api
import type { IncomingMessage, ServerResponse } from "http";
import { readBody } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method !== 'POST') return 'Must be post request'

    // @ts-ignore
    const { user } = await readBody(req) // only for POST request

    // @ts-ignore
    req.user = user;
    return { updated: true }
};


# Add auth.ts to plugins
export default defineNuxtPlugin(() => {
    addRouteMiddleware('auth', () => {
        const userCookie = useCookie("userCookie");

        if (!userCookie.value) {
            return navigateTo('/admin/signin')
        }
    })
})

# Add firebaseAuth.client.ts to plugins
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {

  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    projectId: config.FIREBASE_PROJECT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  initUser();
  
  const auth = getAuth();
  
  nuxtApp.vueApp.provide('auth', auth);
  nuxtApp.provide('auth', auth);
});

# Add useFirebase.ts to composables
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { addDoc, collection, getFirestore, getDocs, getDoc, doc, query, onSnapshot, writeBatch, deleteDoc, updateDoc, orderBy, where, limit, DocumentData, Query, increment } from "firebase/firestore"

export const initUser = async () => {
  const auth = getAuth();
  const db = getFirestore();
  const firebaseUser = useFirebaseUser();
  const firebaseItems = useFirebaseItems();
  firebaseUser.value = auth.currentUser;

  const userCookie = useCookie("userCookie");

  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
    } else {
      //if signed out
      // router.push("/");
    }

    firebaseUser.value = user;

    // @ts-ignore
    userCookie.value = user; //ignore error because nuxt will serialize to json

    $fetch("/api/auth", {
      method: "POST",
      body: { user },
    });
  });
};
```

## Add Tailwind CSS Nuxt Module
Tailwind CSS Nuxt Module https://tailwindcss.nuxtjs.org/
```bash
# npm
npm install --save-dev @nuxtjs/tailwindcss

# Add styles.css to assets > css
Import any required Google Font on top of the file

@import url('https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

# Add it to your modules section and update the CSS file location in your nuxt.config.ts
css: ["~/assets/css/styles.css"],
modules: [
  '@nuxtjs/tailwindcss'
]

# Create your tailwind.config.js by running:
npx tailwindcss init

# Update your tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./assets/**/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./content/*.md",
    "./pages/*.vue",
    "./layouts/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arvo: ["Arvo", "serif"],
        lora: ["Lora", "serif"],
       },
    },
  },
}
```

## Update your app meta tags
```bash
# Update your app details on nuxt.config.ts

app: {
    head: {
      title: 'Nuxt 3 Blogger',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        // { src: 'https://awesome-lib.js' }
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        // { rel: 'stylesheet', href: 'https://awesome-lib.css' }
      ],
      // please note that this is an area that is likely to change
      style: [
        // <style type="text/css">:root { color: red }</style>
        // { children: ':root { color: red }', type: 'text/css' }
      ]
    }
  },
```
