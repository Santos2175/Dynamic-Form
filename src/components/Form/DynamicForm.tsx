import { useState } from 'react';
import { Schema } from '../../schema/Schema.ts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { RenderField } from './RenderField.tsx';

const DynamicForm = ({ schema }: { schema: Schema }) => {
  const navigate = useNavigate();

  //Initialization
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

  //handles the submitting of form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //executes this if there are no two passwords
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
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-gray-200 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-lg w-full'>
        <div className='text-center mb-6'>
          <h2 className='text-xl font-semibold text-blue-600'>
            🎉 Tired of Building Forms from Scratch? 🎉
          </h2>
          <p className='text-gray-500 font-semibold mt-2 tracking-normal leading-normal font-mono'>
            Say goodbye to the hassle of coding forms for every little thing!
            With just a tweak to the{' '}
            <span className='text-blue-500 font-semibold'>schema</span>, you can
            whip up a dynamic form that handles any input you throw at it! It’s
            like having a magic wand 🪄 for forms!
          </p>
        </div>
        <h1 className='text-2xl text-center font-bold mb-4 text-slate-500'>
          Dynamic Form
        </h1>
        <form
          className='w-full max-w-md mx-auto flex flex-col justify-center'
          onSubmit={handleSubmit}
          method='POST'>
          {/* handles rendering of field present in schema */}
          {schema.fields.map((field) =>
            RenderField({ field, formData, handleChange })
          )}

          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 rounded-xl mb-2 mt-2'>
            Submit
          </button>
        </form>

        {/* setup for notifications */}
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
