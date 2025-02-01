import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Packet from "./Packet.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Switch from "./Hub.tsx";
import CharacterView from "./CharacterView.tsx";
import { useState } from "react";

function MainSwitch() {
    // const [name, setName] = useState<string>();
    // const [screen, setScreen] = useState<number>(0);
    // const [code, setCode] = useState<string>();
    const [inscriptionId] = useState<string>();

    const router = createBrowserRouter([
        {
            path: "/Poker/Tick",
            element: <App name="casualUser" inscriptionId={inscriptionId} />,
        },
        {
            path: "/Poker/Packet",
            element: <Packet />,
        },
        {
            path: "/Poker/",
            element: <Switch />,
        },
        {
            path: "/Poker/Char",
            element: <CharacterView />,
        },
    ]);

    return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<MainSwitch />);
