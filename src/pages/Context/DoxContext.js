import React, { createContext, useContext, useEffect, useState } from 'react'
import { collection, getDocs, where } from 'firebase/firestore';
import { firestore } from '../../config/firebase'

const DoxContext = createContext()
export default function DoxContextProvider(props) {
    const [documents, setDocuments] = useState([])

useEffect(() => {
    fatchDoc()

  }, [documents])

  const fatchDoc = async () => {
    const querySnapshot = await getDocs(collection(firestore, "todos"), where("user.uid", "==", "todos.createdBy.uid"));
    const array = []
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      array.push(data)
    });
    setDocuments(array)
  }

    return (
        <DoxContext.Provider value={{ documents}}>
            {props.children}
        </DoxContext.Provider>
    )
}

export const UesDoxContext=()=> useContext(DoxContext)