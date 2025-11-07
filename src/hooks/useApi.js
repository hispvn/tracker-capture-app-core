import { useState } from "react";
import MetadataApiClass from "../api/MetadataApiClass";
import DataApiClass from "../api/DataApiClass";
import TrackerApiClass from "../api/TrackerApiClass";

const useApi = () => {
  const [metadataApi, setMetadataApi] = useState(
    new MetadataApiClass(process.env.REACT_APP_BASE_URL, process.env.REACT_APP_USERNAME, process.env.REACT_APP_PASSWORD)
  );
  const [dataApi, setDataApi] = useState(
    new DataApiClass(process.env.REACT_APP_BASE_URL, process.env.REACT_APP_USERNAME, process.env.REACT_APP_PASSWORD)
  );
  const [trackerApi, setTrackerApi] = useState(
    new TrackerApiClass(process.env.REACT_APP_BASE_URL, process.env.REACT_APP_USERNAME, process.env.REACT_APP_PASSWORD)
  );
  return {
    metadataApi,
    dataApi,
    trackerApi
  };
};

export default useApi;
