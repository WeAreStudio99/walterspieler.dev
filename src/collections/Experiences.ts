import type { CollectionConfig } from "payload";

export const Experiences: CollectionConfig = {
  slug: "experiences",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: [
      "companyName",
      "relatedExperiencePosts",
      "startDate",
      "endDate",
    ],
    useAsTitle: "companyName",
  },
  fields: [
    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "companyLogo",
      label: "Company Logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "companyDescription",
      label: "Company Description",
      type: "textarea",
      localized: true,
    },
    {
      name: "companyWebsite",
      label: "Company Website",
      type: "text",
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      required: true,
      defaultValue: "2024-01-01",
      admin: {
        date: {
          pickerAppearance: "monthOnly",
          displayFormat: "MMMM yyyy",
        },
      },
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "monthOnly",
          displayFormat: "MMMM yyyy",
        },
      },
    },
    {
      name: "usedTechnologies",
      label: "Used Technologies",
      type: "array",
      fields: [
        {
          name: "technology",
          type: "text",
        },
      ],
    },
    {
      name: "relatedExperiencePosts",
      type: "join",
      collection: "experiencePosts",
      on: "experience",
    },
  ],
};
