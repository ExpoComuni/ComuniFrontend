import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./screens/register.jsx";
import LogIn from "./screens/login.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  GarbageSchedule,
  Reports,
  AlajuelitaInfo,
  Events,
  Event,
  Phones
} from "./screens/Information/";
import { Home, Activity, Forum, Profile, Discussion } from "./screens/";
import { ConsoleHome, ConsoleLayout, ConsoleNews, ConsoleEvents, ConsoleReports } from "./screens/console/";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./index.css";

const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "activity",
        children: [
          {
            index: true,
            element: <Activity />,
          },
          {
            path: "garbage",
            element: <GarbageSchedule />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "phones",
            element: <Phones />
          },
          {
            path: "alajuelita-info",
            element: <AlajuelitaInfo />,
          },
          {
            path: "events",
            children: [
              {
                index: true,
                element: <Events />,
              },
              {
                path: ":id",
                element: <Event />,
              }
            ],
          },
        ],
      },
      {
        path: "forum",
        children: [
          {
            index: true,
            element: <Forum />,
          },
          {
            path: ":id",
            element: <Discussion />,
          }
        ]
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path:"/console",
    element: <ConsoleLayout />,
    children:[
      {
        index: true,
        element: <ConsoleHome />,
      },
      {
        path: "news",
        element: <ConsoleNews />
      },
      {
        path: "events",
        element: <ConsoleEvents/>
      },
      {
        path: "reports",
        element: <ConsoleReports/>
      },
      {
        path: "settings",
        element: <Profile/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.CLIENT_ID}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
