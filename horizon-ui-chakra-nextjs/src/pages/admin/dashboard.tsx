import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React,{useEffect,useState} from "react";
// Assets
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
  TableData,
} from "views/admin/default/variables/columnsData";
import fsPromises from "fs/promises";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { isWindowAvailable } from "utils/navigation";
import AdminLayout from "layouts/admin";
import { Image } from "components/image/Image";
import path from "path";
import Usa from "img/dashboards/usa.png";
import Papa from 'papaparse';

import { AnyARecord } from "dns";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
    const csvPath = path.join(process.cwd(), "csv/dashboard.csv");
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
export default function Dashboard({ routesData,newArray }:any) {
  // useEffect(() => {
  //   Router.push('/admin')
  // })
   const [tiles,setTiles] = useState(newArray.data)
  console.log("aa", routesData);
  return (
    <AdminLayout title={'dashboard'} routesData={routesData}>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
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

          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
            <TotalSpent />
            <WeeklyRevenue />
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <CheckTable
              columnsData={columnsDataCheck}
              tableData={tableDataCheck as unknown as TableData[]}
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
              <DailyTraffic />
              <PieCard />
            </SimpleGrid>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex as unknown as TableData[]}
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
              <Tasks />
              <MiniCalendar h="100%" minW="100%" selectRange={false} />
            </SimpleGrid>
          </SimpleGrid>
        </>
      </Box>
    </AdminLayout>
  );
}
