import _ from "lodash";

export const formatDate = (date)=> {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate.replace(/(\d+)-(\w+)-(\d+)/, '$1-$2-$3');
}
export const  formatTime = (inputTime)=> {
     if(!_?.isUndefined(inputTime)){
      const [hours, minutes] = inputTime?.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes), 0);
    
      const options = { hour: 'numeric', minute: '2-digit', hour12: true };
      const formattedTime = date.toLocaleTimeString('en-US', options);
      return formattedTime.replace(' ', ' ').toUpperCase();
     }
}
export const calculateAge = (dateOfBirth)=> {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

