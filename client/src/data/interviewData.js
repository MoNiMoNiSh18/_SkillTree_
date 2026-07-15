import {
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaRocket
} from "react-icons/fa";

import { MdBusiness } from "react-icons/md";

export const companies = [
  {
    id: "google",
    name: "Google",
    icon: FaGoogle,
    difficulty: "Hard",
    duration: "15 Minutes",
    questions: 10,
    color: "text-green-500"
  },

  {
    id: "amazon",
    name: "Amazon",
    icon: FaAmazon,
    difficulty: "Hard",
    duration: "15 Minutes",
    questions: 10,
    color: "text-orange-500"
  },

  {
    id: "microsoft",
    name: "Microsoft",
    icon: FaMicrosoft,
    difficulty: "Medium",
    duration: "15 Minutes",
    questions: 10,
    color: "text-blue-500"
  },

  {
    id: "tcs",
    name: "TCS",
    icon: MdBusiness,
    difficulty: "Easy",
    duration: "15 Minutes",
    questions: 10,
    color: "text-purple-500"
  },

  {
    id: "infosys",
    name: "Infosys",
    icon: MdBusiness,
    difficulty: "Easy",
    duration: "15 Minutes",
    questions: 10,
    color: "text-cyan-500"
  },

  {
    id: "startup",
    name: "Startup",
    icon: FaRocket,
    difficulty: "Medium",
    duration: "15 Minutes",
    questions: 10,
    color: "text-yellow-500"
  }
];

export const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "AI Engineer",
  "Blockchain Developer"
];

