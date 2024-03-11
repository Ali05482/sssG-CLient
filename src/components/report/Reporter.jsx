import React, { useContext } from "react";
import MainContext from "../../app/context/context";

const Reporter = ({ htmlString }) => {
  const global = useContext(MainContext);

  return (
    <div
      style={{
        border: "2px solid black",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: global?.theme?.backgroundColor,
        color: global?.theme?.inputColor,
      }}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};

export default Reporter;
