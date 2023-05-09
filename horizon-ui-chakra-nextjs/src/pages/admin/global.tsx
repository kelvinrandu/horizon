import { Box, SimpleGrid,  Icon } from '@chakra-ui/react'
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
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
import React,{useEffect,useState} from "react";
import fsPromises from "fs/promises";
import path from "path";
import Papa from 'papaparse';
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const csvPath = path.join(process.cwd(), "csv/global.csv");
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  const csvData = await fsPromises.readFile(csvPath,'utf8');
  // Parse data as json
  const routesData = JSON.parse(jsonData);
  let vocab = {};
  // const newArray = Papa.parse(csvData, { header: true }).data.forEach((row) => {
  //   vocab[row.word] = row.definition;
  // });
  const newArray =Papa.parse(csvData, {
    header: true,
    complete: results => {
      // setParsedCsvData(results.data)
      // console.log('data',results.data)
    },
  });
  
  console.log("data", routesData);
return {
  props: { routesData,newArray }, // will be passed to the page component as props
};
} 
export default function Global ({routesData,newArray}:any) {
  const [tiles,setTiles] = useState(newArray.data)
  return (
    <AdminLayout title={'Global'} routesData={routesData}>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
               
      <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
             {tiles.map((tile)=><>      {tile[0]}                 <MiniStatistics
                          startContent={
                            <IconBox
                              w="56px"
                              h="56px"
                              // bg={boxBg}
                              icon={
                                <Icon
                                  w="32px"
                                  h="32px"
                                  as={MdBarChart}
                                  // color={brandColor}
                                />
                              }
                            />
                          }
                          name={tile.Title}
                          value={tile.data}
                        /></>)}


          </SimpleGrid>

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
