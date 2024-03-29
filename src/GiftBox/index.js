import paper from "./paper.svg";
import bow from "./bow.png";

import queryString from "query-string";

import { useState } from "react";

import { decode } from "js-base64";

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

function Gift({ img, note, link, linkDescription }) {
  return (
    <CenteringDiv>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ border: "solid 3px gold", marginBottom: "1rem" }}>
          <img
            src={img}
            style={{ maxHeight: "70vh", maxWidth: "70vw" }}
            alt=""
          />
        </div>
        <div
          style={{ fontSize: "1.5rem", maxWidth: "70vw", textAlign: "center" }}
        >
          {note}
        </div>
        <div
          style={{
            fontSize: "1rem",
            marginTop: "15px",
            maxWidth: "70vw",
            textAlign: "center",
          }}
        >
          {link && linkDescription && <a href={link}>{linkDescription}</a>}
        </div>
      </div>
    </CenteringDiv>
  );
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
  const params = queryString.parse(window.location.hash.replace("#/gift?", ""));

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "clip",
        position: "relative",
      }}
    >
      <Gift
        img={decode(params.img)}
        note={decode(params.note)}
        link={params.link && decode(params.link)}
        linkDescription={
          params.linkDescription && decode(params.linkDescription)
        }
      />
      <UnwrapEverything
        elements={
          decode(params.mode || "") === "skip"
            ? []
            : [
                <Paper></Paper>,
                <Paper></Paper>,
                <Paper></Paper>,
                <Paper></Paper>,
                <Ribbon></Ribbon>,
                <Ribbon2></Ribbon2>,
                <Bow></Bow>,
                <Tag from={decode(params.from)} to={decode(params.to)}></Tag>,
              ]
        }
      ></UnwrapEverything>
    </div>
  );
}
