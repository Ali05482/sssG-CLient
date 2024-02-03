import React from 'react'
import Schedules from '../../../src/components/doctor/Schedules'
import FullLayout from '../../../src/layouts/FullLayout'

const Availability = () => {
  return (
    <>
      <FullLayout>
        <div className="container">
          <Schedules />
        </div>
      </FullLayout>
    </>
  )
}

export default Availability