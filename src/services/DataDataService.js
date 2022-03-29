import http from "../http-common";
class TutorialDataService {
  getAll() {
    return http.get("/datas");
  }
  get(id) {
    return http.get(`/datas/${id}`);
  }
  create(data) {
    return http.post("/datas", data);
  }
  update(id, data) {
    return http.put(`/datas/${id}`, data);
  }
  delete(id) {
    return http.delete(`/datas/${id}`);
  }
  deleteAll() {
    return http.delete(`/datas`);
  }
  findByTitle(city) {
    return http.get(`/datas?city=${city}`);
  }
}
export default new TutorialDataService();