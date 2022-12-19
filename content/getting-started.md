# Alexa Radio Skill
New version with Nuxt 3 and Firebase.

## Getting Started
You will need to setup Firebase first and then the deploy the site on Vercel and finally you will create the Alexa Skill. Sounds complicated, but all you need to do is to do some clicking and copy pasting. Let's get started.


## Firebase
Firebase enables data storage and authentication for our website and their free tier is very generous. 

### Step 1 - Create New Firebase Project
Create a new Firebase Project at console.firebase.com.

### Step 2 - Create a Web app in your project
When you create a new Web app, Firebase will create credentials that you can use to access the app from your website.

### Step 3 - Create database
We will be storing all our data in Firebase and that requires you to create a database. You don't need to add any data, just initialize it so Firebase will provision it for you.

### Step 4 - Update Firestore rules
This will ensure that only logged in users will have access to the data.

### Step 5 - Enanble Authentication
Enable it

### Step 6 - Add new user
You will use these credentials to login to your website.

## Vercel
For free website hosting, we'll use VErcel. Deploying the website could not be easier. Create a new project and just import the github repository.

### Add Environment variables
Add the Firebase Project Id and Project Name to the environment variables.