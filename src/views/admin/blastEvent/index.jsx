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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import DevelopmentTable from "views/admin/blastEvent/components/DevelopmentTable";
import CheckTable from "views/admin/blastEvent/components/CheckTable";
import ColumnsTable from "views/admin/blastEvent/components/ColumnsTable";
import ComplexTable from "views/admin/blastEvent/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/blastEvent/variables/columnsData";
import tableDataDevelopment from "views/admin/blastEvent/variables/tableDataDevelopment.json";

import React from "react";
import { callApi } from '../../../api';


export default function Settings() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()
  const [message, setMessage] = React.useState('');
  const[isLoading, setIsLoading] = React.useState(false)
  const[data, setData] = React.useState([])
  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async (e)=> {
  const result = await callApi('api/v1/notif/blast/history');
  setData(result.data)
  }

  const submitForm = async (e) => {
    setIsLoading(true)
    // console.log(e)
    const requestData = {
      // Your data properties here
      message: message,
    };

    const result = await callApi('api/v1/notif/blast', 'POST', requestData);
    setIsLoading(false)
    console.log(result)
    alert(result.description)
    onClose()
    setMessage("")
    loadData()
  }

  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
<SimpleGrid columns={2} spacing={10} mb={10}
>
<Box>

<Button onClick={onOpen} colorScheme='teal' leftIcon={<AddIcon />} >Blast New Event</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Event</ModalHeader>
          <ModalCloseButton />
          <form action="" onSubmit={submitForm}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Message</FormLabel>
              {/* <Input ref={initialRef} placeholder='First name' /> */}
              <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              size="lg" height={200} placeholder='Insert your message to blast..' />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type="submit"
            isLoading={isLoading}
            loadingText='Submitting'
            variant='outline'
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
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
        />
      </SimpleGrid>
    </Box>
  );
}
