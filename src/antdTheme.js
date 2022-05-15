import React from "react";
import ReactDOM from "react-dom";
//import MyCheckbox from "./MyCheckbox";
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const JSONEditor = require("@json-editor/json-editor");

const antdTheme = JSONEditor.defaults.theme.bootstrap4.extend({
  getCheckbox() {
    var el = this.getFormInputField("checkbox");
    /*  var el = this.getFormInputField("checkbox");
    el.classList.add("ant-checkbox");
    console.log(">>>", el.on);*/
    return el;
  },
  getFormControl(label, input, description) {
    let labelText = label ? label.textContent : "";
    let descriptionText = description ? description.textContent : "";
    const group = document.createElement("div");
    if (label && (input.type === "checkbox" || input.type === "radio")) {
      group.classList.add("form-check");
      label.classList.add("form-check-label");
      input.classList.add("form-check-input");
      // label.appendChild(input);
      label.insertBefore(input, label.firstChild);
      group.appendChild(label);
    } else {
      group.classList.add("form-group");
      if (label) {
        label.classList.add("form-control-label");
        group.appendChild(label);
      }
      group.appendChild(input);
    }

    if (description && labelText !== descriptionText)
      group.appendChild(description);

    return group;
  },
  getButton(text, icon, title) {
    const el = this._super(text, icon, title);
    el.classList.add("ant-btn", "ant-btn-primary");
    return el;
  },
  getModal() {
    const el = document.createElement("div");
    el.style.background = "#fff";
    el.style.borderRadius = "4px";
    el.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
    el.style.padding = "5px";
    el.style.position = "absolute";
    el.style.zIndex = "10";
    el.style.display = "none";
    el.style.fontSize = "14px";
    return el;
  }
});
export default antdTheme
module.exports = antdTheme;
