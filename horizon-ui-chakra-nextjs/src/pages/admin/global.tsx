import { Box, SimpleGrid, Icon } from "@chakra-ui/react";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React, { useEffect, useState } from "react";
import fsPromises from "fs/promises";
import path from "path";
import Papa from "papaparse";
import AdminLayout from "layouts/admin";
import { TableData } from "views/admin/default/variables/columnsData";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const _filePath = path.join(process.cwd(), "json/global.json");
  const csvPath = path.join(process.cwd(), "csv/global.csv");
  const line1CsvPath = path.join(process.cwd(), "csv/global/line1.csv");
  const line2CsvPath = path.join(process.cwd(), "csv/global/line2.csv");
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
export default function Global({
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
  return (
    <AdminLayout title={_dashboardData?.title} routesData={routesData}>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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
          <TotalSpent line1={line1} line2={line2} />
          <WeeklyRevenue />
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
