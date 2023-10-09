// import React, { useEffect, useState } from 'react'
// import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
// import { Link } from 'react-router-dom';
// // import { database } from '../../../config/firebase';
// import { toast } from 'react-toastify';

// const Attendance = () => {
//   const [val, setVal] = useState([]);
//   const value = collection(database, 'student')

//   useEffect(() => {
//     const getData = async () => {
//       const dbVal = await getDocs(value);
//       setVal(dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id })));
//     }
//     getData()
//   });

//   const handleOk = async (e) => {
//     e.preventDefault();

//     const updateData = doc(database, 'student')
//     await updateDoc(updateData)
//     toast.success('Updated successfully')
//   }



//   return (
//     <div className='text-center'>
//       <h1>Attendance</h1>
//       <Link to={'/'} className='btn btn-primary' >Go to Dashboard</Link>



//       {
//         val.map(values =>
//           <form onSubmit={handleOk} action="">
//             <div className='border py-1 d-flex border justify-content-around my-3'>
//               <p className='p-0 m-0'><b>Student Id: </b>{values.studentId}</p>
//               <p className='p-0 m-0'><b>Student Name: </b>{values.studentName}</p>
//               <p className='p-0 m-0'><b>Student Contact: </b>{values.studentContact}</p>
//               <p className='p-0 m-0'><b>Student Course: </b>{values.studentCourseId}</p>
//               <div class="btn-group" role="group" data-bs-toggle="buttons">
//                 <label htmlFor="att">Attendance :</label>
//                 <input type="text" className="mx-2" name="att" id="" autocomplete="off" placeholder='Present / Absent' />

//               </div>
//               <button type='submit' className="btn btn-success btn-sm">Ok</button>
//             </div>
//           </form>
//         )
//       }


//     </div>
//   )
// }

// export default Attendance;
import React from 'react'

export default function Attendance() {
  return (
    <div>Attendance</div>
  )
}
