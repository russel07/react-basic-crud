import http from "../http-common";

class BookDataService {
  getAll() {
    return http.get("/book");
  }

  get(id) {
    return http.get(`/book/${id}`);
  }

  create(data) {
    return http.post("/book", data);
  }

  update(id, data) {
    return http.put(`/book/${id}`, data);
  }

  delete(id) {
    return http.delete(`/book/${id}`);
  }

  deleteAll() {
    return http.delete(`/book`);
  }

  findByTitle(title) {
    return http.get(`/book?title=${title}`);
  }
}

export default new BookDataService();