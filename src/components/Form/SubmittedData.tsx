import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SubmittedData = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extracts the formData
  const formData = location.state?.formData
    ? JSON.parse(location.state.formData)
    : {};

  return (
    <div className='p-4'>
      <button
        onClick={() => navigate('/')}
        className='mb-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-700'>
        Back
      </button>
      <h1 className='text-xl font-bold'>Submitted Data</h1>
      {/* <ul>
        {Object.entries(formData).map(([key, value]) => (
          <li key={key} className='py-1'>
            <strong>{key}: </strong> {value}
          </li>
        ))}
      </ul> */}

      {/* in json format */}
      <pre className='bg-gray-100 p-4 rounded border'>
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
};

export default SubmittedData;
