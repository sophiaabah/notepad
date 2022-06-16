import React from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

export default function Editor({ currentNote, updateNote }) {
  const [selectedTab, setSelectedTab] = React.useState("write");
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(currentNote.note);
  }, [currentNote.note]);

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  function onNoteChange(text) {
    setValue(text);
  }

  function onSave() {
    updateNote(value, currentNote.id);
  }

  return (
    <section className="pane editor">
      <div className="flex justify-end pa2">
        <button
          className="pa2 "
          onClick={onSave}
          style={{
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          Save changes
        </button>
      </div>

      <ReactMde
        value={value}
        onChange={onNoteChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  );
}
