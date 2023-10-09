
// import { collection, getDocs, query, where } from 'firebase/firestore'
// import React, { useEffect } from 'react'
// import { firestore } from '../../../config/firebase'
// import { useAuthContext } from '../../Context/AuthContext'

// export default function StickyWall() {
//   const {user} = useAuthContext()
//   useEffect(()=>{
//     const q = query(collection(firestore, "Students"), where("createdBy.uid", "==", user.uid))
//     const querySnapshot = getDocs(q);
//     const array = []
//     querySnapshot.forEach((doc) => {
//       let data = doc.data()
//       array.push(data)
//     });
//   },[])
//   return (
//     <>
//       <div className="container mt-5">
//         <div className="row">
//           <div className="col d-flex flex-wrap text-center">


//             <div className="container col-12 col-md-3">
//               <div className="card ps-1 py-5 pe-1 bg-light">
//                 <div className="card-body mb-0 pb-0">
//                   <h5 className="card-title fw-bold">Total Admins</h5>
//                   <p className="card-text">{array.length} </p>
//                   <div className="d-flex">
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="container col-12 col-md-3">
//             <div className="card ps-1 py-5 pe-1 bg-secondary">
//                 <div className="card-body mb-0 pb-0">
//                   <h5 className="card-title fw-bold">Total Students</h5>
//                   <p className="card-text">

//                   </p>
//                   <div className="d-flex">
                    
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="container col-12 col-md-3">
//             <div className="card ps-1 pe-1 py-5 bg-info">
//                 <div className="card-body mb-0 pb-0">
//                   <h5 className="card-title fw-bold">Total Courses</h5>
//                   <p className="card-text">
                    
//                   </p>
//                   <div className="d-flex">
                    
//                   </div>
//                 </div>
//               </div>
//             </div>


//           </div>
//         </div>
//       </div>

//     </>
//   )

// }
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../../config/firebase'
import { useAuthContext } from '../../Context/AuthContext'

export default function StickyWall() {
  const { user } = useAuthContext();
  const [studentData, setStudentData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(firestore, "Students"), where("createdBy.uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setStudentData(data);
    };

    fetchData();
  }, [user.uid]); // Trigger the effect when the user changes

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(firestore, "Courses"), where("createdBy.uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setCourseData(data);
    };

    fetchData();
  }, [user.uid]); // Trigger the effect when the user changes

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col d-flex flex-wrap text-center">

            <div className="container col-8 my-3 my-md-0 col-md-3">

              <div className="card ps-1 py-5 pe-1 bg-light">
                <div className="card-body mb-0 pb-0">
                  <h5 className="card-title fw-bold">Total Admins</h5>
                  <p className="card-text">1 </p>
                  
                </div>
              </div>
            </div>
            <div className="container col-8 my-3 my-md-0 col-md-3">

              <div className="card ps-1 py-5 pe-1 bg-light">
                <div className="card-body mb-0 pb-0">
                  <h5 className="card-title fw-bold">Total Students</h5>
                  <p className="card-text">{studentData.length} </p>
                  
                </div>
              </div>
            </div>
            <div className="container col-8 my-3 my-md-0 col-md-3">

              <div className="card ps-1 py-5 pe-1 bg-light">
                <div className="card-body mb-0 pb-0">
                  <h5 className="card-title fw-bold">Total Courses</h5>
                  <p className="card-text">{courseData.length} </p>
                  
                </div>
              </div>
            </div>

            {/* Add similar cards for other statistics */}
          </div>
        </div>
      </div>
    </>
  )
}
