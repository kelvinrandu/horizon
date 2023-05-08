import { Box, SimpleGrid } from '@chakra-ui/react'
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable'
import CheckTable from 'views/admin/dataTables/components/CheckTable'
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable'
import ComplexTable from 'views/admin/dataTables/components/ComplexTable'
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex
} from 'views/admin/dataTables/variables/columnsData'
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment.json'
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck.json'
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns.json'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex.json'
import React from 'react'
import fsPromises from "fs/promises";
import path from "path";
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  const routesData = JSON.parse(jsonData);
  
  console.log("data", routesData);
return {
  props: { routesData }, // will be passed to the page component as props
};
} 
export default function Global ({routesData}) {
  return (
    <AdminLayout routesData={routesData}>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: '20px', xl: '20px' }}
        >
          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={(tableDataDevelopment as unknown) as TableData[]}
          />
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={(tableDataCheck as unknown) as TableData[]}
          />
          <ColumnsTable
            columnsData={columnsDataColumns}
            tableData={(tableDataColumns as unknown) as TableData[]}
          />
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={(tableDataComplex as unknown) as TableData[]}
          />
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
