
import SearchListStore from './SearchListStore';
import LoginStore from './LoginStore';
import HomeStore from './HomeStore';

export default {
  searchListStore: new SearchListStore(),
  loginStore: new LoginStore(),
  homeStore: new HomeStore()
};
