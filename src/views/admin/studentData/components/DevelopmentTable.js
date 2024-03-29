/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  TableContainer,
  TableCaption,
  Tfoot,
  Button,

} from "@chakra-ui/react";
import { Search2Icon, DeleteIcon, EditIcon } from '@chakra-ui/icons'

import { whiten } from "@chakra-ui/theme-tools";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
  const { columnsData, tableData, openModal, deleteStudent} = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
  <TableContainer bg='white'>
  <Table variant='simple'>
    <TableCaption></TableCaption>
    <Thead>
      <Tr>
        <Th>#</Th>
        <Th>NIM</Th>
        <Th>Name</Th>
        <Th>Major</Th>
        <Th>Phone Number</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody {...getTableBodyProps()}>
    {data.map((item, index) => (
      <Tr>
      <Td>{index+1}</Td>
      <Td>{item.nim}</Td>
      <Td>{item.name}</Td>
      <Td>{item.major}</Td>
      <Td>{item.no_hp}</Td>
      
      <Td>
        <Button size="sm" mr="2px" colorScheme='teal'  onClick={()=>openModal("detail", item.nim)} ><Search2Icon/></Button>
        <Button size="sm" mr="2px" colorScheme='blue' onClick={()=>openModal("edit", item.nim)}><EditIcon/></Button>
        <Button size="sm" mr="2px" colorScheme='red' onClick={()=>deleteStudent(item.nim)}><DeleteIcon/></Button>
      
      </Td>
    </Tr>
    ))}

      
    </Tbody>
    
  </Table>
</TableContainer>
  );
}
