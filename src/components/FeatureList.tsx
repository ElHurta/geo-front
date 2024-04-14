import { useEffect, useState } from "react";
import { Feature, getFeatures } from "../services/features-service";
import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function FeatureList() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const data = await getFeatures(
          pagination.currentPage,
          pagination.perPage,
          filters
        );
        setFeatures(data.data);
        setTotalPages(
          Math.ceil(data.meta.pagination.total / pagination.perPage)
        );
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, [pagination, filters]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="feature table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Magnitude</TableCell>
              <TableCell align="right">Place</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Tsunami</TableCell>
              <TableCell align="right">Magnitude Type</TableCell>
              <TableCell align="right">Coordinates</TableCell>
              <TableCell align="right">External URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.id}>
                <TableCell component="th" scope="row">
                  {feature.id}
                </TableCell>
                <TableCell align="right">{feature.attributes.title}</TableCell>
                <TableCell align="right">
                  {feature.attributes.magnitude}
                </TableCell>
                <TableCell align="right">{feature.attributes.place}</TableCell>
                <TableCell align="right">
                  {new Date(feature.attributes.time).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {feature.attributes.tsunami ? "Yes" : "No"}
                </TableCell>
                <TableCell align="right">
                  {feature.attributes.mag_type}
                </TableCell>
                <TableCell align="right">
                  {feature.attributes.coordinates.longitude},{" "}
                  {feature.attributes.coordinates.latitude}
                </TableCell>
                <TableCell align="right">
                  <a
                    href={feature.links.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button
            disabled={pagination.currentPage === 1}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                currentPage: prev.currentPage - 1,
              }))
            }
          >
            Previous
          </Button>
          <span>
            Page {pagination.currentPage} of {totalPages}
          </span>
          <Button
            disabled={pagination.currentPage === totalPages}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                currentPage: prev.currentPage + 1,
              }))
            }
          >
            Next
          </Button>
        </ButtonGroup>
      </TableContainer>
    </div>
  );
}

export default FeatureList;
