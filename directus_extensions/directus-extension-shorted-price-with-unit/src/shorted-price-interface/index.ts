import { defineInterface } from "@directus/extensions-sdk";
import InterfaceComponent from "./interface.vue";

export default defineInterface({
  id: "shorted-price-interface",
  name: "Shorted Price",
  icon: "box",
  description: "This is my custom interface!",
  component: InterfaceComponent,
  options: [
    {
      field: "choices",
      name: "$t:choices",
      type: "json",
      meta: {
        note: "Add the unit  that will be used for input and display.",
        interface: "list",
        options: {
          template: "{{ text }}",
          fields: [
            {
              field: "text",
              name: "Text",
              type: "string",
              meta: {
                interface: "system-input-translated-string",
                width: "half",
              },
            },
            {
              field: "value",
              name: "Value",
              type: "decimal",
              meta: {
                interface: "input",
                width: "half",
              },
            },
          ],
        },
      },
    },
  ],
  group: "standard",
  localTypes: ["standard"],
  types: ["decimal", "float"],
});
