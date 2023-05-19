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
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React,{useEffect,useState} from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useColorModeValue,
  SimpleGrid,
  Link
} from '@chakra-ui/react'
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";

import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";

// Custom components
import Banner from 'views/admin/marketplace/components/Banner'
import TableTopCreators from 'views/admin/marketplace/components/TableTopCreators'
import HistoryItem from 'views/admin/marketplace/components/HistoryItem'
import NFT from 'components/card/NFT'
import Card from 'components/card/Card'

// Assets
import Nft1 from 'img/nfts/Nft1.png'
import Nft2 from 'img/nfts/Nft2.png'
import Nft3 from 'img/nfts/Nft3.png'
import Nft4 from 'img/nfts/Nft4.png'
import Nft5 from 'img/nfts/Nft5.png'
import fsPromises from "fs/promises";
import path from "path";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import Nft6 from 'img/nfts/Nft6.png'
import Avatar1 from 'img/avatars/avatar1.png'
import Avatar2 from 'img/avatars/avatar2.png'
import Avatar3 from 'img/avatars/avatar3.png'
import Avatar4 from 'img/avatars/avatar4.png'
import tableDataTopCreators from 'views/admin/marketplace/variables/tableDataTopCreators.json'
import { tableColumnsTopCreators } from 'views/admin/marketplace/variables/tableColumnsTopCreators'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import NextLink from 'next/link'

import Papa from 'papaparse';


export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const _filePath = path.join(process.cwd(), "json/centre.json");
  const csvPath = path.join(process.cwd(), "csv/centre.csv");
  const line1CsvPath = path.join(process.cwd(), "csv/centre/line1.csv");
  const line2CsvPath = path.join(process.cwd(), "csv/centre/line2.csv");

  
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  const dashboardData = await fsPromises.readFile(_filePath);
  const csvData = await fsPromises.readFile(csvPath, "utf8");
  const line1Data = await fsPromises.readFile(line1CsvPath, "utf8");
  const line2Data = await fsPromises.readFile(line2CsvPath, "utf8");
  // Parse data as json
  const routesData = JSON.parse(jsonData.toString());
  const _dashboardData = JSON.parse(dashboardData.toString());
  let vocab = {};
  // const newArray = Papa.parse(csvData, { header: true }).data.forEach((row) => {
  //   vocab[row.word] = row.definition;
  // });
  const newArray = Papa.parse(csvData, {
    header: true,
    complete: (results) => {

    },
  });
  const line1MonthArray = Papa.parse(line1Data, {
    header: true,
    complete: (results) => {

    },
  });
  const line2MonthArray = Papa.parse(line2Data, {
    header: true,
    complete: (results) => {

    },
  });
  
  
  console.log("data", routesData);
return {
  props: { routesData, newArray, _dashboardData ,line1MonthArray,line2MonthArray }, // will be passed to the page component as props
};
} 
export default function Centre({  routesData,
  newArray,
  _dashboardData,
  line1MonthArray,
  line2MonthArray,y}:any) {
  const [tiles,setTiles] = useState(newArray.data)

  const line1:any[] =[]
  line1MonthArray.data.map((month:any)=>{
    line1.push(parseInt(month?.data))

  })
  line1.splice(line1.length - 1);

  const line2:any[] =[]
  line2MonthArray.data.map((month:any)=>{
    line2.push(parseInt(month?.data))

  })
  line2.splice(line1.length - 1);
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorBrand = useColorModeValue('brand.500', 'white')
  return (
    <AdminLayout  title={_dashboardData?.title} routesData={routesData} >
      <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
        {/* Main Fields */}
               
        <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
             {tiles.map((tile:any)=><>      {tile[0]}                 <MiniStatistics
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
            <TotalSpent line1={line1} line2={line2} />
            <WeeklyRevenue />
          </SimpleGrid>
  
        {/* Delete Product */}
      </Box>
    </AdminLayout>
  )
}
