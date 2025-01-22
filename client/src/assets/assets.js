import logo_Photoroom from "./logo_Photoroom.png";
import logo from "./logo.svg";
import logo_icon from "./logo_icon.svg";
import star_icon from "./star_icon.svg";
import rating_star from "./rating_star.svg";
import profile_img_1 from "./profile_img_1.png";
import profile_img_2 from "./profile_img_2.png";
import step_icon_1 from "./step_icon_1.svg";
import step_icon_2 from "./step_icon_2.svg";
import step_icon_3 from "./step_icon_3.svg";
import email_icon from "./email_icon.svg";
import lock_icon from "./lock_icon.svg";
import cross_icon from "./cross_icon.svg";
import star_group from "./star_group.png";
import credit_star from "./credit_star.svg";
import profile_icon from "./profile_icon.png";
import img1 from "./img1.png";
import img2 from "./img2.png";
import img3 from "./img3.png";
import img4 from "./img4.png";
import img5 from "./img5.png";
import img6 from "./img6.png";

export const assets = {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  logo_Photoroom,
  logo,
  logo_icon,
  star_icon,
  rating_star,
  email_icon,
  lock_icon,
  cross_icon,
  star_group,
  credit_star,
  profile_icon,
};

export const stepsData = [
  {
    title: "Describe Your Idea",
    description:
      "Enter a short description, phrase, or detailed text to describe the image you want to generate.",
    icon: step_icon_1,
  },
  {
    title: "Generate the Image",
    description:
      "Let our AI transform your text into a stunning, high-quality image in just a few seconds.",
    icon: step_icon_2,
  },
  {
    title: "Download & Share",
    description:
      "Save your generated image or share it instantly with the world directly from our platform.",
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_img_1,
    name: "Alex Johnson",
    role: "Digital Artist",
    stars: 5,
    text: `ImaginAI has truly revolutionized the way I approach my projects. The creativity and efficiency it offers are unmatched!`,
  },
  {
    image: profile_img_2,
    name: "Emily Carter",
    role: "Content Creator",
    stars: 4,
    text: `From ideation to execution, ImaginAI has been an invaluable tool in bringing my vision to life. Highly recommend it!`,
  },
  {
    image: profile_img_1,
    name: "Alex Johnson",
    role: "Social Media Influencer",
    stars: 5,
    text: `Thanks to ImaginAI, my content quality and productivity have reached new heights. I couldn't be happier!`,
  },
];

export const plans = [
  {
    id: "Starter",
    price: 10,
    credits: 100,
    desc: "Best for casual users and small projects.",
  },
  {
    id: "Pro",
    price: 50,
    credits: 500,
    desc: "Perfect for creators and professionals.",
  },
  {
    id: "Enterprise",
    price: 200,
    credits: 2500,
    desc: "Ideal for businesses and heavy users.",
  },
];
