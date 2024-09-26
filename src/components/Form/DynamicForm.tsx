import { useState } from 'react';
import { Schema, Field } from '../../schema/Schema.ts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const DynamicForm = ({ schema }: { schema: Schema }) => {
  const navigate = useNavigate();
  const initailFormData = schema.fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as { [key: string]: string });
  const [formData, setFormData] = useState(initailFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //Find all the password fields
    const passwordFields = schema.fields.filter(
      (field) => field.type === 'password'
    );

    //if there are exactly two password fields implement password check
    if (passwordFields.length === 2) {
      const password1 = formData[passwordFields[0].name];
      const password2 = formData[passwordFields[1].name];

      if (password1 !== password2) {
        toast.error('Passwords do not match!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
        return;
      }
      const { [passwordFields[1].name]: _, ...filteredFormData } = formData;

      console.log('form Data Submitted: ', filteredFormData);
      toast.success('Form submitted successfully!!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

        theme: 'light',
      });

      setTimeout(() => {
        navigate('/submitted-data', {
          state: { formData: JSON.stringify(filteredFormData) },
        });
        setFormData(initailFormData);
      }, 1000);
    } else {
      console.log('form Data Submitted: ', formData);
      toast.success('Form submitted successfully!!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

        theme: 'light',
      });

      setTimeout(() => {
        navigate('/submitted-data', {
          state: { formData: JSON.stringify(formData) },
        });
        setFormData(initailFormData);
      }, 1000);
    }
  };

  const renderField = (field: Field) => {
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
              value={formData[field.name]}
              onChange={handleChange}
              className='border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300'
              required
            />
          </div>
        );
      case 'password':
        return (
          <div key={field.name} className='mb-4'>
            <label className='block text-gray-500 text-lg font-bold mb-2'>
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
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
              value={formData[field.name]}
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
      default:
        return null;
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-gray-200 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-lg w-full'>
        <div className='text-center mb-6'>
          <h2 className='text-xl font-semibold text-blue-600'>
            🎉 Tired of Building Forms from Scratch? 🎉
          </h2>
          <p className='text-gray-500 font-semibold mt-2 tracking-normal leading-normal'>
            Say goodbye to the hassle of coding forms for every little thing!
            With just a tweak to the{' '}
            <span className='text-blue-500 font-semibold'>schema</span>, you can
            whip up a dynamic form that handles any input you throw at it! It’s
            like having a magic wand 🪄 for forms!
          </p>
        </div>
        <h1 className='text-2xl text-center font-bold mb-4 text-slate-500'>
          Form
        </h1>
        <form
          className='w-full max-w-md mx-auto flex flex-col justify-center'
          onSubmit={handleSubmit}>
          {schema.fields.map((field) => renderField(field))}
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 rounded-xl mb-2 mt-2'>
            Submit
          </button>
        </form>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
          className='mt-2'
        />
      </div>
    </div>
  );
};

export default DynamicForm;
