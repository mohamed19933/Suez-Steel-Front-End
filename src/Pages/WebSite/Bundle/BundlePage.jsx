import React, { useEffect, useState } from "react";
import {
  Data,
  HashLoad,
  ModeTable,
  PageTitle,
  bundleColumns as orginalBundleColumns,
  area,
  crews,
  shifts,
  buildUrl,
  exportUrl,
  SearchButton,
  DownloadExcel,
  CustomButton
} from "../../../Components";
import { useGetDataQuery } from "../../../Redux";
import { bundleURL, exportBundleURL } from "../../../Api";
import styles from "./Bundle.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

const BundlePage = () => {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
  });
  const [dates, setDates] = useState([]);
  const [url, setUrl] = useState(
    `${bundleURL}${pagination.currentPage}&limit=${pagination.perPage}`
  );
  const [exporting, setExporting] = useState(false); // Track export process

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
      bundleURL,
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
      const newUrl = exportUrl(exportBundleURL, dates, filters);
      const url = await DownloadExcel(newUrl);
      setDownloadUrl(url);
    } catch (error) {
      // Handle error if necessary
    } finally {
      setLoading(false); // Unset loading state
      setExporting(false); // Unset exporting state
    }
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
    const newUrl = buildUrl(
      bundleURL,
      page,
      pagination.perPage,
      dates,
      filters
    );
    setUrl(newUrl);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPagination({ currentPage: page, perPage: newPerPage });
    const newUrl = buildUrl(bundleURL, page, newPerPage, dates, filters);
    setUrl(newUrl);
  };
  const handleCancel = () => {
    setDownloadUrl("");
  };
  const handleFromDateChange = (newDate) => {
    setDates([newDate, dates[1]]);
    // If toDate is set and it's before the new from date, update toDate to null
    if (dates[1] && dates[1].isBefore(newDate)) {
      setDates([newDate, null]);
    }
  };

  const handleToDateChange = (newDate) => {
    setDates([dates[0], newDate]);
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
      <PageTitle Title="Bundle Page" />

      <div className={`${styles.divMaster_Search}`} style={{ position: 'relative' }}>
        {/* Render overlay when loading or exporting */}
        {(loading || exporting || isLoading) && (
          <div className={styles.overlay}>
            <HashLoad />
          </div>
        )}



      
        <Data.TextField
          className={styles.searchtextFields}
          select
          size="small"
          label="Select Area"
          variant="outlined"
          value={filters.Area || ""}
          onChange={(e) => setFilters({ ...filters, Area: e.target.value })}
        >
          {area.map((area) => (
            <Data.MenuItem
              key={area.value}
              value={area.value}
              disabled={area.disabled}
            >
              {area.label}
            </Data.MenuItem>
          ))}
        </Data.TextField>

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


        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            className={styles.searchtextFields}
            label="From"
            value={dates[0]}
            onChange={handleFromDateChange}
            maxDate={dates[1]}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            format="DD/MM/YYYY hh:mm a"
          />

          {/* To Date picker */}
          <DateTimePicker
            className={styles.searchtextFields}
            label="To"
            value={dates[1]}
            onChange={handleToDateChange}
            minDate={dates[0]}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            format="DD/MM/YYYY hh:mm a"
          />
        </LocalizationProvider>

        <CustomButton
          handleButtonClick={handleSearchButtonClick}
          title="Search"
          disabled={exporting || loading} // Disable button while exporting or loading
        />
        {!downloadUrl && (
          <CustomButton handleButtonClick={handleDownload} title="Export" disabled={exporting || loading} />
        )}
        {downloadUrl && (
          <a href={downloadUrl} download="Bundles.xlsx" onClick={handleCancel}>
            Click here to download
          </a>
        )}
      </div>

      <ModeTable
        columns={orginalBundleColumns}
        data={apiData?.data || []}
        progressPending={isLoading}
        pagination
        paginationServer
        paginationTotalRows={apiData?.totalRowsCount || 0}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        isLoading={isLoading}
      />
      {loading && <div className="overlay"><HashLoad /></div>}
    </>
  );
};

export default BundlePage;
