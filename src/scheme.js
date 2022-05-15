module.exports = {
  title: "Custom Survey",
  type: "object",
  required: ["surveyTitle", "surveyDescription", "questions"],
  properties: {
    surveyTitle: {
      title: "Survey Title",
      type: "string",
      minLength: 4
    },
    surveyDescription: {
      title: "Survey Description",
      type: "string",
      minLength: 4
    },
    questions: {
      title: "Questions",
      type: "array",
      items: {
        title: "Question",
        oneOf: [
          {
            title: "Short text",
            type: "object",
            properties: {
              type_short_text: {
                type: "boolean",
                default: true,
                options: {
                  hidden: true
                }
              },
              short_text_info: {
                title: "Short Text",
                type: "object",
                required: ["name", "is_required"],
                properties: {
                  name: {
                    title: "Title",
                    type: "string"
                  },
                  description: {
                    title: "Description",
                    type: "string"
                  },
                  is_required: {
                    title: "Is required?",
                    type: "boolean",
                    format: "checkbox",
                    default: false
                  }
                }
              }
            },
            additionalProperties: false
          },
          {
            title: "Paragraph text",
            type: "object",
            properties: {
              type_paragraph_text: {
                type: "boolean",
                default: true,
                options: {
                  hidden: true
                }
              },
              paragraph_text_info: {
                title: "Paragraph Text",
                type: "object",
                required: ["name", "is_required"],
                properties: {
                  name: {
                    title: "Title",
                    type: "string"
                  },
                  description: {
                    title: "Description",
                    type: "string"
                  },
                  is_required: {
                    title: "Is required?",
                    type: "boolean",
                    format: "checkbox",
                    default: false
                  }
                }
              }
            },
            additionalProperties: false
          },
          {
            title: "Single choice",
            type: "object",
            properties: {
              type_single_choice: {
                type: "boolean",
                default: true,
                options: {
                  hidden: true
                }
              },
              single_choice_info: {
                title: "Single Choice",
                type: "object",
                required: ["name", "is_required", "options"],
                properties: {
                  name: {
                    title: "Title",
                    type: "string"
                  },
                  description: {
                    title: "Description",
                    type: "string"
                  },
                  is_required: {
                    title: "Is required?",
                    type: "boolean",
                    format: "checkbox",
                    default: false
                  },
                  options: {
                    title: "Options",
                    type: "array",
                    format: "table",
                    items: {
                      title: "Option",
                      type: "string"
                    }
                  }
                }
              }
            },
            additionalProperties: false
          }
        ]
      }
    }
  }
};
