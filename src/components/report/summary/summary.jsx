import React, { useState, useContext, useEffect } from "react";
import MainContext from "../../../app/context/context";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import { summaryBuilder } from "../../../shared/report";
import Reporter from "../Reporter";
const Summary = ({ config, questionnaireId, questionnaires }) => {
  const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
  const global = useContext(MainContext);
  const [content, setContent] = useState("");

  const convertDataToContent = () => {
    const content = summaryBuilder(questionnaires, global);
    setContent(content);
  };
  useEffect(() => {
    convertDataToContent();
  }, [questionnaires]);
  return (
    <>
      <Reporter htmlString={content} />
      {/* <JoditEditor
                value={content}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
            /> */}
    </>
  );
};

export default Summary;
