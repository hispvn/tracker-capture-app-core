import React, { useState, useEffect } from "react";
import { CustomDataProvider, Provider } from "@dhis2/app-runtime";
import { OrganisationUnitTree } from "@dhis2/ui";
import LoadingMask from "../LoadingMask/LoadingMask.component.jsx";
import useApi from "../../hooks/useApi";

const OrgUnitSelector = ({ selectedOrgUnit, handleSelectOrgUnit, filter }) => {
  const { metadataApi } = useApi();
  const [orgUnitData, setOrgUnitData] = useState(null);

  useEffect(() => {
    metadataApi.getOrgUnitSelectorData(filter).then((json) => {
      console.log(json);
      setOrgUnitData(json);
    });
  }, []);

  const foundSelectedOrgUnit = orgUnitData ? orgUnitData.tree[`organisationUnits/${selectedOrgUnit ? selectedOrgUnit.id : selectedOrgUnit}`] : "";
  let transformedSelectedOrgUnit = null;
  if (foundSelectedOrgUnit) {
    if (orgUnitData.roots.includes(selectedOrgUnit)) {
      transformedSelectedOrgUnit = ["/" + foundSelectedOrgUnit.id];
    } else {
      transformedSelectedOrgUnit = [foundSelectedOrgUnit.path];
    }
  }
  return orgUnitData ? (
    <Provider config={{ apiVersion: "", baseUrl: process.env.REACT_APP_BASE_URL }}>
      <OrganisationUnitTree
        initiallyExpanded={transformedSelectedOrgUnit ? transformedSelectedOrgUnit : orgUnitData.roots}
        roots={orgUnitData.roots}
        selected={transformedSelectedOrgUnit ? transformedSelectedOrgUnit : []}
        onChange={(selected) => {
          handleSelectOrgUnit(selected);
        }}
        filter={filter}
      />
    </Provider>
    // <CustomDataProvider data={orgUnitData.tree}>
      
    // </CustomDataProvider>
  ) : (
    <LoadingMask />
  );
};

export default OrgUnitSelector;