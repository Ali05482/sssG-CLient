import React, { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import Report from "../../../pages/ui/report";

function Editor({ onChange, editorLoaded, name, value, questionaireId }) {
  const [config, setConfig] = useState({
    readonly: false,
    placeholder: 'Start typing...',
  });
  const editorRef = useRef();
  // const { CKEditor, ClassicEditor } = editorRef.current || {};

  const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

  useEffect(() => {
    // editorRef.current = {
    //   CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
    //   ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    // };
  }, []);



  return (
    <div>
      {editorLoaded ? (
                <>
                  <Report questionaireId={questionaireId} hideFullLayout={true} />
                </>
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;