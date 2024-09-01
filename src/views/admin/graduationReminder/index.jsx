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
import DevelopmentTable from "views/admin/graduationReminder/components/DevelopmentTable";
import {
  columnsDataDevelopment,
} from "views/admin/graduationReminder/variables/columnsData";

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
   
  }, []);

  const loadData = async (e)=> {
  const result = await callApi('api/v1/graduation/show');
  setData(result.data)
  }


  const triggerReminder = async (nim) => {
    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to send notif to "+nim+"?");
    let requestData = {
      nim: nim,
    };
    // If user clicks OK, set the state to true
    if (isConfirmed) {
      const result = await callApi('api/v1/graduation/send', 'POST', requestData);
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

</Box>
</SimpleGrid>
      <SimpleGrid
        
        >
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={data}
          triggerReminder={triggerReminder}
        />
      </SimpleGrid>
    </Box>
  );
}
