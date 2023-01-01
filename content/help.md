<!-- An Alexa Skill that lets you create and customize a personal playlist of audio streams that can be easily managed through a web page. Simply say, `Alexa, ask juke box to play some blues` to listen. You can skip to the next track, or pause the audio at any time and the skill will keep progress of your streams. -->

<!-- ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lybrvz7ol44d1dnlpobk.png) -->

To get started, you will need to set up Firebase, deploy the site on Vercel, and create the Alexa Skill. While these steps may sound complicated, they can easily be completed in about 5 minutes. Just follow the steps and click and copy as needed. Let's get started!

<details>
<summary><b>Step 1 - Setup Firebase</b></summary>

Firebase enables data storage and authentication, if needed for our website and their free tier is very generous. You'll need to create a project, add a web app and enable the database.

### a. Create New Firebase Project

Create a new Firebase Project at [console.firebase.com](https://console.firebase.google.com/u/0/).

![Create a new Firebase Project](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/98dohx1yuhu3ignqymzb.png "Create a new Firebase Project")

### b. Create a Web app in your project
Next step is to create a web app. Click on `</>` icon to select the Web as the platform.

![Create a Web app](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hh64hfrmedjn032um9c0.png)

Click on `Add App`. You can name it anything you want, like MyWebsite

![Create a Web app](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pl2bx3re7b5ioj5ynojv.png)

When you create a new Web app, Firebase will create credentials that you can use to access the app from your website. 

> Note the `API Key` and `Project ID`, you'll need it when you deploy the website.

![Note the API Key and Project ID](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ambkm2ul7gujgpkggktq.png)

### c. Create database
Next we need to initialize the Firestore database in our project. We will be storing all our data in Firebase and that requires you to create a database. You don't need to add any data, just initialize it so Firebase will provision it for you.


![Create database](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4o678vt5m5taq0fo8vb7.png)

Click on Firestore Firebase and then click on `Create database` to enable it in your project.

![Create database](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eca0hsy6xwyb4q3arhwc.png)


When you create a new Web app, Firebase will create credentials that you can use to access the app from your website. Note the `API Key` and `Project ID`, you'll need it when you deploy the website.
</details>


<details>
<summary><b>Step 2 - Deploy Site On Vercel</b></summary>
 
Vercel is a great place to host the website as it is fast and enables deploying Nuxt 3 apps with zero configuration.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ezkk2gxbnfkqb9x4gw5w.png)

Just click on the button below to deploy the site on Vercel. Enter the Firebase `Project ID` and `API Key` as environment variables.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbalsimpson%2Falexa-radio-skill&env=FIREBASE_API_KEY,FIREBASE_PROJECT_ID&envDescription=Setup%20your%20Firebase%20before%20you%20deploy%20the%20site.)

Note the Github repository you create. The Alexa Skill Code required for the next step is in the root of that repository.
</details>


<details>
<summary><b>Step 3 - Create Alexa Skill</b></summary>
Last step is to create the Alexa Skill. Go to [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask/create-new-skill/name) to create an Alexa skill.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/spx7hjni29vngey3jekg.png)

Click `Create skill` and give your skill a name, like Juke Box. On the next screen, choose `Other` as the type of experience and `Custom` as model.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/czvnoh8dol8l3hdj0l6c.png)

In the next screen, choose `Start from Scratch` as the template.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zutqu8wpdd5u0sf0swep.png)

On the next screen, click `Create Skill` to create the Alexa Skill. We will add the code once the skill is created.

Once the skill is created, click on `Code` on the top menu.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gxdpjjrwzn4sn7d0zn10.png)

When the code page opens, click on `Import code`.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0655emui3srk6p63y7kq.png)

The zip file is called `AlexaSkillCode.zip` and is in the root folder of the Github repository you created while deploying your site to Vercel. Download it and then upload the zip file to Alexa.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gnga62gye1re1v8clf1o.png)

Alexa Responses to be added.
Audio Interface to be enabled.
</details>

<br>

## Add Custom Channels
You can manage your playlist at the Vercel site you deployed, accessible at [yoursitename].vercel.app. Click on `Add Channel` to add a channel.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ijgtddpll6s8bmwsuoyz.png)

A channel is a collection of stations of individual radio streams. Remember that all stream URLs has to start with `https` and be publicly accessible.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tglz3o3gx6xm7sdcooy0.png)