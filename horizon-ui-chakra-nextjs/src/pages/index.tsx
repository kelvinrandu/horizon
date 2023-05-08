import Router from 'next/router'
import React, { useEffect } from 'react'
import fsPromises from "fs/promises";
import path from "path";
import AdminLayout from "../layouts/admin";
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
export default function Home({routesData}) {
  // useEffect(() => {
  //   Router.push('/admin/default')
  // })
console.log("aa", routesData);
  return (
    <AdminLayout routesData={routesData}>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>here</>
      </Box>
    </AdminLayout>
  );
}
