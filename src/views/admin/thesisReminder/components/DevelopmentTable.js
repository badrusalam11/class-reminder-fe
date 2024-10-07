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
import { Search2Icon, DeleteIcon, EditIcon, EmailIcon } from '@chakra-ui/icons'

// Custom components
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
  const { columnsData, tableData, triggerReminder } = props;

  const [filterValue, setFilterValue] = useState("all");

  const columns = useMemo(() => columnsData, [columnsData]);

  // Adjusting filter logic to match "Is_eligable_grad" from backend data
  const filteredData = useMemo(() => {
    if (filterValue === "all") return tableData;
    if (filterValue === "Yes") return tableData.filter(item => item.Is_eligable_grad === "Yes"); // Eligible
    if (filterValue === "No") return tableData.filter(item => item.Is_eligable_grad === "No");  // Uneligible
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
        <Center>
          <FormLabel>Filter By: </FormLabel>
          <Select
            width="200px"
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
          >
            <option value="all">Show All</option>
            <option value="Yes">Eligible</option>
            <option value="No">Uneligible</option>
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
            <Th>Logbook</Th>
            <Th>Eligable for Sidang</Th>
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
              <Td>{item.logbook}</Td>
              <Td>{item.Is_eligable_grad}</Td> {/* Display the eligibility status */}
              <Td hidden={!item.is_reminder}>
                <Button size="sm" mr="2px" colorScheme='blue' onClick={() => triggerReminder(item.nim)}><EmailIcon /></Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
