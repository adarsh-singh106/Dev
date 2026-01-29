import React from 'react';
import Search_Add from './Search_Add';
import List from './List';

const DashPage = ({ friendsList, onEdit, onDelete }) => {
  return (
    <div className='w-full max-w-4xl p-4 space-y-4'>
       

       {/* Pass the Data and "Edit/Delete" functions to the List */}
       <List 
          data={friendsList} 
          updateFriend={onEdit} 
          deleteFriend={onDelete} 
        />
    </div>
  )
}

export default DashPage;