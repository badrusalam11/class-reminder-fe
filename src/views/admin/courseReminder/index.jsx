/* eslint-disable no-unused-vars */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { 
Box,
SimpleGrid, 
Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import DevelopmentTable from "views/admin/courseReminder/components/DevelopmentTable";
import {
  columnsDataDevelopment,
} from "views/admin/courseReminder/variables/columnsData";

import React from "react";
import { callApi } from '../../../api';

export default function Settings() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()
  const [message, setMessage] = React.useState('');
  const [name, setName] = React.useState('');
  const [nim, setNim] = React.useState('');
  const [rclass, setClass] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [major, setMajor] = React.useState('');
  const[isLoading, setIsLoading] = React.useState(false)
  const[data, setData] = React.useState([])
  const [listClass, setListClass] = React.useState([])
  const [selectedClasses, setSelectedClasses] = React.useState([]);
  const[classMap, setClassMap] = React.useState([])
  const [titleModal, setTitleModal] = React.useState('');
  const [isHideSubmit, setIsHideSubmit] = React.useState(false);
  const [isFormDisabled, setIsFormDisabled] = React.useState(false);
  const [action, setAction] = React.useState('');

  React.useEffect(() => {
    loadData();
    loadlistClass();
    // setSelectedClasses([
    //   1,22
    // ])
  }, []);


  React.useEffect(() => {
    // This block will execute when classMap is updated
    console.log("Class Map:", classMap);
  }, [classMap]);

  React.useEffect(() => {
    // This block will execute when classMap is updated
    console.log("action:", action);
  }, [action]);

  const loadData = async (e)=> {
  const result = await callApi('api/v1/course/log/show');
  setData(result.data)
  }

  const loadlistClass = async (e)=> {
  const result = await callApi('api/v1/course/list');
  setListClass(result.data)
  let map = new Map();
  console.log('result.data',result.data)
  // make it hashmap
  for (let i = 0; i < result.data.length; i++) {
    map.set(result.data[i].id, result.data[i].title);
  }
  setClassMap(map)
  console.log("Class Map:", map);

  }

  const getClassTitleById = (id)=> {
    id = parseInt(id)
    console.log('id input', id)
    console.log('classMap', classMap)
    console.log('classMap id', classMap.get(id))
    return  classMap.get(id)
  }
  const addClass = (classId) => {
    console.log('classId in add class', classId)
    classId = parseInt(classId)
    // Ensure the classId is not already in the selectedClasses array
    if (!selectedClasses.includes(classId)) {
      setSelectedClasses([...selectedClasses, classId]);
    }
  };

  const removeClass = (classId) => {
    const updatedClasses = selectedClasses.filter((id) => id !== classId);
    setSelectedClasses(updatedClasses);
  };

  const submitForm = async (e) => {
    let endpoint
    console.log("action", action)
    if (action==="edit") {
      endpoint = "api/v1/user/edit"
    } else{
      endpoint = "api/v1/user/register"
    }
    setIsLoading(true)
    // console.log(e)
    const requestData = {
      // Your data properties here
      name: name,
      nim: nim,
      class: selectedClasses,
      phone: phone,
      major: major,
    };
    console.log('requestData', requestData)
    const result = await callApi(endpoint, 'POST', requestData);
    setIsLoading(false)
    console.log(result)
    alert(result.description)
    onClose()
    // Reset the state variables
    clearModalData()
     loadData()
  }

  const clearModalData = () =>{
    setName('');
    setNim('');
    setClass('');
    setPhone('');
    setMajor('');
    setSelectedClasses([])
  }

  const openModal = async (action,request="") => {
    clearModalData()
    onOpen()
    switch (action) {
      case "detail":
        setTitleModal("Detail Student")
        loadModalData(request)
        setIsHideSubmit(true)
        setIsFormDisabled(true)
        break;

      case "edit":
        setTitleModal("Edit Student")
        loadModalData(request)
        setIsHideSubmit(false)
        setIsFormDisabled(false)
        setAction("edit")
        break;
        
      default:
        setTitleModal("Add New Student")
        setIsHideSubmit(false)
        setIsFormDisabled(false)
        setAction("add")
        break;
    }
  }

  const loadModalData = async (request)=> {
    let requestData = {
      nim: request,
    };
    const result = await callApi('api/v1/user/show/detail', 'POST', requestData);
    console.log(result)
    setName(result.data.name)
    setNim(result.data.nim)
    setPhone(result.data.no_hp)
    setMajor(result.data.major)
    setSelectedClasses(result.data.class_arr)
    }

    const deleteStudent = async (id) => {
      // Display confirmation dialog
      const isConfirmed = window.confirm("Are you sure you want to delete?");
      let requestData = {
        nim: id,
      };
      // If user clicks OK, set the state to true
      if (isConfirmed) {
        const result = await callApi('api/v1/user/delete', 'POST', requestData);
        alert(result.description)
      } 
      loadData()   
      };

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
<SimpleGrid columns={2} spacing={10} mb={10}
>
<Box>

{/* <Button onClick={()=>openModal("add")} colorScheme='teal' leftIcon={<AddIcon />} >Add New Student</Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{titleModal}</ModalHeader>
          <ModalCloseButton />
          <form action="" onSubmit={submitForm}>
          <ModalBody pb={6}>
            <FormControl mb="5px">
              <FormLabel>Name</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name' 
              disabled={isFormDisabled}
              />
            </FormControl>
            <FormControl mb="5px">
              <FormLabel>NIM</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder='Nomor Induk Mahasiswa (NIM)' 
              disabled={isFormDisabled}
              />
            </FormControl>
            <FormControl mb="5px">
              <FormLabel>Phone Number</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Phone Number' 
              disabled={isFormDisabled}
              />
            </FormControl>
            <FormControl mb="5px">
              <FormLabel>Major</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder='Major'
              disabled={isFormDisabled}
              />
            </FormControl>

          <FormControl mb="5px">
                  <FormLabel>Classes</FormLabel>
                  {selectedClasses.map((classId) => (
                    <div key={classId}>
                      <span>{getClassTitleById(classId)}</span>
                      <Button size="sm" ml={2} onClick={() => removeClass(classId)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Select
                    placeholder="Select option"
                    // value={''} // Use an empty string or some default value
                    onChange={(e) => addClass(e.target.value)}
                    
                  >
                    {listClass.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </Select>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type="submit"
            isLoading={isLoading}
            loadingText='Submitting'
            variant='outline'
            hidden={isHideSubmit}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>

          </form>
        </ModalContent>
      </Modal>
</Box>
</SimpleGrid>
      <SimpleGrid
        
        >
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={data}
          openModal={openModal}
          deleteStudent={deleteStudent}

        />
      </SimpleGrid>
    </Box>
  );
}
