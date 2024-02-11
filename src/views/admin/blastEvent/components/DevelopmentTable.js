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

} from "@chakra-ui/react";
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
  const { columnsData, tableData } = props;

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
        <Th className="message-column">Message</Th>
        <Th>Success User</Th>
        <Th>Date</Th>
      </Tr>
    </Thead>
    <Tbody {...getTableBodyProps()}>
    {data.map((item, index) => (
      <Tr>
      <Td>{index+1}</Td>
      <Td style={{ maxWidth: '1000px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>{item.message}</Td>
      <Td>{item.user_success}</Td>
      <Td>{item.created_at_str}</Td>
    </Tr>
    ))}

      
    </Tbody>
    
  </Table>
</TableContainer>
  );
}
