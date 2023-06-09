import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableHead } from "@mui/material";
import { useSelector } from "react-redux";
import CreateModal from "./CreateModal";
import useActions from "../../hooks/useActions";
import Loader from "../layout/loader";
import EditModal from "./EditModal";

export default function StatisticsTable() {
  const [data, setData] = React.useState([]);
  const { statistics, statisticsLoading, singleStatisticsLoading } =
    useSelector((state) => state.statistics);

  const { fetchStatistics, deleteStatisticsById } = useActions();

  React.useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics, singleStatisticsLoading]);

  React.useEffect(() => {
    if (Array.isArray(statistics?.data)) setData(statistics.data);
  }, [statistics, statisticsLoading]);

  const handleDelete = (id) => {
    deleteStatisticsById(id);
  };

  return (
    <>
      {singleStatisticsLoading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead
              style={{
                backgroundColor: "rgb(220, 220, 220)",
              }}>
              <TableRow>
                <TableCell>
                  <b>
                    <i>Image</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>Title</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>Title RU</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <CreateModal />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 &&
                data?.map((company) => (
                  <>
                    {company.news.map((evt) => (
                      <TableRow key={evt.id}>
                        <TableCell>{evt.title_ru}</TableCell>
                        <TableCell>{evt.title_uz}</TableCell>
                        <TableCell align="right">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}>
                            <EditModal id={evt.id} />
                            <Button
                              color="error"
                              onClick={handleDelete.bind(null, evt.id)}>
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
