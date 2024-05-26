import React, { useEffect, useState } from "react";
import {
  HashLoad,
  ModeTable,
  PageTitle,
  consumptionColumns as orginalColumns,
  DateTimePickerMui,
  buildUrl,
  exportUrl,
  DownloadExcel,
  CustomButton
} from "../../../Components";
import { useGetDataQuery } from "../../../Redux";
import { consumptionURL, exportConsumptionURL } from "../../../Api";
import styles from "./Consumption.module.css";

const ConsumptionPage = () => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [dates, setDates] = useState([]);
  const [url, setUrl] = useState(
    `${consumptionURL}${pagination.currentPage}&limit=${pagination.perPage}`
  );

  const {
    data: apiData,
    error: isError,
    isLoading,
    refetch,
  } = useGetDataQuery(url);
  const [filters, setFilters] = useState({
    Area: -1,
    Crew: null,
    Shift: 0,
  });

  useEffect(() => {
    refetch();
  }, [pagination.currentPage, pagination.perPage, refetch, url]);

  const handleSearchButtonClick = () => {
    const newUrl = buildUrl(
      consumptionURL,
      pagination.currentPage,
      pagination.perPage,
      dates,
      filters
    );
    setUrl(newUrl);
  };

  const handleDownload = async () => {
    try {
      setLoading(true); // Set loading state when downloading
      const newUrl = exportUrl(exportConsumptionURL, dates, filters);
      const url = await DownloadExcel(newUrl);
      setDownloadUrl(url);
    } catch (error) {
      // Handle error if necessary
    } finally {
      setLoading(false); // Unset loading state after download completes
    }
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
    const newUrl = buildUrl(
      consumptionURL,
      page,
      pagination.perPage,
      dates,
      filters
    );
    setUrl(newUrl);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPagination({ currentPage: page, perPage: newPerPage });
    const newUrl = buildUrl(consumptionURL, page, newPerPage, dates, filters);
    setUrl(newUrl);
  };

  const handleCancel = () => {
    setDownloadUrl("");
  };

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  return (
    <>
      <PageTitle Title="Consumption Page" />

      <div className={`${styles.divMaster_Search}`} style={{ position: 'relative' }}>
        <div className="pt-4 flex justify-center items-center">
          <DateTimePickerMui dates={dates} setDates={setDates} />
          <CustomButton
            handleButtonClick={handleSearchButtonClick}
            title="Search"
          />

          {/* Render buttons and spinner conditionally */}
          {!downloadUrl && !loading && (
            <CustomButton handleButtonClick={handleDownload} title="Export" />
          )}
          {loading && <HashLoad />} {/* Show spinner when loading */}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="Power Consumption.xlsx"
              onClick={handleCancel}
            >
              Click here to download
            </a>
          )}
        </div>
      </div>

      <ModeTable
        columns={orginalColumns}
        data={apiData?.data || []}
        progressPending={isLoading}
        pagination
        paginationServer
        paginationTotalRows={apiData?.totalRowsCount || 0}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        isLoading={isLoading}
      />
    </>
  );
};

export default ConsumptionPage;
