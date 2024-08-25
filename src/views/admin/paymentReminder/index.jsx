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
  Textarea,
  Select,
} from "@chakra-ui/react";
import DevelopmentTable from "views/admin/paymentReminder/components/DevelopmentTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/paymentReminder/variables/columnsData";
import tableDataDevelopment from "views/admin/paymentReminder/variables/tableDataDevelopment.json";

import React from "react";
import { callApi } from '../../../api';
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";
import { AddIcon } from "@chakra-ui/icons";


export default function Settings() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()
  const [message, setMessage] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [nim, setNim] = React.useState('');
  const [rclass, setClass] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [major, setMajor] = React.useState('');
  const[isLoading, setIsLoading] = React.useState(false)
  const[data, setData] = React.useState([])
  const[jobDetail, setJobDetail] = React.useState({})
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
    loadJobDetail();
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
  const result = await callApi('api/v1/payment-reminder/show');
  setData(result.data)
  }

  const loadJobDetail = async (e)=> {
  const result = await callApi('api/v1/payment-reminder/job/detail');
  setJobDetail(result.data)
  }

  const triggerRunJob = async(e)=>{      
    const isConfirmed = window.confirm("Are you sure you want to force blast to all student?");
    if (isConfirmed) {
      const request ={
        event_id: jobDetail.id_event
      }
      console.log(request)
      const result = await callApi('notif/send','POST',request);
      alert(result.description)
    }
  }

  const loadlistClass = async (e)=> {
  var arr =[]
  var elementString
  for (let i = 1; i <= 28; i++) {
    elementString = i.toString()
    arr.push(elementString)    
  }
  console.log(arr)
  setListClass(arr)
  }

  const handleAction = (is_job_exist)=>{
    if (is_job_exist) {
      setAction("edit")
      return "edit"
    }
    setAction("add")
    return "add"
  }

  const handleShowRunJob = (is_job_exist)=>{
    if (is_job_exist) {
      console.log("false")
      return false
    }
    console.log("true")
    return true
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setJobDetail((jobDetail) => ({
      ...jobDetail,
      [name]: value,
    }));
  };

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
    e.preventDefault();
    var requestData
    let endpoint
    console.log("action", action)
    
    // console.log(e)
    requestData = {
      // Your data properties here
      title: jobDetail.title,
      description: jobDetail.title,
      schedule: jobDetail.schedule,
      job_every: jobDetail.job_every,
      id_event_type: 3,
    };
    if (action==="edit") {
      endpoint = "api/v1/event/edit"
      requestData.id = jobDetail.id_event
    } else{
      endpoint = "api/v1/event/create"
    }
    setIsLoading(true)

    console.log('requestData', requestData)
    const result = await callApi(endpoint, 'POST', requestData);
    console.log("result submit", result)
    setIsLoading(false)
    alert(result.description)
    onClose()
    // Reset the state variables
    clearModalData()
    loadData()
    loadJobDetail()
  }

  const clearModalData = () =>{
    setJobDetail({})
    setSelectedClasses([])
  }

  const openModal = async (action,titleModal,request="") => {
    clearModalData()
    onOpen()
    setTitleModal(titleModal)
    
    switch (action) {
      case "detail":
        // loadModalData(request)
        loadJobDetail(request)
        setIsHideSubmit(true)
        setIsFormDisabled(true)
        break;
        
        case "edit":
        // loadModalData(request)
        loadJobDetail(request)
        setIsHideSubmit(false)
        setIsFormDisabled(false)
        setAction("edit")
        break;
        
        default:
        loadJobDetail(request)
        setIsHideSubmit(false)
        setIsFormDisabled(false)
        setAction("add")
        break;
    }
  }

  // const loadModalData = async (request)=> {
  //   let requestData = {
  //     nim: request,
  //   };
  //   const result = await callApi('api/v1/user/show/detail', 'POST', requestData);
  //   console.log(result)
  //   setName(result.data.name)
  //   setNim(result.data.nim)
  //   setPhone(result.data.no_hp)
  //   setMajor(result.data.major)
  //   setSelectedClasses(result.data.class_arr)
  //   }

const isSelectedOption = (option, job_every)=>{
  if (option === job_every) {
    return true
  }
  return false
}
    const triggerReminder = async (nim) => {
      // Display confirmation dialog
      const isConfirmed = window.confirm("Are you sure you want to send notif to "+nim+"?");
      let requestData = {
        nim: nim,
        id_event: jobDetail.id_event
      };
      // If user clicks OK, set the state to true
      if (isConfirmed) {
        const result = await callApi('api/v1/payment-reminder/job/trigger', 'POST', requestData);
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

<Button onClick={()=>openModal(handleAction(jobDetail.is_job_exist),jobDetail.button_text)} colorScheme='teal'>{jobDetail.button_text}</Button>
<Button onClick={()=>triggerRunJob(jobDetail.id_event)} hidden={handleShowRunJob(jobDetail.is_job_exist)} colorScheme='red' ml="10px">Run Job</Button>

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
          <form onSubmit={submitForm}>
          <ModalBody pb={6}>
          <FormControl mb="5px" hidden={true}>
              <FormLabel>Id Event</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              value={jobDetail.id_event}
              onChange={handleInputChange}
              name="id_event"
              placeholder='id_event' 
              disabled={true}
              />
            </FormControl>
            <FormControl mb="5px">
              <FormLabel>Title</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              // value={title}
              // onChange={(e) => setTitle(e.target.value)}
              value={jobDetail.title}
              onChange={handleInputChange}
              name="title"
              placeholder='Title' 
              disabled={isFormDisabled}
              />
            </FormControl>
            <FormControl mb="5px">
              <FormLabel>Schedule</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              type="time"
              value={jobDetail.schedule}
              onChange={handleInputChange}
              name="schedule"
              placeholder='schedule' 
              disabled={isFormDisabled}
              />
            </FormControl>
            <FormControl mb="5px">
              <FormLabel>Job Name</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              value={jobDetail.job_name}
              onChange={handleInputChange}
              placeholder='job name' 
              disabled={true}
              />
            </FormControl>
            <FormControl mb="5px">
              <FormLabel>Job Id</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Input
              value={jobDetail.job_id}
              onChange={handleInputChange}
              placeholder='Major'
              disabled={true}
              />
            </FormControl>


            {/* <FormControl mb="5px">
              <FormLabel>Class</FormLabel>
              <Select placeholder='Select option' value={rclass} onChange={(e)=> setClass(e.target.value)} required>
                {listClass.map((option) => (
                <option key={option.id} value={option.id}>
                {option.title}
              </option>
              ))}
              </Select>
            </FormControl> */}

          <FormControl mb="5px">
                  <FormLabel>Job Every</FormLabel>
                  <Select
                  name="job_every"
                    placeholder="Select option"
                    onChange={handleInputChange}
                    // value={''} // Use an empty string or some default value
                    // onChange={(e) => addClass(e.target.value)}
                    
                  >
                    {listClass.map((option) => (
                      <option key={option} value={option} selected={isSelectedOption(option, jobDetail.job_every)}>
                        {option}
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
          triggerReminder={triggerReminder}
          hideReminder={handleShowRunJob(jobDetail.is_job_exist)}
        />
      </SimpleGrid>
    </Box>
  );
}
