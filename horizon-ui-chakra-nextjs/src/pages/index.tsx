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
// Assets
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import Papa from "papaparse";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const csvPath = path.join(process.cwd(), "csv/dashboard.csv");
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  const csvData = await fsPromises.readFile(csvPath, "utf8");
  // Parse data as json
  const routesData = JSON.parse(jsonData.toString());
  let vocab = {};
  // const newArray = Papa.parse(csvData, { header: true }).data.forEach((row) => {
  //   vocab[row.word] = row.definition;
  // });
  const newArray = Papa.parse(csvData, {
    header: true,
    complete: (results) => {
      // setParsedCsvData(results.data)
      // console.log('data',results.data)
    },
  });

  return {
    props: { routesData, newArray }, // will be passed to the page component as props
  };
}
export default function Home({ routesData, newArray }: any) {
  const Router = useRouter();
  const [tiles, setTiles] = useState(newArray.data);
  useEffect(() => {
    Router.push("/admin/dashboard");
  });
  console.log("tiles", tiles);
  tiles.map((tile: any) => console.log("each", tile.Title));

  return (
    <AdminLayout title={""} routesData={routesData}>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            {tiles.map((tile: any) => (
              <>
                {" "}
                {tile[0]}{" "}
                <MiniStatistics
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
                />
              </>
            ))}
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
