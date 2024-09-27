// renderField.ts
import React from 'react';
import { Field } from '../../schema/Schema.ts';

//interface definition
interface RenderFieldProps {
  field: Field;
  formData: { [key: string]: string | boolean };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const RenderField = ({
  field,
  formData,
  handleChange,
}: RenderFieldProps) => {
  //executes different cases based upon field type
  switch (field.type) {
    case 'text':
    case 'email':
    case 'tel':
      return (
        <div key={field.name} className='mb-4'>
          <label className='block text-gray-500 text-lg font-bold mb-2'>
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] as string}
            onChange={handleChange}
            className='border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300'
            required
          />
        </div>
      );
    case 'date':
      return (
        <div key={field.name} className='mb-4'>
          <label className='block text-gray-500 text-lg font-bold mb-2'>
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] as string}
            onChange={handleChange}
            className='border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300'
            required
          />
        </div>
      );
    case 'file':
      return (
        <div key={field.name} className='mb-4'>
          <label className='block text-gray-500 text-lg font-bold mb-2'>
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            multiple={field.multiple}
            onChange={handleChange}
            className='border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300'
            required
          />
        </div>
      );

    case 'select':
      return (
        <div key={field.name} className='mb-4'>
          <label className='block text-gray-500 text-lg font-bold mb-2'>
            {field.label}
          </label>
          <select
            name={field.name}
            value={formData[field.name] as string}
            onChange={handleChange}
            className='border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300'
            required>
            <option value=''>Select {field.label}</option>
            {field.options?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    case 'checkbox':
      return (
        <div key={field.name} className='mb-4 flex items-center'>
          <input
            type='checkbox'
            name={field.name}
            checked={!!formData[field.name]}
            onChange={handleChange}
            className='mr-2'
          />
          <label className='text-gray-500 text-sm font-bold tracking-wide'>
            {field.label}
          </label>
        </div>
      );
    default:
      return null;
  }
};
