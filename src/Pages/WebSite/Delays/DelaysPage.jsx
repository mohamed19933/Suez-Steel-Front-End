import React, { useEffect, useState } from "react";
import {
  Data,
  HashLoad,
  ModeTable,
  PageTitle,
  delaysColumns as orginalColumns,
  crews,
  shifts,
  DateTimePickerMui,
  buildUrl,
  exportUrl,
  DownloadExcel,
  CustomButton
} from "../../../Components";
import { useGetDataQuery } from "../../../Redux";
import { delaysURL, exportDelaysURL } from "../../../Api";
import styles from "./Delays.module.css";

const DelaysPage = () => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [dates, setDates] = useState([]);
  const [url, setUrl] = useState(
    `${delaysURL}${pagination.currentPage}&limit=${pagination.perPage}`
  );
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false); // Track export process
  const { data: apiData, error, isLoading, refetch } = useGetDataQuery(url);
  const [filters, setFilters] = useState({
    Crew: null,
    Shift: 0,
  });

  useEffect(() => {
    refetch();
  }, [pagination.currentPage, pagination.perPage, refetch, url]);

  const handleSearchButtonClick = () => {
    const newUrl = buildUrl(
      delaysURL,
      pagination.currentPage,
      pagination.perPage,
      dates,
      filters
    );
    setUrl(newUrl);
  };

  const handleDownload = async () => {
    try {
      setLoading(true); // Set loading state
      setExporting(true); // Set exporting state
      const newUrl = exportUrl(exportDelaysURL, dates, filters);
      const url = await DownloadExcel(newUrl);
      setDownloadUrl(url);
    } catch (error) {
      //   Handle error if necessary
    }finally{
      setLoading(false); // Set loading state
      setExporting(false); // Set exporting state
    }
  };
  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
    const newUrl = buildUrl(
      delaysURL,
      page,
      pagination.perPage,
      dates,
      filters
    );
    setUrl(newUrl);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPagination({ currentPage: page, perPage: newPerPage });
    const newUrl = buildUrl(delaysURL, page, newPerPage, dates, filters);
    setUrl(newUrl);
  };
  const handleCancel = () => {
    setDownloadUrl("");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
       {/* Render overlay when loading or exporting */}
       {(loading || exporting || isLoading) && (
          <div className={styles.overlay}>
            <HashLoad />
          </div>
        )}

      <PageTitle Title="Delays Page" />

      <div className={styles.divMaster_Search}>
        <div className="pt-4 flex justify-center items-center">
          <Data.TextField
            fullWidth
            select
            size="small"
            label="Select Crew"
            variant="outlined"
            value={filters.Crew || ""}
            onChange={(e) => setFilters({ ...filters, Crew: e.target.value })}
            className={styles.searchtextFields}
          >
            {crews.map((crew) => (
              <Data.MenuItem
                key={crew.value}
                value={crew.value}
                disabled={crew.disabled}
              >
                {crew.label}
              </Data.MenuItem>
            ))}
          </Data.TextField>

          <Data.TextField
            fullWidth
            select
            size="small"
            label="Select Shift"
            variant="outlined"
            value={filters.Shift || ""}
            onChange={(e) => setFilters({ ...filters, Shift: e.target.value })}
            className={styles.searchtextFields}
          >
            {shifts.map((shift) => (
              <Data.MenuItem
                key={shift.value}
                value={shift.value}
                disabled={shift.disabled}
              >
                {shift.label}
              </Data.MenuItem>
            ))}
          </Data.TextField>

          <DateTimePickerMui dates={dates} setDates={setDates} />
        </div>

        <div className="flex items-center">
          <CustomButton
            handleButtonClick={handleSearchButtonClick}
            title="Search"
            disabled={isLoading} // Disable button while loading
          />

          {/* Render buttons and spinner conditionally */}
          {!downloadUrl && !isLoading && (
            <CustomButton handleButtonClick={handleDownload} title="Export" />
          )}
          {downloadUrl && (
            <a href={downloadUrl} download="Delays.xlsx" onClick={handleCancel}>
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

export default DelaysPage;
