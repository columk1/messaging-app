const users = [
  {
    id: '07724974-2988-44bf-b56b-c53117363b85',
    name: 'Demo Account',
    email: 'demo@example.com',
    username: 'demoaccount',
    password: 'demoaccount',
    image: 'https://i.pravatar.cc/96?img=7',
    contacts: [
      'e6572e98-7386-491c-a2bd-161521cade19',
      '27f42015-4391-4d3a-ae91-ebf8697cc6f7',
      'f37b32c5-218d-4839-adce-eb8be9e869c7',
      'cce392dc-5ee3-4de8-9d37-47fb3a931e8e',
      '9c28b978-f782-4e7f-a6db-78b4c85f932f',
      '20863b7d-ea11-4c0f-952c-fc18126d9d9e',
    ],
  },
  {
    id: 'f37b32c5-218d-4839-adce-eb8be9e869c7',
    name: 'Imani Williams',
    email: 'imani.williams@example.com',
    username: 'imaniw',
    password: 'imaw4567',
    image: 'https://i.pravatar.cc/96?img=16',
  },
  {
    id: '6203e1d3-62d7-46a6-9b2a-b578cb9edcbb',
    name: 'Isabelle Dubois',
    email: 'isabelle.dubois@example.com',
    username: 'belldub',
    password: 'isad3456',
    image: 'https://i.pravatar.cc/96?img=1',
  },
  {
    id: '27f42015-4391-4d3a-ae91-ebf8697cc6f7',
    name: 'Chris P. Bacon',
    email: 'chris.p.bacon@example.com',
    username: 'crispyb',
    password: 'chrispb678',
    image: 'https://i.pravatar.cc/96?img=53',
  },
  {
    id: 'cce392dc-5ee3-4de8-9d37-47fb3a931e8e',
    name: 'Paige Turner',
    email: 'paige.turner@example.com',
    username: 'paiget',
    password: 'paiget901',
    image: 'https://i.pravatar.cc/96?img=32',
  },
  {
    id: 'e6572e98-7386-491c-a2bd-161521cade19',
    name: 'Brock Lee',
    email: 'brock.lee@example.com',
    username: 'brockl',
    password: 'brockl567',
    image: 'https://i.pravatar.cc/96?img=58',
  },
  {
    id: '20863b7d-ea11-4c0f-952c-fc18126d9d9e',
    name: 'Lucas Müller',
    email: 'lucas.muller@example.com',
    username: 'mullered',
    password: 'lucm1234',
    image: 'https://i.pravatar.cc/96?img=60',
  },
  {
    id: '9c28b978-f782-4e7f-a6db-78b4c85f932f',
    name: 'Aleksandr Ivanov',
    email: 'aleksandr.ivanov@example.com',
    username: 'aleksandri',
    password: 'alei8901',
    image: 'https://i.pravatar.cc/96?img=68',
  },
  {
    name: 'Malik Johnson',
    email: 'malik.johnson@example.com',
    username: 'malikj',
    password: 'malj3456',
    image: 'https://i.pravatar.cc/96?img=64',
  },
  {
    name: 'Nia Jelani',
    email: 'nia.jelani@example.com',
    username: 'niaj',
    password: 'niaj0123',
    image: 'https://i.pravatar.cc/96?img=48',
  },
  {
    name: 'Emilia Nowak',
    email: 'emilia.nowak@example.com',
    username: 'emilian',
    password: 'emin0123',
    image: 'https://i.pravatar.cc/96?img=43',
  },
  {
    name: 'Evelyn Choi',
    email: 'evelyn.choi@example.com',
    username: 'evelync',
    password: 'evc78901',
    image: 'https://i.pravatar.cc/96?img=25',
  },
  {
    name: 'Liam Nguyen',
    email: 'liam.nguyen@example.com',
    username: 'liamn',
    password: 'lin23456',
    image: 'https://i.pravatar.cc/96?img=62',
  },
  {
    name: 'Mason Smith',
    email: 'mason.smith@example.com',
    username: 'masons',
    password: 'mas34567',
    image: 'https://i.pravatar.cc/96?img=13',
  },
  {
    name: 'Malcolm Brown',
    email: 'malcolm.brown@example.com',
    username: 'malcolmb',
    password: 'malb1234',
    image: 'https://i.pravatar.cc/96?img=51',
  },
  {
    name: 'Eduardo Lopez',
    email: 'eduardo.lopez@example.com',
    username: 'eduardol',
    password: 'edl123456',
    image: 'https://i.pravatar.cc/96?img=14',
  },
  {
    name: 'Jasmine Vasquez',
    email: 'jasmine.smith@example.com',
    username: 'jasmines',
    password: 'jas123456',
    image: 'https://i.pravatar.cc/96?img=39',
  },
  {
    name: 'Sophia Dlamini',
    email: 'sophia.dlamini@example.com',
    username: 'sophiad',
    password: 'sopd8901',
    image: 'https://i.pravatar.cc/96?img=22',
  },
  {
    name: 'Oscar García',
    email: 'oscar.garcia@example.com',
    username: 'oscarg',
    password: 'oscg4567',
    image: 'https://i.pravatar.cc/96?img=12',
  },
]

