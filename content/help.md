To get started with the Alexa Radio Skill, you will need to set up Firebase, deploy the site on Vercel, and create the Alexa Skill. While these steps may sound complicated, they can easily be completed in about 5 minutes. Just follow the steps and click and copy as needed. Let's get started!

## Step 1 - Setup Firebase
Firebase enables data storage and authentication for our website and their free tier is very generous.

### a. Create New Firebase Project

Create a new Firebase Project at [console.firebase.com](https://console.firebase.google.com/u/0/).

![Create a new Firebase Project](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/98dohx1yuhu3ignqymzb.png "Create a new Firebase Project")

### b. Create a Web app in your project
Next step is to create a web app. Click on `</>` icon to select the Web as the platform.

![Create a Web app](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hh64hfrmedjn032um9c0.png)

Click on `Add App`. You can name it anything you want, like MyWebsite

![Create a Web app](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pl2bx3re7b5ioj5ynojv.png)

When you create a new Web app, Firebase will create credentials that you can use to access the app from your website. Note the API Key and Project ID, you'll need it when you deploy the website.

![Note the API Key and Project ID](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ambkm2ul7gujgpkggktq.png)

### c. Create database
Next we need to initialize the Firestore database in our project. We will be storing all our data in Firebase and that requires you to create a database. You don't need to add any data, just initialize it so Firebase will provision it for you.


![Create database](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4o678vt5m5taq0fo8vb7.png)

Click on Firestore Firebase and then click on `Create database` to enable it in your project.

![Create database](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eca0hsy6xwyb4q3arhwc.png)


## Deploy Site On Vercel
The website is built with Nuxt 3 and Tailwind CSS and is fully responsive. Click the button below to deploy the site on Vercel. Enter the Project ID and API Key as environment variables.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbalsimpson%2Falexa-radio-skill&env=FIREBASE_API_KEY,FIREBASE_PROJECT_ID&envDescription=Setup%20your%20Firebase%20before%20you%20deploy%20the%20site.)

## Create Alexa Skill
