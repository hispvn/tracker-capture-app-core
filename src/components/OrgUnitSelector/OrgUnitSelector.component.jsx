import React, { useState, useEffect } from "react";
import { CustomDataProvider, Provider } from "@dhis2/app-runtime";
import { OrganisationUnitTree } from "@dhis2/ui";
import LoadingMask from "../LoadingMask/LoadingMask.component.jsx";
import useApi from "../../hooks/useApi";

const OrgUnitSelector = ({ selectedOrgUnit, handleSelectOrgUnit, filter }) => {
  const { metadataApi } = useApi();
  const [orgUnitData, setOrgUnitData] = useState(null);
  const [key, setKey] = useState("");

  useEffect(() => {
    //metadataApi.getOrgUnitSelectorData(filter).then((json) => {
    metadataApi.getOrgUnitSelectorData().then((json) => {
      setOrgUnitData(json);
      setKey(filter.join("") + new Date().getTime());
    });
  }, [filter]);

  const foundSelectedOrgUnit = orgUnitData
    ? orgUnitData.tree[
        `organisationUnits/${
          selectedOrgUnit ? selectedOrgUnit.id : selectedOrgUnit
        }`
      ]
    : "";
  let transformedSelectedOrgUnit = null;
  if (foundSelectedOrgUnit) {
    if (orgUnitData.roots.includes(selectedOrgUnit)) {
      transformedSelectedOrgUnit = ["/" + foundSelectedOrgUnit.id];
    } else {
      transformedSelectedOrgUnit = [foundSelectedOrgUnit.path];
    }
  }

  const returnOrgUnitTree = () => {
    if (filter.length > 0) {
      return (
        <OrganisationUnitTree
          initiallyExpanded={
            filter && filter.length > 0 ? filter : orgUnitData.roots
          }
          highlighted={filter && filter.length > 0 ? filter : []}
          key={key}
          roots={orgUnitData.roots}
          selected={
            transformedSelectedOrgUnit ? transformedSelectedOrgUnit : []
          }
          onChange={(selected) => {
            handleSelectOrgUnit(selected);
          }}
          filter={filter}
        />
      );
    } else {
      return (
        <OrganisationUnitTree
          initiallyExpanded={
            transformedSelectedOrgUnit
              ? transformedSelectedOrgUnit
              : orgUnitData.roots
          }
          key={key}
          roots={orgUnitData.roots}
          selected={
            transformedSelectedOrgUnit ? transformedSelectedOrgUnit : []
          }
          onChange={(selected) => {
            handleSelectOrgUnit(selected);
          }}
        />
      );
    }
  };

  return orgUnitData ? (
    <Provider
      config={{ apiVersion: "", baseUrl: process.env.REACT_APP_BASE_URL }}
    >
      {returnOrgUnitTree()}
    </Provider>
  ) : (
    <LoadingMask />
  );
};

export default OrgUnitSelector;
