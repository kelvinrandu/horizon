import Router from 'next/router'
import React, { useEffect } from 'react'
import AdminLayout from "layouts/admin";
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

export default function Admin () {
  // useEffect(() => {
  //   Router.push('/admin/default')
  // })

  return (
    <AdminLayout>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
          here
        </>
      </Box>
    </AdminLayout>
  );
}
