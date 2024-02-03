import React, { useContext, useState, useEffect } from "react";
import FullLayout from "../../src/layouts/FullLayout";
import Link from "next/link";
import MainContext from "../../src/app/context/context";
const PortfolioPage = () => {

  const [referrals, setReferrals] = useState([])
  const global = useContext(MainContext);
  const getReferralByReferDoctorId = async () => {
    try {
      const fetchedReferrals = await global?.getReferralByReferDoctorId();
      if (fetchedReferrals?.status) {
        setReferrals(fetchedReferrals?.result?.data);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Something Went Wrong, try again",
        })
      }
    } catch (error) {
      console.log(error.message)
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong, contact admin",
      })
    }
  };
  useEffect(() => { 
    getReferralByReferDoctorId()
  }
  , [])
  return (
    <FullLayout>
       <div className="container">
        <div className="wrapper">
          <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card">
            <div style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} className="card-header">
              <h4 style={{color:global?.theme?.color}} className="title">Referrals To You</h4>
            </div>
            <div style={{backgroundColor:global?.theme?.backgroundColor}} className="card-body">
              <table style={{backgroundColor:global?.theme?.backgroundColor}} className="table">
                <thead>
                  <tr>
                    <th style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}} >Previous Doctor</th>
                    <th style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}}>Patient</th>
                    <th style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals?.map((referral, index) => (
                    <tr key={index}>
                      <td style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}}>{referral?.previousDoctorId?.firstName + " " + referral?.previousDoctorId?.lastName }</td>
                      <td style={{backgroundColor:global?.theme?.backgroundColor, color:global?.theme?.color}}>{referral?.patientId?.firstName + " " + referral?.patientId?.lastName}</td>
                      <td style={{backgroundColor:global?.theme?.backgroundColor}}>
                        <Link href={`./report?questionnaireId=${encodeURI(referral?.questionnaireId)}&&appointmentId=${referral?.appointmentId}`}>Details</Link>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
       </div>
    </FullLayout>
  );
};

export default PortfolioPage;
