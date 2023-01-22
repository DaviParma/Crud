import React from 'react'
import NavbarEdit from '../components/navbar/NavbarAddEditSearch'
import Edit from '../components/editpage/Edit'


const EditPage = ({data}) => {
  return (
    <div>
      <NavbarEdit/>
      <Edit/>
    </div>
  )
}

export default EditPage