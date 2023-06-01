// Import React dependencies.
import React, { useState, useCallback, useMemo } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";
import { Editor, Transforms, Element as SlateElement } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const TextEditor = ({ onContentChange }) => {
  const [editor] = useState(() => withReact(createEditor()));
  // Update the initial content to be pulled from Local Storage if it exists.
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem("content")) || [
        {
          type: "paragraph",
          children: [{ text: "A line of text in a paragraph." }],
        },
      ],
    []
  );

  return (
    <div className="w-screen flex justify-center border border-green-400">
      <Slate editor={editor}
        initialValue={initialValue}
        onChange={value => {
          const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
          )
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value)
            localStorage.setItem('content', content)
            onContentChange(content)
          }
        }}
      
      >
        <Editable
          className=" min-h-[200px] md:w-1/2 lg:min-w-[500px] border-2 border-violet-300"
          disableDefaultStyles
        />
      </Slate>
    </div>
  );
};

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default TextEditor;

// renderElement={renderElement}
// onKeyDown={(event) => {
//   if (event.key === "`" && event.ctrlKey) {
//     event.preventDefault();
//     // Determine whether any of the currently selected blocks are code blocks.
//     const [match] = Editor.nodes(editor, {
//       match: (n) => n.type === "code",
//     });
//     // Toggle the block type depending on whether there's already a match.
//     Transforms.setNodes(
//       editor,
//       { type: match ? "paragraph" : "code" },
//       {
//         match: (n) =>
//           SlateElement.isElement(n) && Editor.isBlock(editor, n),
//       }
//     );
//   }
// }}
