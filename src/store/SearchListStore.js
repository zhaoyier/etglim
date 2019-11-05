import { extendObservable, action } from 'mobx';
import { getPlans, removePlan } from 'util/api';

export default class SearchListStore {
  constructor() {
    this.reset(true);
  }

  @action
  reset = (init) => {
    const state = {
      data: [],
      pageSize: Number,
      pageNum: Number,
      loading: false // 是否显示加载状态
    };

    if (init) {
      extendObservable(this, state);
    } else {
      Object.keys(state).forEach(key => (this[key] = state[key]));
    }

    this.location = {};
    this.match = {};
    this.history = {};
  }

  @action
  onWillMount = async (location, match, history) => {
    this.reset();
    this.pageSize = 30
    this.setRoute(location, match, history);

    this.loading = true;
    await this.getPlans('');
    this.loading = false;
  }

  setRoute = (location, match, history) => {
    this.location = location;
    this.match = match;
    this.history = history;
  }

  @action
  create = () => {
    this.history.push('/project/form/step');
  }

  @action
  search = async (values) => {
    // console.log(values);
    await this.getPlans(values.name);
  }

  @action
  setPageNum = async (pageNum) => {
    this.pageNum = pageNum
  }

  @action
  remove = async (id) => {
    this.loading = true;
    await removePlan(id);
    await getPlans('');
    this.loading = false;
  }

  @action
  async getPlans(name) {
    const res = await getPlans(name, 0, 10000);
    if (res.code === 0) {
      this.data = res.data;
    }
  }
}
