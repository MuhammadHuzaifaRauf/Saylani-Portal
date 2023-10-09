
import React, { useEffect, useState } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Space, Tooltip, message } from 'antd'
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { firestore } from '../../../config/firebase';
import { DeleteOutlined} from "@ant-design/icons"
import { useAuthContext } from '../../Context/AuthContext';

const initialState = { name: "", code: "", description: "", }

export default function Courses() {

  const [state, setSate] = useState(initialState)
  const [documents, setDocuments] = useState([])
  const [allDocuments, setAllDocuments] = useState([])
 const { user } = useAuthContext()
  const handleChange = e => {
    setSate(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const getCourses = async () => {

    const q = query(collection(firestore, "Courses"), where("createdBy.uid", "==", user.uid))

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
    getCourses()
  }, [])
  
const handleSubmit =async (e)=>{
e.preventDefault()

let {name, code, description} = state
let course = {name, code, description,
  randomId : Math.random().toString(36).slice(2),
  dateCreated : new Date().getTime(),
  createdBy : {
    email: user.email,
    uid: user.uid,
  },
}
if (!name) {
  return message.error("Something is Wrong with the Name!")
}
if (!code) {
  return message.error("Something is Wrong with the Code!")
}
if (!description) {
  return message.error("Something is Wrong with the Description!")
}
else{
  createDocument(course)
}
  getCourses()
}

const createDocument = async (course) => {
  try {
    await setDoc(doc(firestore, "Courses", course.randomId), course)
    // await setDoc(doc(firestore, "Courses", course.randomId), course);
    message.success("Book Added Successfully")
  } catch (err) {
    console.error("Firebase error:", err);
    message.error("Book Inclusion Request Failed !")
  }
}

const handleDelete = async (course) => {

  try {
    await deleteDoc(doc(firestore, "Courses", course.randomId));

    let documentsAfterDelete = documents.filter(doc => doc.id !== course.randomId)
    setAllDocuments(documentsAfterDelete)
    setDocuments(documentsAfterDelete)

    message.success("Todo deleted successfully")
  } catch (err) {
    console.error(err)
    message.error("something went wrong while delting todo")
  }
    getCourses()
}




  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className='course-main'>
      <div className="top-side">

        <div className="add me-3 d-flex justify-content-end">
          <Button type="primary" className='my-4' onClick={showDrawer} size='middle' icon={<i className="bi bi-clipboard2-plus"></i>} >
            Add New Course
          </Button>
        </div>
      </div>
      <Drawer
        title="Add a new course"
        width={620}
        onClose={onClose}

        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form layout="vertical" >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="courseName"
                label="Course Name"
                rules={[
                  {
                    required: true,

                  },
                ]}
              >
                <Input placeholder="Please enter course name" onChange={handleChange} name='name' value={state.name} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="courseId"
                label="Course Code"
                rules={[
                  {
                    required: true,

                  },
                ]}
              >
                <Input placeholder="Please enter course code" onChange={handleChange} name='code' value={state.code} />
              </Form.Item>
            </Col>
            {/* <Col span={24}>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the type',
                  },
                ]}
              >
                <Select placeholder="Please choose the status" onChange={handleChange} value={state.status} >
                  <Option value="active" >Active</Option>
                  <Option value="inactive" >Unactive</Option>
                </Select>
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter course description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter course description" onChange={handleChange} name='description' value={state.description} />
              </Form.Item>
              <Space>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} type="primary">
                  Submit
                </Button>
              </Space>
            </Col>
          </Row>

        </Form>
      </Drawer>
      <div className="row">
              <div className="col">
                <div className="table-responsive">
                  <table className="table table-striped align-middle">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Course Name</th>
                        <th>Course description</th>
                        <th>Course Code</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((course, i) => {
                        return (
                          <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.code}</td>
                            <td>
                              <Space>
                                <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(course) }} /></Tooltip>
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
  )
}
