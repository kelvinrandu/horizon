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
  Text,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Link
} from '@chakra-ui/react'
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
// Custom components
import Banner from 'views/admin/marketplace/components/Banner'
import TableTopCreators from 'views/admin/marketplace/components/TableTopCreators'
import HistoryItem from 'views/admin/marketplace/components/HistoryItem'
import NFT from 'components/card/NFT'
import Card from 'components/card/Card'
import Papa from 'papaparse';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
// Assets
import Nft1 from 'img/nfts/Nft1.png'
import Nft2 from 'img/nfts/Nft2.png'
import Nft3 from 'img/nfts/Nft3.png'
import Nft4 from 'img/nfts/Nft4.png'
import Nft5 from 'img/nfts/Nft5.png'
import fsPromises from "fs/promises";
import path from "path";
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



export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const csvPath = path.join(process.cwd(), "csv/products.csv");
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
export default function Products ({routesData,newArray}:any) {
  // Chakra Color Mod
  const [tiles,setTiles] = useState(newArray.data)
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const textColorBrand = useColorModeValue('brand.500', 'white')
  return (
    <AdminLayout title={'products'} routesData={routesData} >
      <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
        {/* Main Fields */}
               
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
        <Grid
          mb='20px'
          gridTemplateColumns={{ xl: 'repeat(3, 1fr)', '2xl': '1fr 0.46fr' }}
          gap={{ base: '20px', xl: '20px' }}
          display={{ base: 'block', xl: 'grid' }}
        >
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 1 / 2 / 3', '2xl': '1 / 1 / 2 / 2' }}
          >
            <Banner />
            <Flex direction='column'>
              <Flex
                mt='45px'
                mb='20px'
                justifyContent='space-between'
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'start', md: 'center' }}
              >
                <Text
                  color={textColor}
                  fontSize='2xl'
                  ms='24px'
                  fontWeight='700'
                >
                  Trending NFTs
                </Text>
                <Flex
                  align='center'
                  me='20px'
                  ms={{ base: '24px', md: '0px' }}
                  mt={{ base: '20px', md: '0px' }}
                >
                  <NextLink href='#art' passHref>
                    <Link
                      color={textColorBrand}
                      fontWeight='500'
                      me={{ base: '34px', md: '44px' }}
                    >
                      Art
                    </Link>
                  </NextLink>
                  <NextLink href='#music' passHref>
                    <Link
                      color={textColorBrand}
                      fontWeight='500'
                      me={{ base: '34px', md: '44px' }}
                    >
                      Music
                    </Link>
                  </NextLink>
                  <NextLink href='#collectibles' passHref>
                    <Link
                      color={textColorBrand}
                      fontWeight='500'
                      me={{ base: '34px', md: '44px' }}
                    >
                      Collectibles
                    </Link>
                  </NextLink>
                  <NextLink href='#sports' passHref>
                    <Link color={textColorBrand} fontWeight='500'>
                      Sports
                    </Link>
                  </NextLink>
                </Flex>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
                <NFT
                  name='Abstract Colors'
                  author='By Esthera Jackson'
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1
                  ]}
                  image={Nft1}
                  currentbid='0.91 ETH'
                  download='#'
                />
                <NFT
                  name='ETH AI Brain'
                  author='By Nick Wilson'
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1
                  ]}
                  image={Nft2}
                  currentbid='0.91 ETH'
                  download='#'
                />
                <NFT
                  name='Mesh Gradients '
                  author='By Will Smith'
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1
                  ]}
                  image={Nft3}
                  currentbid='0.91 ETH'
                  download='#'
                />
              </SimpleGrid>
              <Text
                mt='45px'
                mb='36px'
                color={textColor}
                fontSize='2xl'
                ms='24px'
                fontWeight='700'
              >
                Recently Added
              </Text>
              <SimpleGrid
                columns={{ base: 1, md: 3 }}
                gap='20px'
                mb={{ base: '20px', xl: '0px' }}
              >
                <NFT
                  name='Swipe Circles'
                  author='By Peter Will'
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1
                  ]}
                  image={Nft4}
                  currentbid='0.91 ETH'
                  download='#'
                />
                <NFT
                  name='Colorful Heaven'
                  author='By Mark Benjamin'
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1
                  ]}
                  image={Nft5}
                  currentbid='0.91 ETH'
                  download='#'
                />
                <NFT
                  name='3D Cubes Art'
                  author='By Manny Gates'
                  bidders={[
                    Avatar1,
                    Avatar2,
                    Avatar3,
                    Avatar4,
                    Avatar1,
                    Avatar1,
                    Avatar1,
                    Avatar1
                  ]}
                  image={Nft6}
                  currentbid='0.91 ETH'
                  download='#'
                />
              </SimpleGrid>
            </Flex>
          </Flex>
          <Flex
            flexDirection='column'
            gridArea={{ xl: '1 / 3 / 2 / 4', '2xl': '1 / 2 / 2 / 3' }}
          >
            <Card px='0px' mb='20px'>
              <TableTopCreators
                tableData={(tableDataTopCreators as unknown) as TableData[]}
                columnsData={tableColumnsTopCreators}
              />
            </Card>
            <Card p='0px'>
              <Flex
                align={{ sm: 'flex-start', lg: 'center' }}
                justify='space-between'
                w='100%'
                px='22px'
                py='18px'
              >
                <Text color={textColor} fontSize='xl' fontWeight='600'>
                  History
                </Text>
                <Button variant='action'>See all</Button>
              </Flex>

              <HistoryItem
                name='Colorful Heaven'
                author='By Mark Benjamin'
                date='30s ago'
                image={Nft5}
                price='0.91 ETH'
              />
              <HistoryItem
                name='Abstract Colors'
                author='By Esthera Jackson'
                date='58s ago'
                image={Nft1}
                price='0.91 ETH'
              />
              <HistoryItem
                name='ETH AI Brain'
                author='By Nick Wilson'
                date='1m ago'
                image={Nft2}
                price='0.91 ETH'
              />
              <HistoryItem
                name='Swipe Circles'
                author='By Peter Will'
                date='1m ago'
                image={Nft4}
                price='0.91 ETH'
              />
              <HistoryItem
                name='Mesh Gradients '
                author='By Will Smith'
                date='2m ago'
                image={Nft3}
                price='0.91 ETH'
              />
              <HistoryItem
                name='3D Cubes Art'
                author='By Manny Gates'
                date='3m ago'
                image={Nft6}
                price='0.91 ETH'
              />
            </Card>
          </Flex>
        </Grid>
        {/* Delete Product */}
      </Box>
    </AdminLayout>
  )
}
