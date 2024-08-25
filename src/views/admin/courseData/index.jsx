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
import DevelopmentTable from "views/admin/courseData/components/DevelopmentTable";
import {
  columnsDataDevelopment,
} from "views/admin/courseData/variables/columnsData";

import React from "react";
import { callApi } from '../../../api';
import { AddIcon } from "@chakra-ui/icons";


export default function Settings() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()
  const [message, setMessage] = React.useState('');

  const [id, setId] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [time, setTime] = React.useState('');
  const [courseDay, setCourseDay] = React.useState('');
  const [reminderDay, setReminderDay] = React.useState('');
  const [listDay, setListDay] = React.useState([])

  const[isLoading, setIsLoading] = React.useState(false)
  const[data, setData] = React.useState([])
  const [selectedClasses, setSelectedClasses] = React.useState([]);
  const[classMap, setClassMap] = React.useState([])
  const [titleModal, setTitleModal] = React.useState('');
  const [isHideSubmit, setIsHideSubmit] = React.useState(false);
  const [isFormDisabled, setIsFormDisabled] = React.useState(false);
  const [action, setAction] = React.useState('');

  React.useEffect(() => {
    loadData();
    loadListDay();
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
  const result = await callApi('api/v1/course/show');
  setData(result.data)
  }

  const loadListDay = async (e)=> {
  const arrDay = [
    {
      value:"MON",
      title:"Monday"
    },
    {
      value:"TUE",
      title:"Tuesday"
    },
    {
      value:"WED",
      title:"Wednesday"
    },
    {
      value:"THU",
      title:"Thursday"
    },
    {
      value:"FRI",
      title:"Friday"
    },
    {
      value:"SAT",
      title:"Saturday"
    },
    {
      value:"SUN",
      title:"Sunday"
    },
    
  ]
  setListDay(arrDay)
 
  }

  const submitForm = async (e) => {
    let endpoint
    console.log("action", action)
    if (action==="edit") {
      endpoint = "api/v1/course/edit"
    } else{
      endpoint = "api/v1/course/create"
    }
    setIsLoading(true)
    // console.log(e)
    const requestData = {
      // Your data properties here
      title: title,
      description: description,
      schedule: time,
      day: courseDay,
    };
    if (action==="edit") {
      requestData.id=id
    }
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
    setId('')
    setTitle('')
    setDescription()
    setTime('')
    setCourseDay('')
    setReminderDay('')

    setSelectedClasses([])
  }
  const isSelectedCourse = (courseDay, val) =>{
    if (courseDay === val) {
      console.log(courseDay)
      return true
    }
    console.log(courseDay)
    return false
  }

  const openModal = async (action,request="") => {
    clearModalData()
    onOpen()
    switch (action) {
      case "detail":
        setTitleModal("Detail Course")
        loadModalData(request)
        setIsHideSubmit(true)
        setIsFormDisabled(true)
        break;

      case "edit":
        setTitleModal("Edit Course")
        loadModalData(request)
        setIsHideSubmit(false)
        setIsFormDisabled(false)
        setAction("edit")
        break;
        
      default:
        setTitleModal("Add New Course")
        setIsHideSubmit(false)
        setIsFormDisabled(false)
        setAction("add")
        break;
    }
  }

  const loadModalData = async (request)=> {
    let requestData = {
      id: request,
    };
    const result = await callApi('api/v1/course/show/detail', 'POST', requestData);
    console.log(result)
    setId(result.data.id)
    setTitle(result.data.title)
    setDescription(result.data.description)
    setTime(result.data.schedule)
    setCourseDay(result.data.course_day_prefix)
    setReminderDay(result.data.reminder_day)
    }

    const deleteStudent = async (id) => {
      // Display confirmation dialog
      const isConfirmed = window.confirm("Are you sure you want to delete?");
      let requestData = {
        id: id,
      };
      // If user clicks OK, set the state to true
      if (isConfirmed) {
        const result = await callApi('api/v1/course/delete', 'POST', requestData);
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

<Button onClick={()=>openModal("add")} colorScheme='teal' leftIcon={<AddIcon />} >Add New Course</Button>

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
            <FormControl mb="5px" hidden={true}>
              <FormLabel>id</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              value={id}
              placeholder='id' 
              disabled="true"
              />
            </FormControl>
            <FormControl mb="5px">
              <FormLabel>Title</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title' 
              disabled={isFormDisabled}
              />
            </FormControl>
            <FormControl mb="5px">
              <FormLabel>Description</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description' 
              disabled={isFormDisabled}
              />
            </FormControl>
            <FormControl mb="5px">
              <FormLabel>Time</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              {/* <Input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder='time' 
              disabled={isFormDisabled}
              /> */}
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}

                />
            </FormControl>
            
            <FormControl mb="5px">
              <FormLabel>Course Day</FormLabel>
              <Select placeholder='Select option' value={courseDay} onChange={(e)=> setCourseDay(e.target.value)} required>
                {listDay.map((option) => (
                <option key={option.value} value={option.value} selected={isSelectedCourse(courseDay, option.value)}>
                {option.title}
              </option>
              ))}
              </Select>
            </FormControl>

            <FormControl mb="5px">
              <FormLabel>Reminder Day</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              value={reminderDay}
              placeholder='H-1 Course Day'
              disabled="true"
              />
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
