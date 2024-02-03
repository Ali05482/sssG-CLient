import React, { useEffect } from 'react'
import AddSchedules from '../../../src/components/doctor/addSchedules';
import FullLayout from '../../../src/layouts/FullLayout';

const CreateSchedule = ({ day }) => {
    return (
        <>  <FullLayout>
            <div className="container">
                <AddSchedules day={day} />
            </div>
        </FullLayout>
        </>
    )
}
export async function getServerSideProps(context) {
    const { query } = context;
    const day = query?.day || '';
    return {
        props: { day },
    };
}
export default CreateSchedule