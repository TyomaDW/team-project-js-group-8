import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

export const pagination = new Pagination('#tui-pagination-container', {
  totalItems: 19000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
});