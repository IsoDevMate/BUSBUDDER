import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api/v1/payments';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
}

async function getPayments() {
  const response = await fetch(`http://localhost:7000/api/v1//bookings/allbookings`);
  return handleResponse(response);
}

async function getPaymentById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return handleResponse(response);
}

async function getPaymentsByBookingId(bookingId) {
  const response = await fetch(`${API_URL}/booking/${bookingId}`);
  return handleResponse(response);
}

function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState('all');
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      let response;
      if (searchType === 'all') {
        response = await getPayments();
      } else if (searchType === 'paymentId' && searchId) {
        response = await getPaymentById(searchId);
        response = { success: true, data: [response.data] };
      } else if (searchType === 'bookingId' && searchId) {
        response = await getPaymentsByBookingId(searchId);
      } else {
        response = await getPayments();
      }

      if (response.success && Array.isArray(response.data)) {
        setPayments(response.data);
      } else {
        console.error('Expected an array in response.data but received:', response.data);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPayments();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Payment Management</h2>
        <div>
          <button onClick={fetchPayments} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Refresh
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <form onSubmit={handleSearch}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select 
              value={searchType} 
              onChange={(e) => setSearchType(e.target.value)}
              style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }}
            >
              <option value="all">All Payments</option>
              <option value="paymentId">By Payment ID</option>
              <option value="bookingId">By Booking ID</option>
            </select>
            {searchType !== 'all' && (
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder={`Enter ${searchType === 'paymentId' ? 'Payment' : 'Booking'} ID`}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd', flex: '1' }}
              />
            )}
            <button 
              type="submit"
              style={{ padding: '8px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Payment ID</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Booking ID</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Amount(Ksh)</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Payment Method</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(payments) && payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px' }}>{payment._id}</td>
                  <td style={{ padding: '12px' }}>{payment.bookingId}</td>
                  <td style={{ padding: '12px' }}>{payment.amount}</td>
                  <td style={{ padding: '12px' }}>{payment.paymentMethod}</td>
                  <td style={{ padding: '12px', color: getPaymentStatusColor(payment.status) }}>
                    {payment.status}
                  </td>
                  <td style={{ padding: '12px' }}>{new Date(payment.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

function getPaymentStatusColor(status) {
  switch (status) {
    case 'completed':
      return 'green';
    case 'pending':
      return 'orange';
    case 'failed':
      return 'red';
    case 'refunded':
      return 'blue';
    default:
      return 'gray';
  }
}

export default PaymentManagement;