import React from 'react'
import nocontacts from "../../assets/no-contacts.jpg"
function NoContacts() {
  return (
    <div className='flex flex-col items-center justify-center my-auto'>
      <img className='w-[170px] h-[180px] rounded-2xl' src={nocontacts} alt="No Contacts" />
      <h4 className='text-[20px] text-white font-semibold tracking-wide mt-4'>No Contacts Yet</h4>
      <span className='text-[13px] text-white font-medium tracking-wide'>Search for people</span>
    </div>
  )
}

export default NoContacts