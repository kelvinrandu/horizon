import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  Grid,
  GridItem,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import Papa from "papaparse";

import { AnyARecord } from "dns";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const _filePath = path.join(process.cwd(), "json/dashboard.json");
  const csvPath = path.join(process.cwd(), "csv/dashboard.csv");
  const line1CsvPath = path.join(process.cwd(), "csv/dashboard/line1.csv");
  const line2CsvPath = path.join(process.cwd(), "csv/dashboard/line2.csv");

  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  const dashboardData = await fsPromises.readFile(_filePath);
  const csvData = await fsPromises.readFile(csvPath, "utf8");
  const line1Data = await fsPromises.readFile(line1CsvPath, "utf8");
  const line2Data = await fsPromises.readFile(line2CsvPath, "utf8");
  // Parse data as json
  const routesData = JSON.parse(jsonData.toString());
  const _dashboardData = JSON.parse(dashboardData.toString());

  const newArray = Papa.parse(csvData, {
    header: true,
    complete: (results) => {},
  });
  const line1MonthArray = Papa.parse(line1Data, {
    header: true,
    complete: (results) => {},
  });
  const line2MonthArray = Papa.parse(line2Data, {
    header: true,
    complete: (results) => {},
  });

  return {
    props: {
      routesData,
      newArray,
      _dashboardData,
      line1MonthArray,
      line2MonthArray,
    }, // will be passed to the page component as props
  };
}
export default function Dashboard({
  routesData,
  newArray,
  _dashboardData,
  line1MonthArray,
  line2MonthArray,
}: any) {
  const [tiles, setTiles] = useState(newArray.data);

  const line1: any[] = [];
  line1MonthArray.data.map((month: any) => {
    line1.push(parseInt(month?.data));
  });
  line1.splice(line1.length - 1);

  const line2: any[] = [];
  line2MonthArray.data.map((month: any) => {
    line2.push(parseInt(month?.data));
  });
  line2.splice(line1.length - 1);
  console.log("_dashboardData", _dashboardData.widgets);
  _dashboardData.widgets.map((widget: any) => {
    console.log("widget", widget);
  });

  return (
    <AdminLayout title={_dashboardData?.title} routesData={routesData}>
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

          <Grid
            h="200px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
          >
            {_dashboardData.widgets.map((widget: any) => {
              return (
                <>
                  <GridItem colSpan={2} bg="papayawhip" />
                </>
              );
            })}

            {/* <GridItem rowSpan={2} colSpan={1} bg="tomato" />
            <GridItem colSpan={2} bg="papayawhip" />
            <GridItem colSpan={2} bg="papayawhip" />
            <GridItem colSpan={4} bg="tomato" /> */}
          </Grid>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
            {/* <TotalSpent line1={line1} line2={line2} />
            <WeeklyRevenue /> */}
            {_dashboardData.widgets.map((widget: any) => {
              if (widget.Type == "line") {
                return (
                  <>
                    <TotalSpent
                      data={widget.Selection_data}
                      line1={line1}
                      line2={line2}
                    />
                  </>
                );
              } else {
                return (
                  <>
                    <WeeklyRevenue />
                  </>
                );
              }
            })}
          </SimpleGrid>
        </>
      </Box>
    </AdminLayout>
  );
}
