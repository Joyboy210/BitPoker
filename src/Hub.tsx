import { useState, Dispatch, SetStateAction } from "react";
import Title from "./components/Title";
import App from "./App";

interface HubProps {
    setName: Dispatch<SetStateAction<string | undefined>>;
    setScreen: Dispatch<SetStateAction<number>>;
    setCode: Dispatch<SetStateAction<string | undefined>>;
    setInscriptionId: Dispatch<SetStateAction<string | undefined>>;
}

function Hub({ setName, setScreen, setCode, setInscriptionId }: HubProps) {
    const [isJoin, SetIsJoin] = useState<boolean>(false);
    return (
        <>
            <Title>BitPoker</Title>
            <div className="page hub">
                <div className="center aside">
                    <div>

                        <div className="header mt-10">
                            <div className="img-header">
                                {/* <img src="iconclean.png" alt="" /> */}
                                <h3 className="title">BitPoker</h3>

                            </div>
                            {/* <h5
                                onClick={() => {
                                    document.location.href = "https://itaylayzer.github.io/";
                                }}
                            >
                                @itaylayzer
                                <img
                                    src="smallheart.png"
                                    alt=""
                                    style={{ height: 25, width: 25, paddingInline: 10, marginBlock: "auto", translate: "0px 5px" }}
                                />
                                14.12.23
                            </h5> */}
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            onChange={(e) => {
                                setName(e.currentTarget.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Enter Inscription ID"
                            onChange={(e) => {
                                setInscriptionId(e.currentTarget.value);
                            }}
                        />
                        {isJoin ? (
                            <input
                                type="text"
                                placeholder="Enter Code"
                                onChange={(e) => {
                                    setCode(e.currentTarget.value);
                                }}
                            />
                        ) : (
                            <></>
                        )}
                        <div className="buttons">
                            {isJoin ? (
                                <>
                                    {" "}
                                    <button
                                        onClick={() => {
                                            SetIsJoin(false);
                                        }}
                                    >
                                        BACK
                                    </button>
                                    <button
                                        onClick={() => {
                                            setScreen(1);
                                        }}
                                    >
                                        JOIN
                                    </button>
                                </>
                            ) : (
                                <>
                                    {" "}
                                    <button
                                        onClick={() => {
                                            SetIsJoin(true);
                                        }}
                                    >
                                        JOIN
                                    </button>
                                    <button
                                        onClick={() => {
                                            setScreen(2);
                                        }}
                                    >
                                        CREATE
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <img src="cards.png" className="hubanimcards" alt="" />
                </div>
                <footer>
                    {/* <button
                        onClick={() => {
                            setScreen(3);
                        }}
                    >
                        credits
                    </button> */}
                    {/* <button
                        onClick={() => {
                            setScreen(4);
                        }}
                    >
                        settings
                    </button> */}
                </footer>
            </div>
        </>
    );
}

function Join({ name, code, inscriptionId }: { name: string; code: string; inscriptionId?: string }) {
    return <App name={name} ip={code} inscriptionId={inscriptionId} />;
}

function Create({ name, inscriptionId }: { name: string; inscriptionId?: string }) {
    return <App name={name} ip="itaylayzer-poker" create={true} inscriptionId={inscriptionId} />;
}

function Credits({ setScreen }: { setScreen: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <div className="page hub">
            <div className="center">
                <div className="credits">
                    <h2>Textures</h2>
                    <p>
                        {" "}
                        Cards from <a href="https://g.co/kgs/kRstRo">Google Solitare</a> ripped by{" "}
                        <a href="https://www.spriters-resource.com/browser_games/googlesolitaire/sheet/147613/">DogToon64</a>
                    </p>
                </div>
                <br />
                <br />
                <button
                    onClick={() => {
                        setScreen(0);
                    }}
                    style={{ minWidth: 175 }}
                >
                    BACK
                </button>
            </div>
        </div>
    );
}
function Settings({ setScreen }: { setScreen: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <div className="page hub">
            <div className="center">
                <div className="settings">
                    <h2>Textures</h2>
                    <p>
                        <select name="" id="">
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                    </p>
                    <p>Cards Texture</p>
                </div>
                <br />
                <br />
                <button
                    onClick={() => {
                        setScreen(0);
                    }}
                    style={{ minWidth: 175 }}
                >
                    BACK
                </button>
            </div>
        </div>
    );
}

function Switch() {
    const [name, setName] = useState<string>();
    const [code, setCode] = useState<string>();
    const [screen, setScreen] = useState<number>(0);
    const [inscriptionId, setInscriptionId] = useState<string>();

    if (name !== undefined) {
        switch (screen) {
            case 1:
                if (code != undefined) return <Join name={name} code={code} inscriptionId={inscriptionId} />;
                else alert("YOU NEED TO ENTER CODE FIRST");
                return <Hub setName={setName} setScreen={setScreen} setCode={setCode} setInscriptionId={setInscriptionId} />;
            case 2:
                return <Create name={name} inscriptionId={inscriptionId} />;
            default:
                return <Hub setName={setName} setScreen={setScreen} setCode={setCode} setInscriptionId={setInscriptionId} />;
        }
    } else {
        if ([1, 2].includes(screen)) {
            alert("YOU NEED TO ENTER A NAME FIRST");
            setScreen(0);
        }
        switch (screen) {
            case 3:
                // credit
                return <Credits setScreen={setScreen} />;
            case 4:
                // credit
                return <Settings setScreen={setScreen} />;
            default:
                return <Hub setName={setName} setScreen={setScreen} setCode={setCode} setInscriptionId={setInscriptionId} />;
        }
    }
}

export default Switch;
