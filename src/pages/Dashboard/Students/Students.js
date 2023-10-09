import React, { useEffect, useState } from 'react'
import { firestore } from '../../../config/firebase';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { BsArrowRight } from 'react-icons/bs'
import { Button, Space, Tooltip, message } from 'antd';
import { useAuthContext } from '../../Context/AuthContext'
import { DeleteOutlined} from "@ant-design/icons"

const initialState = {
  name:"", rollNo:"", course:"", city:"", address:"", phoneNo:"" 
};

export default function Dashboard() {

  const { user } = useAuthContext()
  const [state, setSate] = useState(initialState)
  const [file, setFile] = useState(null)
  const [documents, setDocuments] = useState([])
  const [allDocuments, setAllDocuments] = useState([])

  // const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = e => {
    setSate(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const getStudents = async () => {
    const q = query(collection(firestore, "Students"), where("createdBy.uid", "==", user.uid))

    const querySnapshot = await getDocs(q);
    const array = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setAllDocuments(array)
    setDocuments(array)
  }
  useEffect(() => {
    getStudents()
  }, [])
  

  const handleAddBook = async (e) => {
    e.preventDefault()
    let { name, rollNo, course, city, address, phoneNo } = state
    let student = { name, rollNo, course, city, address, phoneNo,
      createdBy : {
        email: user.email,
        uid: user.uid,
      },
      randomId : Math.random().toString(36).slice(2),
      dateCreated : new Date().getTime()
    }
    if (!address) {
      return message.error("Something Wrong with the Address!")
    }
    if (!city) {
      return message.error("Something Wrong with the City Name!")
    }
    if (!phoneNo) {
      return message.error("Something Wrong with the Phone Number!")
    }
    if (!course) {
      return message.error("Something Wrong with the Course Name!")
    }
    if (!name) {
      return message.error("Something Wrong with the Student Name!")
    }
    if (!rollNo) {
      return message.error("Something Wrong with the Student Roll no!")
    }
    if (file) {
      return message.error("Something Went Wrong")
    }else{
      createDocument(student)
    }
  }
  const createDocument = async (student) => {

    try {
      await setDoc(doc(firestore, "Students", student.randomId), student);
      message.success("Student Added Successfully")
    } catch (err) {
      message.error("Book Inclusion Request Failed !")
    }
    getStudents()
  }
  
  // console.log('state', state)
  // setSate(initialState)

  const handleDelete = async (student) => {

    try {
      await deleteDoc(doc(firestore, "Students", student.randomId));
  
      let documentsAfterDelete = documents.filter(doc => doc.id !== student.randomId)
      setAllDocuments(documentsAfterDelete)
      setDocuments(documentsAfterDelete)
  
      message.success("Todo deleted successfully")
    } catch (err) {
      console.error(err)
      message.error("something went wrong while delting todo")
    }
      getStudents()
  }

  const handleArrow = e => {
    e.preventDefault()
    return document.getElementById("arrow").classList.remove("d-none")
  }
  const handleArrow2 = e => {
    e.preventDefault()
    return document.getElementById("arrow").classList.add("d-none")

  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">

            <div className="container my-5">

              <div className="container d-flex flex-wrap">

                <div className="container d-flex flex-column justify-content-center col-12 col-lg-7 ms-auto me-auto mb-lg-5 pb-lg-5 ">

                  <h3 className='fw-bold mb-5 pb-3 text-center'>Student Data Form</h3>

                  <form>

                    <div className="card">

                    <div className="mb-4 d-flex ">
                      <input type='text' className="form-control rounded-0 me-4" placeholder='Student Name' value={state.name} name='name' onChange={handleChange} rows={1} required />
                      <input type='text' className="form-control rounded-0 " placeholder='Roll no' value={state.rollNo} name='rollNo' onChange={handleChange} rows={1} required />

                    </div>

                    {/* <div className="input-group mb-4">
                      <div className="input-group-prepend">
                      <span className="input-group-text rounded-0 py-2">Category</span>
                      </div>
                      <input list='category' className="form-control rounded-0 pt-2" aria-label="With textarea" placeholder='Enter Subject' value={state.category} name='category' onChange={handleChange} rows={1} required />
                      <datalist id="category">
                        <option value="Web and Mobile App Development" />
                        <option value="Graphic Design" />
                        <option value="Video Animation" />
                      </datalist>
                    </div> */}

                    <textarea className="form-control rounded-0 mb-4" placeholder='Student Address' rows={5} id='textareaContact' value={state.address} name='address' onChange={handleChange} required></textarea>

                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text rounded-0 py-2 px-3">Course</span>
                      </div>
                      <input type='text' className="form-control rounded-0 pt-2" aria-label="With textarea" placeholder='' min={1} value={state.course} name='course' onChange={handleChange} rows={1} required />
                    </div>

                    <div className="input-group mb-4 rounded-0">
                      <div className="input-group-prepend">
                        <span className="input-group-text rounded-0">City Name</span>
                      </div>
                      <input type="text" min={1} className="form-control" aria-label="Amount (to the nearest dollar)" value={state.city} name='city' onChange={handleChange} required />

                    </div>

                    <div className="mb-4 d-flex flex-sm-wrap flex-md-nowrap">
                      <input type='text' className="form-control rounded-0 me-0 me-md-4" placeholder='Students Phone Number' value={state.phoneNo} name='phoneNo' onChange={handleChange} rows={1} required />

                    </div>
                      </div> 

                    <button type='submit' className='btn btn-outline-danger rounded-0 py-2 px-5' id='btn4' onClick={handleAddBook} onMouseLeave={handleArrow2} onMouseEnter={handleArrow}>Click to continue <BsArrowRight id='arrow' className=' d-none' /> </button>

                  </form>

                </div>

              </div>
            </div>


            <div className="row">
              <div className="col">
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Student Name</th>
                        <th>Roll no</th>
                        <th>Address</th>
                        <th>City Name</th>
                        <th>Phone no</th>
                        <th>Course Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((student, i) => {
                        return (
                          <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{student.name}</td>
                            <td>{student.rollNo}</td>
                            <td>{student.address}</td>
                            <td>{student.city}</td>
                            <td>{student.phoneNo}</td>
                            <td>{student.course}</td>
                            <td>
                              <Space>
                                <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(student) }} /></Tooltip>
                              </Space>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

