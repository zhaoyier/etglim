import { extendObservable, action } from 'mobx';
import { getVarietyList, getContract } from 'util/api';

export default class SearchDailyStore {
  constructor() {
    this.reset(true);
  }

  @action
  reset = (init) => {
    const state = {
      data: [],
      contractes: [],
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

    this.setRoute(location, match, history);

    this.loading = true;
    await this.getData('');
    this.loading = false;
    this.loading = true;
    await this.getContract();
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
  search = async (contract, start, end) => {
    // console.log(values);
    await this.getData(contract, start, end);
  }

  // @action
  // remove = async (id) => {
  //   this.loading = true;
  //   await removePlan(id);
  //   await getPlans('');
  //   this.loading = false;
  // }

  @action
  async getData(name, start, end) {
    const res = await getVarietyList(name, start, end);
    if (res.code === 0) {
      this.data = res.data;
    }
  }

  @action
  async getContract() {
    const res = await getContract();
    if (res.code === 0) {
      console.log('====>>result:', res);
      for (const i in res.contractes) {
        const ct = res.contractes[i];
        const dateList = [];
        for (const j in ct.date) {
          dateList.push({ value: ct.date[j], label: ct.date[j] });
        }
        this.contractes.push({ value: ct.variety, label: ct.variety, children: dateList });
      }
    }
  }
}
