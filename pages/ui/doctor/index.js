import React from 'react'
import FullLayout from '../../../src/layouts/FullLayout'
import Doctor from '../../../src/components/doctor/doctor'

const DoctorManagement = () => {
  return (
    <>
      <FullLayout>
        <div className="container">
          <Doctor/>
        </div>
      </FullLayout>
    </>
  )
}

export default DoctorManagement