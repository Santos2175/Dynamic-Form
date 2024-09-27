export interface Field {
  label: string;
  name: string;
  type: string;
  multiple?: boolean;
  options?: string[];
}

export interface Schema {
  fields: Field[];
}

// schema definitions
export const formSchema: Schema = {
  fields: [
    { label: 'Full Name', name: 'fullName', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Contact No.', name: 'contact', type: 'tel' },
    { label: 'Enter Date', name: 'date', type: 'date' },
    { label: 'Upload File', name: 'file', type: 'file', multiple: true },

    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      options: ['male', 'female', 'other'],
    },
    {
      label: 'I agree to the terms and conditions',
      name: 'terms',
      type: 'checkbox',
    },
  ],
};
