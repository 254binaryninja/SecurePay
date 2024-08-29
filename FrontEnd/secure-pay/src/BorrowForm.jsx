import { useState } from 'react';
import PropTypes from 'prop-types';
import AccptImg from './assets/accepted.png';
import RejctImg from './assets/rejected.png';

const BorrowForm = ({ onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [response, setResponse] = useState(null); // To handle backend response
  const [showPopup, setShowPopup] = useState(false); // To control popup visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber && amount) {
      // Simulate API call and backend response
      const isApproved = onSubmit({ phoneNumber, amount });

      // Set the response based on backend result
      setResponse(isApproved);
      setShowPopup(true);
    } else {
      alert('Please fill in both fields.');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Borrow Money</h2>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="number"
          placeholder="Enter the amount to borrow"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>

      {showPopup && (
        <div style={popupStyle} onClick={handleClosePopup}>
          <div style={popupContentStyle}>
            <img
              src={response ? AccptImg : RejctImg}
              alt={response ? 'Accepted' : 'Rejected'}
              style={imageStyle}
            />
            <button onClick={handleClosePopup} style={closeButtonStyle}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

BorrowForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const containerStyle = {
  position: 'relative',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  margin: '0 auto',
  padding: '1rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
  marginBottom: '1rem',
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};

const popupStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const popupContentStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  textAlign: 'center',
};

const imageStyle = {
  width: '100px',
  height: '100px',
  marginBottom: '1rem',
};

const closeButtonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  borderRadius: '4px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
};

export default BorrowForm;
