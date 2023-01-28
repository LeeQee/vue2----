import request from "@/utils/request";

// post
export function supplierList(data) {
  return request({
    url: "/supplier/list",
    method: "post",
    data: data,
  });
}
// get
export function listResource(query) {
  return request({
    url: "/system/notice/list",
    method: "get",
    params: query,
  });
}
