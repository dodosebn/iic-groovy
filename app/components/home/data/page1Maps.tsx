import one from '@/public/homepagecards/oneee.jpg'
import snailLike from '@/public/homepagecards/stacked-Food.jpg'
import stripeShii from '@/public/homepagecards/rag-like.jpg';
import smilingGirle from '@/public/images/smilingGirlie.jpg';
// import cupOfTea from '@/public/images/cub-of-tea.jpg';
import cubofTea from '@/public/homepagecards/cub-of-tea.jpg'
import gadget from '@/public/homepagecards/gadgets.jpg';
import tallHand from '@/public/homepagecards/bulb.jpg';
import boySmiling from '@/public/images/smiling Gee.jpg';
import fan from '@/public/images/fan.jpg';
import kitchen from '@/public/images/kitchen.jpg';
import dreadedG from '@/public/authors/auth-dread.jpg';
import shoeLike from '@/public/images/shoe.jpg';
import { BiSolidMessageRounded } from "react-icons/bi";
import music from '@/public/images/music.jpg';
import umbrella from '@/public/images/umbrella.jpg';
import headSet from '@/public/authors/auth-headset.jpg';

const Page1Maps = [
  {
    id: 1,
    bg: '#f0f0fe',
    pics: tallHand,
    picsIcon1: BiSolidMessageRounded,
    date: 'September 25, 2022',
    // duration: '3 min read',
    h1: 'Building your audience with subscriber signups',
    p: `How Ghost allows you to turn anonymous readers into an audience of active....`,
    img: boySmiling,
    imgName: "Jonathan Doe",
    btnCol: "#c5c5fe",
    tag: "Health",
    path: '/pages/building-your-audience'
  },
  {
    id: 2,
    bg: '#c5f4ef',
    pics: one,
    picsIcon1: BiSolidMessageRounded,
    date: 'March 16, 2021',
    // duration: '3 min read',
    h1: 'Far far away, behind the word mountains',
    p: `Hey there, welcome to your new home on the web! Unlike social networks, 
    this one...`,
    img: boySmiling,
    imgName: "Socioloji",
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
    // duration: '1 min read',
    h1: 'Selling memberships with recurring revenue',
    p: `For creators and aspiring entrepreneurs looking to generate a
     sustainable...`,
    img: boySmiling,
    imgName: "Socioloji",
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
    // duration: '1 min read',
    h1: 'Customizing your brand and design settings',
    p: `As discussed in the introduction post, one of the best things about Ghost ....`,
    img: smilingGirle,
    imgName: "Socioloji",
    btnCol: "#85b2f4",
    tag: "Lifestyle",
    path: '/pages/Customizing'
  },
  {
    id: 5,
    bg: '#fff2be',
    pics: cubofTea,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'March 16, 2021',
    h1: 'What you need to know about Ghost Editor',
    p: `The Ghost editor has everything you need to fully optimise your content...`,
    img: smilingGirle,
    imgName: "Socioloji",
    btnCol: "#ffcf00",
    tag: "Lifestyle",
    path: '/pages/what-you-need'
  },
  {
    id: 6,
    bg: '#c5f4ef',
    pics: gadget,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'March 16, 2021',
    h1: 'Setting up apps and custom integrations',
    p: `It's possible to extend your Ghost site and connect it with hundreds of the most...`,
    img: boySmiling,
    imgName: "Socioloji",
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
    h1: 'How to grow your business around an audience',
    p: `As you grow, Ghost has a number of different user roles for your team...`,
    img: dreadedG,
    imgName: "Socioloji",
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
    h1: 'Writing and managing content in Ghost',
    p: `Ghost comes with a best-in-class editor which does its very best to get out of the...`,
    img: dreadedG,
    imgName: "Socioloji",
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
    h1: 'The spectacle before us was indeed sublime',
    p: `Welcome, it's great to have you here. We know that first impressions are important...`,
    img: smilingGirle,
    imgName: "Socioloji",
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
    h1: 'Musical improvisation is the spontaneous music',
    p: `Ghost comes with a beautiful default theme called Casper, which is designed to be a...`,
    img: boySmiling,
    imgName: "Socioloji",
    btnCol: "#ffcf00",
    tag: "Lifestyle",
    path: '/pages/musical'
  },

  {
    id: 12,
    bg: '#c5f4ef',
    pics: umbrella,
    picsIcon1: BiSolidMessageRounded,
    picsIcon2: BiSolidMessageRounded,
    date: 'April 26, 2019',
    h1: 'Managing admin settings, and all you need to know',
    p: `There are a couple of things to do next while you're getting set up: Make your site....`,
    img: headSet,
    imgName: "Socioloji",
    btnCol: "#1dd7c2",
    tag: "Getting Started",
    path: '/pages/managing'
  }
];

export default Page1Maps;
