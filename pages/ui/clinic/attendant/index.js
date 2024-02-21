import React from 'react'
import AddAttendant from '../../../../src/components/attendant/addAttendant'
import FullLayout from '../../../../src/layouts/FullLayout'

const Attendant = () => {
  return (
    <>
      <FullLayout>
        <div className="container">
          <AddAttendant />
        </div>
      </FullLayout>
    </>
  )
}

export default Attendant