import { pull, push } from "./Fetch";
import BaseApiClass from "./BaseApiClass";

export default class DataApiClass extends BaseApiClass {
  getTrackedEntityInstanceListByQuery(
    orgUnit,
    program,
    pageSize,
    page,
    filter,
    order,
    programStatus
  ) {
    return pull(
      this.baseUrl,
      this.username,
      this.password,
      `/api/tracker/trackedEntities`,
      {
        paging: true,
        pageSize: pageSize,
        totalPages: true,
        page: page,
        filter: filter,
        order: order,
      },
      [
        `orgUnits=${orgUnit}`,
        `orgUnitMode=SELECTED`,
        `program=${program}`,
        programStatus ? `programStatus=${programStatus}` : "",
      ]
    );
  }

  searchTei(program, attributes, pageSize, page) {
    let filters = "";
    attributes.forEach((attr) => {
      filters += `&filter=${attr.attribute}:EQ:${attr.value}`;
    });
    return pull(
      this.baseUrl,
      this.username,
      this.password,
      `/api/tracker/trackedEntities`,
      {
        paging: true,
        pageSize: pageSize,
        totalPages: true,
        page: page,
        filter: filters,
        order: "order=createdAt:desc",
      },
      [`ouMode=ACCESSIBLE`, `program=${program}`, `fields=*`]
    );
  }

  searchTeiByTet(tet, attributes, pageSize, page) {
    let filters = "";
    attributes.forEach((attr) => {
      filters += `&filter=${attr.attribute}:EQ:${attr.value}`;
    });
    return pull(
      this.baseUrl,
      this.username,
      this.password,
      `/api/tracker/trackedEntities`,
      {
        paging: true,
        pageSize: pageSize,
        totalPages: true,
        page: page,
        filter: filters,
        order: "order=createdAt:desc",
      },
      [`ouMode=ACCESSIBLE`, `trackedEntityType=${tet}`, `fields=*`]
    );
  }

  async getTrackedEntityInstanceById(id, program) {
    const tei = await pull(
      this.baseUrl,
      this.username,
      this.password,
      `/api/tracker/trackedEntities/${id}`,
      { paging: false },
      [`fields=*`, `program=${program}`]
    );
    return tei;
  }

  // importStrategy can be CREATE, UPDATE, CREATE_AND_UPDATE, DELETE
  pushTrackedEntities(payload, importStrategy) {
    return push(
      this.baseUrl,
      this.username,
      this.password,
      `/api/tracker?importStrategy=${importStrategy}`,
      payload
    );
  }
}
