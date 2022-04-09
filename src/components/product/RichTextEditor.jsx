import React, { useEffect, useState, useCallback } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = ({ editorRef }) => {

  const initializeEditoreState = (detailHtml) => {
    //convert  detail (if exist) form Html to RawDraftContentState
    if (detailHtml) {
      const contentBlock = htmlToDraft(detailHtml);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        return EditorState.createWithContent(contentState);
      }
    }
    return EditorState.createEmpty();
  };

  const initEditorState = initializeEditoreState(editorRef.current?.detail);

  const [editorState, setEditorState] = useState(initEditorState);

  const changeEditorStateHandler = (editorState) => {
    setEditorState(editorState);
  };

  const getEditorContent = useCallback(() => {
    //convert and return content form RawDraftContentState to Html
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  useEffect(
    () => (editorRef.current.getDetail = getEditorContent),
    [getEditorContent, editorRef]
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
      onEditorStateChange={changeEditorStateHandler}
      placeholder='Enter detail...'
    />
  );
};

export default RichTextEditor;
