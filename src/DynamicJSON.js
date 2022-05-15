import { useEffect, useRef } from "react";
import { JSONEditor } from "@json-editor/json-editor";
// https://github.com/json-editor/json-editor
const schema = {
  title: "Custom Survey",
  type: "object",
  required: "surveyTitle",
  properties: {
    surveyTitle: {
      title: "Survey Title",
      type: "string",
      minLength: 2,
      maxLength: 4,
      required: true
    },
    surveyDescription: {
      title: "Survey Description",
      type: "string",
      minLength: 4
    },
    pets: {
      type: "array",
      format: "table",
      title: "Pets",
      uniqueItems: true,
      items: {
        type: "object",
        title: "Pet",
        properties: {
          type: {
            type: "string",
            enum: ["cat", "dog", "bird", "reptile", "other"],
            default: "dog"
          },
          name: {
            type: "string"
          }
        }
      },
      default: [
        {
          type: "dog",
          name: "Walter"
        }
      ]
    }
  }
};

const schema2 = {
  type: "object",
  properties: {
    resourceType: {
      type: "string",
      enum: [
        "SERVER",
        "STORAGE",
        "SNAPSHOT",
        "IP",
        "IP_ADDRESS",
        "NATGATEWAY",
        "NIC"
      ],
      example: "SERVER"
    },
    resourceUUID: {
      type: "string",
      format: "uuid",
      example: "83debc7b-fbee-4c69-83a9-df57bb186726"
    },
    intervalMin: {
      type: "number",
      format: "int32",
      example: 44640
    },
    intervalDivisor: {
      type: "number",
      format: "int32",
      example: 60
    },
    from: {
      type: "string",
      format: "datetime-local",
      example: "2020-01-01T00:00:00.000Z"
    },
    to: {
      type: "string",
      format: "datetime-local",
      example: "2020-01-31T23:59:59.999Z"
    },
    itemStub: {
      type: "string",
      enum: [
        "A01000",
        "C01000",
        "C02000",
        "C03000",
        "CWSQL1001",
        "CWSQL2001",
        "CWSQL3001",
        "CWSQL1000",
        "CWSQL2000",
        "NAT1000",
        "NC1000",
        "R01000",
        "S01000",
        "S02000",
        "S03000",
        "S05000",
        "WL1000",
        "WL2000",
        "WL3000",
        "WL4000"
      ],
      example: "C01000"
    },
    value: {
      type: "number",
      format: "float",
      example: 4
    },
    valueDivisor: {
      type: "number",
      format: "int32",
      example: 1
    },
    additionalParameters: {
      type: "string",
      example: "AMD_OPTERON"
    }
  }
};

export default function DynamicJSON() {
    const formRef = useRef(null);

    const editor = useRef(null);
  
    useEffect(() => {
      JSONEditor.defaults.options.theme = "barebones";
      JSONEditor.defaults.options.iconlib = "fontawesome5";
  
      const options = {
        schema,
        theme: "bootstrap4",
        iconLib: "fontawesome5",
        disable_collapse: false,
        collapsed: true,
        array_controls_top: true,
        remove_empty_properties: true,
        disable_edit_json: false,
        disable_properties: false
        // compact: true
      }; 
  
      formRef.current.innerHTML = "";
      const editor = new JSONEditor(formRef.current, options);
    }, []);
  
  return (
    <form className="contact-form"
    onSubmit={(e) => {
        e.preventDefault();
        console.log(JSON.stringify(editor.current.getValue()));
      }}>
      <div  ref={formRef}></div>
     <button type="submit">Save JSON</button>
    </form>
    
  );
}