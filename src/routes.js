import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdMenuBook,
  MdAttachMoney,
  MdHome,
  MdLock,
  MdCampaign,
  MdHelp,
  MdPerson,
  MdBook,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import BlastEvent from "views/admin/blastEvent";
import StudentData from "views/admin/studentData";
import CourseData from "views/admin/courseData";
import NotFound from "views/general/notfound";
import PaymentReminder from "views/admin/paymentReminder";
import CourseReminder from "views/admin/courseReminder";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Data Management",
    category:true,
    items:[
      {
        name: "Student Data",
        layout: "/admin",
        path: "/data-student",
        icon: (
          <Icon
            as={MdPerson}
            width='20px'
            height='20px'
            color='inherit'
          />
        ),
        component: StudentData,
      },
      {
        name: "Course Data",
        layout: "/admin",
        path: "/data-course",
        icon: (
          <Icon
            as={MdBook}
            width='20px'
            height='20px'
            color='inherit'
          />
        ),
        component: CourseData,
      },
    ]
  },
  {
    name: "Notification",
    category:true,
    items:[
      {
        name: "Blast Event",
        layout: "/admin",
        path: "/event",
        icon: (
          <Icon
            as={MdCampaign}
            width='20px'
            height='20px'
            color='inherit'
          />
        ),
        component: BlastEvent,
        secondary: true,
      },
      
      {
        name: "Course Reminder Log",
        layout: "/admin",
        path: "/course",
        icon: <Icon as={MdMenuBook} width='20px' height='20px' color='inherit' />,
        component: CourseReminder,
      },
      {
        name: "Payment Reminder",
        layout: "/admin",
        path: "/payment",
        icon: <Icon as={MdAttachMoney} width='20px' height='20px' color='inherit' />,
        component: PaymentReminder,
      },

    ]
  },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
  {
    name: "Not Found",
    layout: "/general",
    path: "/notfound",
    icon: <Icon as={MdHelp} width='20px' height='20px' color='inherit' />,
    component: NotFound,
    is_sidebar: false,
  },
];

export default routes;