const conversations = [
  {
    name: 'Recipes',
    isGroup: true,
    userIds: [
      '07724974-2988-44bf-b56b-c53117363b85',
      'e6572e98-7386-491c-a2bd-161521cade19',
      '27f42015-4391-4d3a-ae91-ebf8697cc6f7',
    ],
    messages: [
      {
        body: `Hello everyone! Let's share our fav recipes here.`,
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
        seenId: '07724974-2988-44bf-b56b-c53117363b85',
      },
      { body: 'Great idea!', senderId: 'e6572e98-7386-491c-a2bd-161521cade19' },
      { body: `Awesome! I'll start.`, senderId: '27f42015-4391-4d3a-ae91-ebf8697cc6f7' },
      {
        image:
          'https://res.cloudinary.com/dsrekt1mo/image/upload/f_auto,q_auto/xw7cspba8haougxocofx',
        senderId: '27f42015-4391-4d3a-ae91-ebf8697cc6f7',
      },
      { body: 'Tea and Brown Sauce. Delish!', senderId: '27f42015-4391-4d3a-ae91-ebf8697cc6f7' },
      { body: 'Wow.', senderId: 'e6572e98-7386-491c-a2bd-161521cade19' },
    ],
  },
  {
    userIds: ['07724974-2988-44bf-b56b-c53117363b85', 'f37b32c5-218d-4839-adce-eb8be9e869c7'],
    messages: [
      { body: 'Good morning!', senderId: 'f37b32c5-218d-4839-adce-eb8be9e869c7' },
      { body: 'Morning!', senderId: '07724974-2988-44bf-b56b-c53117363b85' },
      {
        body: `Are we still on? How's the weather looking?`,
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
      },
      {
        image:
          'https://res.cloudinary.com/dsrekt1mo/image/upload/v1710918290/wh28plusocrdcwsa2x0y.jpg',
        senderId: 'f37b32c5-218d-4839-adce-eb8be9e869c7',
      },
      { body: 'Ha!', senderId: '07724974-2988-44bf-b56b-c53117363b85' },
      {
        body: `It's not bad. There should be a window in the afternoon if we can make it out there.`,
        senderId: 'f37b32c5-218d-4839-adce-eb8be9e869c7',
      },
      {
        body: `Cool, I'll give you a shout later so. 🤞`,
        senderId: 'f37b32c5-218d-4839-adce-eb8be9e869c7',
      },
      {
        body: '👍',
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
        seenId: 'f37b32c5-218d-4839-adce-eb8be9e869c7',
      },
    ],
  },
  {
    userIds: ['07724974-2988-44bf-b56b-c53117363b85', '20863b7d-ea11-4c0f-952c-fc18126d9d9e'],
    messages: [
      {
        body: "What's up?",
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
      },
      {
        body: 'Not much, just working on some coding projects. You?',
        senderId: '20863b7d-ea11-4c0f-952c-fc18126d9d9e',
      },
      {
        body: 'Nice! Same here, diving into some Python scripting.',
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
      },
      {
        body: 'Got any interesting projects going on?',
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
      },
      {
        body: "I'm experimenting with machine learning algorithms for image recognition. Trying to train a model to identify different species of birds from images.",
        senderId: '20863b7d-ea11-4c0f-952c-fc18126d9d9e',
      },
      {
        body: 'Sounds fun!',
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
      },
      {
        body: "It's been challenging but rewarding. Still fine-tuning the model's accuracy, but I'm getting some promising results. 🤓 What about your scripts? Anything exciting?",
        senderId: '20863b7d-ea11-4c0f-952c-fc18126d9d9e',
      },
      {
        body: "I'm streamlining some data processing tasks for a client.",
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
      },
      {
        body: 'Nothing too crazy. Just the low hanging fruit.',
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
      },
      {
        body: "🌱 The fertile soil of inefficiency! Have you checked out that library for data visualization yet? It's pretty slick.",
        senderId: '20863b7d-ea11-4c0f-952c-fc18126d9d9e',
      },
      {
        body: "Not yet, but it's on the list. I'm slowly mining my way through your recommendations.",
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
      },
      {
        body: "Okay let me know when you get to it and I'll have some more links for you.",
        senderId: '20863b7d-ea11-4c0f-952c-fc18126d9d9e',
      },
      {
        body: 'Sounds good! Anyway, I gotta get back to debugging. Catch you later.',
        senderId: '07724974-2988-44bf-b56b-c53117363b85',
      },
      {
        body: 'Good luck!',
        senderId: '20863b7d-ea11-4c0f-952c-fc18126d9d9e',
        seenId: '07724974-2988-44bf-b56b-c53117363b85',
      },
    ],
  },
]

const demoCredentials = {
  email: 'demo@example.com',
  password: 'demoaccount',
  redirect: false,
}

export { users, conversations, demoCredentials }
