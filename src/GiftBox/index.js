import paper from "./paper.svg";
import bow from "./bow.png";

import { useState } from "react";

function CenteringDiv({ children }) {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}

function Unwapper({ children, exit }) {
  const [unwrapped, setUnwrapped] = useState(false);
  const exitToCSS = {
    right: "translate(100%, 0)",
    left: "translate(-100%, 0)",
    up: "translate(0, -100%)",
    down: "translate(0 ,100%)",
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        transition: "all .5s ease-in-out",
        transform: unwrapped ? exitToCSS[exit] : "",
        position: "absolute",
      }}
      onClick={(e) => {
        e.stopPropagation();
        console.log("clicked");
        setUnwrapped(true);
        return false;
      }}
    >
      {children}
    </div>
  );
}

function Ribbon() {
  return (
    <CenteringDiv>
      <div
        style={{
          width: "100px",
          height: "100%",
          backgroundColor: "#ddaa00",
          borderLeft: "solid 20px white",
          borderRight: "solid 20px white",
        }}
      ></div>
    </CenteringDiv>
  );
}

function Ribbon2() {
  return (
    <CenteringDiv>
      <div
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "#ddaa00",
          borderTop: "solid 20px white",
          borderBottom: "solid 20px white",
        }}
      ></div>
    </CenteringDiv>
  );
}

function Paper() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: `url(${paper})`,
        backgroundSize: "cover",
      }}
    ></div>
  );
}

function Gift() {
  return <CenteringDiv>GIFT WILL GO HERE</CenteringDiv>;
}

function Bow() {
  return (
    <CenteringDiv>
      <img
        src={bow}
        style={{
          maxWidth: "60vw",
          maxHeight: "60vh",
        }}
        alt=""
      ></img>
    </CenteringDiv>
  );
}

function UnwrapEverything({ elements }) {
  const directions = ["up", "down", "left", "right"];
  return elements.map((e, i) => (
    <Unwapper exit={directions[i % directions.length]} key={i}>
      {e}
    </Unwapper>
  ));
}

function Tag({ from, to }) {
  return (
    <CenteringDiv>
      <div
        style={{
          backgroundColor: "#f8f0e3",
          padding: "10px",
          border: "solid 5px grey",
          fontSize: "3rem",
          margin: "20px",
        }}
      >
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>To: {to}</div>
        <div style={{ marginBottom: "20px" }}>From: {from}</div>
        <div
          style={{
            marginTop: "20px",
            fontSize: "1rem",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          (Hint: Tap the screen a few times to open the present.)
        </div>
      </div>
    </CenteringDiv>
  );
}

export function GiftBox() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Gift />
      <UnwrapEverything
        elements={[
          <Paper></Paper>,
          <Paper></Paper>,
          <Paper></Paper>,
          <Paper></Paper>,
          <Ribbon></Ribbon>,
          <Ribbon2></Ribbon2>,
          <Bow></Bow>,
          <Tag from="Chris" to="Mom & Dad & Nick & Sarah"></Tag>,
        ]}
      ></UnwrapEverything>
    </div>
  );
}
