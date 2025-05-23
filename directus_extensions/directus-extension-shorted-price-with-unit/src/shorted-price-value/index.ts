import { defineDisplay } from "@directus/extensions-sdk";
import DisplayComponent from "./display.vue";

export default defineDisplay({
  id: "shorted-price-value",
  name: "Shorted Price Value",
  icon: "box",
  description: "This display shows the shorted price value",
  component: DisplayComponent,
  options: [
    {
      field: "choices",
      name: "$t:choices",
      type: "json",
      meta: {
        interface: "list",
        options: {
          template: "{{text}}",
          fields: [
            {
              field: "text",
              name: "$t:text",
              type: "string",
              meta: {
                interface: "system-input-translated-string",
                width: "half",
                required: true,
                options: {
                  placeholder: "$t:displays.labels.choices_text_placeholder",
                },
              },
            },
            {
              field: "value",
              name: "$t:value",
              type: "string",
              meta: {
                interface: "input",
                options: {
                  font: "monospace",
                  placeholder: "$t:displays.labels.choices_value_placeholder",
                },
                required: true,
                width: "half",
              },
            },
            {
              field: "icon",
              name: "$t:icon",
              type: "string",
              meta: {
                interface: "select-icon",
                width: "half",
              },
            },
            {
              field: "color",
              name: "$t:color",
              type: "string",
              meta: {
                interface: "select-color",
                width: "half",
              },
            },
            {
              field: "foreground",
              name: "$t:foreground_color",
              type: "string",
              meta: {
                interface: "select-color",
                width: "half",
              },
            },
            {
              field: "background",
              name: "$t:background_color",
              type: "string",
              meta: {
                interface: "select-color",
                width: "half",
              },
            },
          ],
        },
      },
    },
  ],
  types: ["float", "decimal"],
});
