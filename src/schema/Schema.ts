export interface Field {
  label: string;
  name: string;
  type: string;
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
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },

    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      options: ['male', 'female', 'other'],
    },
  ],
};
