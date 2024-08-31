/* eslint-disable */
import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  TableContainer,
  TableCaption,
  Select,
  FormLabel,
  Center,
  Button,
} from "@chakra-ui/react";
import { Search2Icon, DeleteIcon, EditIcon , EmailIcon} from '@chakra-ui/icons'

// Custom components
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;

  const [filterValue, setFilterValue] = useState("all");

  const columns = useMemo(() => columnsData, [columnsData]);

  const filteredData = useMemo(() => {
    if (filterValue === "all") return tableData;
    if (filterValue === "registered") return tableData.filter(item => item.is_registered);
    if (filterValue === "unregistered") return tableData.filter(item => !item.is_registered);
  }, [tableData, filterValue]);

  const tableInstance = useTable(
    {
      columns,
      data: filteredData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableBodyProps,
  } = tableInstance;

  return (
    <TableContainer bg='white'>
      <Flex mb={4} justifyContent="flex-end">
        <Center >
          <FormLabel>Filter By: </FormLabel>
          <Select
            width="200px"
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
          >
            <option value="all">Show All</option>
            <option value="registered">Show Registered</option>
            <option value="unregistered">Show Unregistered</option>
          </Select>
        </Center>
      </Flex>
      <Table variant='simple'>
        <TableCaption></TableCaption>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>NIM</Th>
            <Th>Major</Th>
            <Th>Is Registered</Th>
            <Th>Trigger Reminder</Th>
          </Tr>
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {filteredData.map((item, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.nim}</Td>
              <Td>{item.major}</Td>
              <Td>{item.is_registered_string}</Td>
              <Td hidden={item.is_registered?false:true}>
                <Button size="sm" mr="2px" colorScheme='blue' onClick={()=>triggerReminder(item.nim)}><EmailIcon/></Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
