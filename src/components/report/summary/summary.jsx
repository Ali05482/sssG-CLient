import React, { useState, useContext, useEffect } from 'react'
import MainContext from '../../../app/context/context'
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2'
import { summaryBuilder } from '../../../shared/report';
const Summary = ({ config, questionnaireId, questionnaires }) => {
    const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
    const global = useContext(MainContext);
    const [content, setContent] = useState('');

    const convertDataToContent = () => {
        const content =  summaryBuilder(questionnaires, global)
        setContent(content)
    };
    const handleReportSave = async () => {
        try {
            const data = {
                questionaireId:questionnaireId,
                data: content
            }
            await global.saveDoctorChange(data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    
    useEffect(() => {
        convertDataToContent();
    }, [questionnaires])
    return (
        <>
            <button type='button' className='ml-2 mb-2 mt-2 btn btn-primary' onClick={handleReportSave}>Save Report</button>
            <JoditEditor
                value={content}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
            />
        </>
    )
}

export default Summary