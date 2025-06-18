import one from '@/public/images/oneee.jpg';
import snailLike from '@/public/images/snail-like.jpg';
import stripeShii from '@/public/images/stripesShii.jpg';
import smilingGirle from '@/public/images/smilingGirlie.jpg';
// import cupOfTea from '@/public/images/cub-of-tea.jpg';
import cupOfTea from '@/public/images/cup-of-te.jpg'
import gadget from '@/public/images/gadgets.jpg';
import tallHand from '@/public/images/tall-hand-holding-bulb.jpg';
import boySmiling from '@/public/images/smiling Gee.jpg';
import fan from '@/public/images/fan.jpg';
import kitchen from '@/public/images/kitchen.jpg';
import dreadedG from '@/public/authors/auth-dread.jpg';
import shoeLike from '@/public/images/shoe.jpg';
import { BiSolidMessageRounded } from "react-icons/bi";
import music from '@/public/images/music.jpg';
import umbrella from '@/public/images/umbrella.jpg';

const Page1Maps = [
  {
    id: 1,
    bg: '#f0f0fe',
    pics: tallHand,
    picsIcon1: BiSolidMessageRounded,
    date: 'September 25, 2022',
    duration: '3 min read',
    h1: 'Building your audience with subscriber signups',
    p: `How Ghost allows you to turn anonymous readers into an audience of active subscribers,
    so you know what's working and what isn't....`,
    img: boySmiling,
    imgName: "John Doe",
    btnCol: "#c5c5fe",
    tag: "Travel",
    path: '/pages/building-your-audience'
  },
  {
    id: 2,
    bg: '#c5f4ef',
    pics: one,
    picsIcon1: BiSolidMessageRounded,
    date: 'March 16, 2021',
    duration: '3 min read',
    h1: 'Far far away, behind the word mountains',
    p: `Hey there, welcome to your new home on the web! Unlike social networks, 
    this one is all yours. Publ...`,
    img: boySmiling,
    imgName: "Jonathan Doe",
    btnCol: "#03d4bb",
    tag: "Getting Started",
    path: '/pages/far-far-away'
  },
  {
    id: 3,
    bg: '#dff9d9',
    pics: snailLike,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'March 16, 2021',
    duration: '1 min read',
    h1: 'Selling memberships with recurring revenue',
    p: `For creators and aspiring entrepreneurs looking to generate a
     sustainable recurring revenue stream from their creative work, Ghost has built-in payments 
     allowing you to create...`,
    img: boySmiling,
    imgName: "Jonathan Doe",
    btnCol: "#83ea6c",
    tag: "Health",
    path: '/pages/Selling-memberships'
  },
  {
    id: 4,
    bg: '#e0ebfc',
    pics: stripeShii,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'March 16, 2021',
    duration: '1 min read',
    h1: 'Customizing your brand and design settings',
    p: `As discussed in the introduction post, one of the best things about Ghost 
    is just how much you can customize to turn your site into something unique....`,
    img: smilingGirle,
    imgName: "Mary Buzard ",
    btnCol: "#85b2f4",
    tag: "Technology",
    path: '/pages/Customizing'
  },
  {
    id: 5,
    bg: '#fff2be',
    pics: cupOfTea,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'March 16, 2021',
    duration: '2 min read',
    h1: 'What you need to know about Ghost Editor',
    p: `The Ghost editor has everything you need to fully optimise your content. 
    This is where you can add...`,
    img: smilingGirle,
    imgName: "Mary Buzard ",
    btnCol: "#ffcf00",
    tag: "Music",
    path: '/pages/what-you-need'
  },
  {
    id: 6,
    bg: '#c5f4ef',
    pics: gadget,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'March 16, 2021',
    duration: '2 min read',
    h1: 'Setting up apps and custom integrations',
    p: `It's possible to extend your Ghost site and connect it with hundreds of the most popular apps and tools using integrations. Whether you need to...`,
    img: boySmiling,
    imgName: "Jonathan Doe ",
    btnCol: "#1dd7c2",
    tag: "Getting Started",
    path: '/pages/how-to-grow'
  },
  {
    id: 7,
    bg: '#c5f4ef',
    pics: fan,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'March 16, 2021',
    duration: '2 min read',
    h1: 'How to grow your business around an audience',
    p: `As you grow, Ghost has a number of different user roles for your team...`,
    img: dreadedG,
    imgName: " James Brawson",
    btnCol: "#1dd7c2",
    tag: "Getting Started",
    path: '/pages/Setting'
  },
  {
    id: 8,
    bg: '#dff9d9',
    pics: kitchen,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'March 16, 2021',
    duration: '2 min read',
    h1: 'Writing and managing content in Ghost',
    p: `Ghost comes with a best-in-class editor which does its very best to get out of the way, and let you focus on your content. Don't...`,
    img: boySmiling,
    imgName: " Jonathan Doe",
    btnCol: "#83ea6c",
    tag: "Health",
    path: '/pages/Writing-and-managing'
  },
  {
    id: 9,
    bg: '#ffeae9',
    pics: shoeLike,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'April 26, 2019',
    duration: '2 min read',
    h1: 'The spectacle before us was indeed sublime',
    p: `Welcome, it's great to have you here. We know that first impressions are important, so we've populated your new site with some initial getting started...`,
    img: smilingGirle,
    imgName: "Mary Buzard",
    btnCol: "#ffaeab",
    tag: "Lifestyle",
    path: '/pages/the-spectacle'
  },
  {
    id: 11,
    bg: '#fff2be',
    pics: music,
    picsIcon1: BiSolidMessageRounded,
    date: 'March 16, 2021',
    duration: '3 min read',
    h1: 'Musical improvisation is the spontaneous music',
    p: `Ghost comes with a beautiful default theme called Casper, which is designed to be a clean, readable publication layout and can be adapted for most...`,
    img: boySmiling,
    imgName: "Jonathan Doe",
    btnCol: "#ffcf00",
    tag: "Music",
    path: '/pages/musical'
  },
  {
    id: 10,
    bg: '#c5f4ef',
    date: 'April 26, 2019',
    duration: '2 min read',
    h1: 'Apps and scripts for your Ghost website',
    p: `There are three primary ways to work with third-party services in Ghost: using Zapier, editing your theme, or using the Ghost API. Zapier You can connect your Ghost site to over 1,000 external services using the official integration with Zapier. Zapier sets up automations with Triggers and Actions, which allows you to create and...`,
    path: '/pages/musical',
    img: smilingGirle,
    imgName: "Brenda Hitchell ",
    btnCol: "#1dd7c2",
    tag: "Getting Started"
  },
  {
    id: 12,
    bg: '#c5f4ef',
    pics: umbrella,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'April 26, 2019',
    duration: '2 min read',
    h1: 'Managing admin settings',
    p: `There are a couple of things to do next while you're getting set up: Make your site private If you've got a publication that you....`,
    img: smilingGirle,
    imgName: "Brenda  ",
    btnCol: "#1dd7c2",
    tag: "Getting Started",
    path: '/pages/managing'
  }
];

export default Page1Maps;
