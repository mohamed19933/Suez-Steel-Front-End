import React, { useEffect, useState } from "react";
import {
  HashLoad,
  ModeTable,
  PageTitle,
  standsColumns as orginalColumns,
  SearchButton,
  DateTimePickerMui,
  buildUrl,
  exportUrl,
  DownloadExcel,
  CustomButton
} from "../../../Components";
import { useGetDataQuery } from "../../../Redux";
import { standsURL, exportStandsURL } from "../../../Api";
import styles from "./Stands.module.css";

const StandsPage = () => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [dates, setDates] = useState([]);
  const [url, setUrl] = useState(
    `${standsURL}${pagination.currentPage}&limit=${pagination.perPage}`
  );

  const { data: apiData, error, isLoading, refetch } = useGetDataQuery(url);
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
      standsURL,
      pagination.currentPage,
      pagination.perPage,
      dates,
      filters
    );
    setUrl(newUrl);
  };

  const handleDownload = async () => {
    try {
      const newUrl = exportUrl(exportStandsURL, dates, filters);
      const url = await DownloadExcel(newUrl);
      setDownloadUrl(url);
    } catch (error) {
      //   Handle error if necessary
    }
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
    const newUrl = buildUrl(
      standsURL,
      page,
      pagination.perPage,
      dates,
      filters
    );
    setUrl(newUrl);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPagination({ currentPage: page, perPage: newPerPage });
    const newUrl = buildUrl(standsURL, page, newPerPage, dates, filters);
    setUrl(newUrl);
  };
  const handleCancel = () => {
    setDownloadUrl("");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return (
      <div className="overlay">
        <HashLoad />
      </div>
    );
  }

  return (
    <>
      <PageTitle Title="Stands and RHF Page" />

      <div className={styles.divMaster_Search}>
        <div className="pt-4 flex  items-center">
          <DateTimePickerMui dates={dates} setDates={setDates} />
          <CustomButton
            handleButtonClick={handleSearchButtonClick}
            title="Search"
          />
          {/* {!downloadUrl && (
            <SearchButton handleButtonClick={handleDownload} title="Export" />
          )}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="Stands and RHF Consumption.xlsx"
              onClick={handleCancel}
            >
              Click here to download
            </a>
          )} */}
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

export default StandsPage;
