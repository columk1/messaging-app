<a name="readme-top"></a>

<h3 align="center">Messaging App</h3>
  <p align="center">
  A real-time messaging app built with [Next.js](https://nextjs.org/) using React, Tailwind, Prisma, Postgres, NextAuth and Pusher <b><a href="https://messaging-app-azure.vercel.app/" >messaging-app-azure.vercel.app</a></b> hosted on Vercel.
  </p>
</div>

<!-- ABOUT THE PROJECT -->

[![Conversation Page Screenshot][conversation-screenshot]](https://messaging-app-azure.vercel.app/)

## About The Project

The guts of this project comes from a tutorial by [AntonioErdeljac](https://github.com/AntonioErdeljac). You can view his original repo [here](https://github.com/AntonioErdeljac/next13-messenger).

I made a list of 60 issues as I went through the tutorial and worked through them one by one. From the beginning, I made some design choices, opting to use a serverless Postgres database instead of the MongoDb instance used in the tutorial. I also chose to create some of my own custom solutions where packages had been reached for. I focused mostly on security and performance but made improvements in many areas. Most of the significant changes I made have been added to the [changelog](CHANGELOG.md). There is also a more verbose summary in the collapsed section below.

<details>
<summary>Summary of changes</summary>
My first priority was to clean up the API routes and to improve the security and performance of the application. I managed to greatly reduce the amount of data being sent to the client and to improve the data privacy of each user. I also brought in the validation library zod and used it to validate and sanitize all data payloads being sent from the client before using them on the back-end.

In terms of performance, I reduced the number of round trips to the db by making use of the session and combining queries, populating foreign keys, lifting up state where multiple components were fetching the same data, utilizing context where appropriate, reducing the number of client hooks and using more complex layouts to enable more components to be rendered on the server and more data to be shared between them.

I also worked on the UX. I built out the sparse error handling and created error pages and various different solutions in the ui to display errors from the server, including client side validation of forms. I created error pages, loading states and loading pages. I created many fallback UIs and set up pages so that only the dynamic sections would display the loading state. I added image placeholders to prevent layout shift. I fixed many small issues related to conversation and message order and the routing and sorting behaviour of the conversations list and conversations page when conversations are created, updated and deleted. I added dedicated routes for login and register pages instead of using components and state. I built settings pages with multiple routes instead of relying on a modal that was only accessible on large screens.

In terms of accessibility I replaced a lot of clickable divs with actual button elements and swapped out divs for semantic elements where appropriate. I also added text for screen readers beneath any icon-only buttons and replaced buttons and divs that were using the useRouter hook with Link elements where appropriate and split the auth route into separate routes to support external links.

After finishing the most glaring issues, I built out the messaging interface, adding more props to the message body component and using them to enhance the use of names in group conversations, to designate a color to each user in a group, and to group sequences of messages from the same user together.
I created a contact list feature and an interface to search from all users and add or remove them from contacts.
Then I created a seed script that creates multiple users and conversations, as well as a demo account and a demo account login button for the login page.
</details>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

1. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)
2. Set up a serverless Postgres database with [Neon](https://neon.tech/). Alternatively, check the documentation of the provider you are using and import the relevant driver adapter to `./app/lib/prisma`
3. Set up a real-time channel with [Pusher](https://pusher.com/).
4. Set up a product environment with [Cloudinary](https://cloudinary.com/).
5. Register your application to use the 0Auth APIs of [Github](https://github.com/settings/developers) and [Google Cloud](https://console.cloud.google.com/)

```sh
nvm install 21.6.0
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/columk1/messaging-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set up .env.local file
   ```
   DATABASE_URL=
   DIRECT_URL=
   NEXTAUTH_SECRET=

   GITHUB_ID=
   GITHUB_SECRET=

   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=

   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

   NEXT_PUBLIC_PUSHER_APP_KEY=
   PUSHER_APP_ID=
   PUSHER_SECRET=
   PUSHER_CLUSTER=
   ```

4. Create the database
   ```sh
   npx prisma db push
   ```
5. Start the development server
   ```sh
   npm run dev
   ```

<!-- ROADMAP -->

## Roadmap

- [ ] Update loading states using Suspense Boundaries
- [ ] Add popover to individual messages - delete, reply, copy, forward
- [ ] Add option to leave conversation
- [ ] Call to action to "Add to contacts" when receiving a message from a non-contact
- [ ] Limit messages and implement history-loading on scroll

<!-- CONTACT -->

## Contact

Email - columk1@gmail.com
Twitter - [@ColumKelly3](https://twitter.com/ColumKelly3)
Website - [columkelly.com](https://www.columkelly.com)

Live Project Link: [messaging-app-azure.vercel.app](https://messaging-app-azure.vercel.app/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[conversation-screenshot]: screenshots/conversation.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
