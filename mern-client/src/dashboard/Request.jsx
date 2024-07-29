import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal } from "flowbite-react";
import { AuthContext } from '../contects/AuthProvider'; // Fixed typo in path
import { FaEnvelope, FaPhone } from 'react-icons/fa'; // For icons

const Request = () => {
  const { user } = useContext(AuthContext);
  const [userOrders, setUserOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleSendMail = () => {
    window.location.href = `mailto:${selectedOrder.userId}`; // Ensure selectedOrder has email
  };

  // Helper function to contact via phone
  const handleContactNow = () => {
    window.location.href = `tel:${selectedOrder.phoneNumber}`;
  };

  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/all-orders")
        .then(res => res.json())
        .then(data => {
          // Filter orders based on logged-in user's email and request status
          const filteredOrders = data.filter(order => 
            order.sellerId === user.email
          );
          setUserOrders(filteredOrders);
        })
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, [user]);

  const handleAccept = (orderId, bookId) => {
    // Fetch order details first
    fetch(`http://localhost:5000/order/${orderId}`)
      .then(res => res.json())
      .then(order => {
        // Update the order request status
        return fetch(`http://localhost:5000/order/${orderId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers if needed
          },
          body: JSON.stringify({ request: 'accepted' }), // Update order request field to 'accepted'
        })
        .then(res => res.json())
        .then(() => {
          // Update the book status
          return fetch(`http://localhost:5000/book/${bookId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              // Add authentication headers if needed
            },
            body: JSON.stringify({ ordered: true }), // Update book field to 'ordered'
          });
        })
        .then(res => res.json())
        .then(() => {
          // Update the local state
          setUserOrders(prevOrders => 
            prevOrders.map(o => 
              o._id === orderId ? { ...o, request: 'accepted', ordered: true } : o
            )
          );
          // Set the selected order and open the modal
          setSelectedOrder(order);
          setIsModalOpen(true);
        });
      })
      .catch(error => console.error('Error fetching order details:', error));
  };

  return (
    <div className="my-12 px-4 text-white bg-gray-1000">
      <h2 className='mb-8 text-3xl font-bold'>Requests for your Books</h2>
      <div className="overflow-x-auto text-white bg-black">
        <Table className="lg_w-[1180px]">
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Book Name</Table.HeadCell>
            <Table.HeadCell>Author Name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span>Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {userOrders.map((order, index) => (
              <Table.Row 
                key={order._id} 
                className={`${
                  order.request === 'accepted' ? 'bg-green-100' : 'bg-white'
                } dark:border-gray-700 dark:bg-gray-800`}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{order.bookTitle}</Table.Cell>
                <Table.Cell>{order.authorname}</Table.Cell>
                <Table.Cell>{order.category}</Table.Cell>
                <Table.Cell>Rs {order.price}</Table.Cell>
                <Table.Cell>
                  {order.request === 'pending' ? 'Pending' : 'Accepted'}
                </Table.Cell>
                <Table.Cell>
                  {order.request === 'pending' && (
                    <Button
                      onClick={() => handleAccept(order._id, order.bookId)}
                      className="bg-green-600 px-4 py-1 font-semibold text-white rounded-lg"
                    >
                      Accept
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Modal */}
      {selectedOrder && (
       <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
         <Modal.Header>Order Details</Modal.Header>
         <Modal.Body className="text-black">
           <div className="space-y-4">
             <h3 className="text-lg font-semibold">Details</h3>
             <p><strong>First Name:</strong> {selectedOrder.firstName}</p>
             <p><strong>Last Name:</strong> {selectedOrder.lastName}</p>
             <p><strong>Phone Number:</strong> {selectedOrder.phoneNumber}</p>
             <p><strong>Address:</strong> {selectedOrder.address}</p>
           </div>
         </Modal.Body>
         <Modal.Footer className="flex justify-between items-center">
           <div className="flex space-x-4">
             <Button
               onClick={handleContactNow}
               className="bg-green-600 text-white flex items-center space-x-2"
             >
               <FaPhone className="text-xl" />
               <span>Contact Now</span>
             </Button>
             <Button
               onClick={handleSendMail}
               className="bg-blue-600 text-white flex items-center space-x-2"
             >
               <FaEnvelope className="text-xl" />
               <span>Send Mail</span>
             </Button>
           </div>
           <Button
             onClick={() => setIsModalOpen(false)}
             className="bg-red-600 text-white"
           >
             Close
           </Button>
         </Modal.Footer>
       </Modal>
      )}
    </div>
  );
};

export default Request;
