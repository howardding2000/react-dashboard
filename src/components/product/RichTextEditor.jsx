import React, { useEffect, useState, useCallback } from "react";
import { EditorState, convertToRaw,ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = ({ editorRef }) => {

  //get detail form product detail
  const getInitEditoreState = () => {
    const detailHtml = editorRef.current?.detail;
    if (detailHtml) {
      const contentBlock = htmlToDraft(detailHtml);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  };

  const [editorState, setEditorState] = useState(() =>
  getInitEditoreState()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const getDetail = useCallback(() => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  useEffect(
    () => (editorRef.current.getDetail = getDetail),
    [getDetail, editorRef]
  );
  return (
    <Editor
      editorState={editorState}
      wrapperStyle={{
        border: "1px solid lightgray",
        minHeight: "30rem",
        cursor: "text",
      }}
      editorStyle={{ padding: "0px 5px" }}
      onEditorStateChange={onEditorStateChange}
      placeholder="Enter detail..."
    />
  );
};

export default RichTextEditor;
