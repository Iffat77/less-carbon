import React, { useState, useCallback, useMemo } from "react";
import { createEditor } from "slate";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { Range } from "slate";
import { Selection } from "slate-react";
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
  {
    type: "paragraph",
    children: [{
      text: "Create a captivating article that leaves an impact." }],
  },
];

const TextEditor = ({ onContentChange }) => {
  const [editor] = useState(() => withReact(createEditor()));

  // const initialValue = useMemo(
  //   () =>
  //     JSON.parse(localStorage.getItem("content")) || [
  //       {
  //         type: "paragraph",
  //         children: [{ text: "A line of text in a paragraph." }],
  //       },
  //     ],
  //   []
  // );

  //will reposition to toolBar for indent functionality. 
  const handleKeyDown = (event) => {
    if (!event.ctrlKey || event.key !== " ") {
      return;
    }

    event.preventDefault();

    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: "word" });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);

      if (beforeText === "\t") {
        Transforms.select(editor, beforeRange);
        Transforms.delete(editor);
      } else {
        Transforms.insertText(editor, "\t");
      }
    } else {
      Transforms.insertText(editor, "\t");
    }
  };

  return (
    <div className="w-screen flex justify-center  ">
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            const content = JSON.stringify(value);
            onContentChange(content);
          }
        }}
      >
        <Editable
          className="min-h-[200px] md:w-1/2 lg:min-w-[500px] p-2 focus:outline-none"
          style={{ textAlign: "left" }}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
};

export default TextEditor;
