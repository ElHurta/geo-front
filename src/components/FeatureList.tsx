import { useEffect, useState } from "react";
import { Feature, getFeatures } from "../services/features-service";

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
        setTotalPages(Math.ceil(data.meta.pagination.total / pagination.perPage));
      } catch (error) {
        console.error("Error fetching features:", error);
      }
    };

    fetchFeatures();
  }, [pagination, filters]);

  return (
    <div>
      <ul>
        {features.map((feature) => (
          <li key={feature.id}>{feature.attributes.title}</li>
        ))}
      </ul>
      <div>
        <button
          disabled={pagination.currentPage === 1}
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: prev.currentPage - 1,
            }))
          }
        >
          Previous
        </button>
        <span>
          Page {pagination.currentPage} of {totalPages}
        </span>
        <button
          disabled={pagination.currentPage === totalPages}
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: prev.currentPage + 1,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FeatureList;
