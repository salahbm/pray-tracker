import {
  FiBarChart2,
  FiBriefcase,
  FiDollarSign,
  FiPieChart,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

import { IBenefit } from "@/types";

export const benefits: IBenefit[] = [
  {
    title: "Prayer Time Management",
    description:
      "Never miss a prayer with our intelligent prayer time tracking system that adapts to your location and schedule.",
    bullets: [
      {
        title: "Accurate Prayer Times",
        description:
          "Get precise prayer times based on your location and preferred calculation methods.",
        icon: <FiBarChart2 size={26} />,
      },
      {
        title: "Smart Notifications",
        description: "Receive timely reminders customized to your schedule.",
        icon: <FiTarget size={26} />,
      },
      {
        title: "Prayer Logging",
        description:
          "Easily track your daily prayers with our intuitive logging system.",
        icon: <FiTrendingUp size={26} />,
      },
    ],
    imageSrc: "/images/history-portrait.png",
  },
  {
    title: "Qibla & Location Features",
    description:
      "Stay connected to your prayers with precise Qibla direction and smart location-based features.",
    bullets: [
      {
        title: "Built-in Qibla Compass",
        description: "Find the Qibla direction accurately from anywhere.",
        icon: <FiDollarSign size={26} />,
      },
      {
        title: "Automatic Updates",
        description:
          "Prayer times adjust automatically as you travel across time zones.",
        icon: <FiBriefcase size={26} />,
      },
      {
        title: "Region Settings",
        description:
          "Customize your experience with region-specific prayer conventions.",
        icon: <FiPieChart size={26} />,
      },
    ],
    imageSrc: "/images/salahs-left.png",
  },
  {
    title: "Community & Friends",
    description:
      "Connect with friends and family to support each other in your spiritual journey.",
    bullets: [
      {
        title: "Friend System",
        description:
          "Add friends and family to create your own prayer community.",
        icon: <FiUser size={26} />,
      },
      {
        title: "Prayer Streaks",
        description:
          "Track and compare prayer streaks with friends for healthy motivation.",
        icon: <FiTrendingUp size={26} />,
      },
      {
        title: "Community Support",
        description:
          "Share achievements and encourage each other to maintain regular prayers.",
        icon: <FiShield size={26} />,
      },
    ],
    imageSrc: "/images/friends-portrait.png",
  },
  {
    title: "Analytics & Insights",
    description:
      "Gain deeper insights into your prayer journey with advanced tracking and analytics.",
    bullets: [
      {
        title: "Detailed Statistics",
        description:
          "View comprehensive analytics about your prayer times and consistency.",
        icon: <FiBarChart2 size={26} />,
      },
      {
        title: "Achievement System",
        description:
          "Earn special badges and rewards as you reach prayer milestones.",
        icon: <FiTarget size={26} />,
      },
      {
        title: "Progress Visualization",
        description:
          "Beautiful heatmaps and charts to visualize your spiritual growth.",
        icon: <FiPieChart size={26} />,
      },
    ],
    imageSrc: "/images/awards-left.png",
  },
];
