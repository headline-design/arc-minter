import JSONEditor from "@json-editor/json-editor";
import React from "react";
import ReactDOM from "react-dom";
import MyCheckbox from "./MyCheckbox";

const antdEditor = key =>
  JSONEditor.defaults.editors[key].extend({
    setOptInCheckbox: function(header) {
      console.log("setOptInCheckbox");
      // the active/deactive checbox control.
      var self = this;
      const realCheckbox = document.createElement("input");
      realCheckbox.setAttribute("type", "checkbox");
      realCheckbox.setAttribute("style", "margin: 0 10px 0 0;");
      realCheckbox.classList.add("json-editor-opt-in");

      const element = React.createElement(
        MyCheckbox,
        {
          check: realCheckbox,
          scope: self,
          disabled: this.disabled
        },
        null
      );
      const div = document.createElement("div");
      ReactDOM.render(element, div);
      this.optInCheckbox = div;
      // append active/deactive checkbox if show_opt_in is true
      if (this.jsoneditor.options.show_opt_in || this.options.show_opt_in) {
        // and control to type object editors if they are not required
        if (
          this.parent &&
          this.parent.schema.type === "object" &&
          !this.isRequired() &&
          this.header
        ) {
          this.header.appendChild(this.optInCheckbox);
          this.header.insertBefore(this.optInCheckbox, this.header.firstChild);
        }
      }
    },
    setContainer: function(container) {
      this.container = container;
      this.container.style.border = "1px solid";
      this.container.style.paddingTop = "5px";
      if (this.schema.id)
        this.container.setAttribute("data-schemaid", this.schema.id);
      if (this.schema.type && typeof this.schema.type === "string")
        this.container.setAttribute("data-schematype", this.schema.type);
      this.container.setAttribute("data-schemapath", this.path);
    }
  });

module.exports = antdEditor;