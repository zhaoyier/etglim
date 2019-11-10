import { extendObservable, action } from 'mobx';
import { getFocusList, createFocusEvent, updateFocusEvent, cancelFocusEvent } from 'util/api';

export default class FucusStore {
  constructor() {
    this.reset(true);
  }

  @action
  reset = (init) => {
    const state = {
      focusList: [],
      focusId: '',
      stateOptions: [{ key: 0, value: '全部' }, { key: 1, value: '开始' }, { key: 2, value: '进行中' }, { key: 3, value: '结束' }],
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
    await this.getData('', 0, 0, 0);
    this.loading = false;

    // this.loading = true;
    // await this.stateOptions();
    // this.loading = false;
  }

  setRoute = (location, match, history) => {
    this.location = location;
    this.match = match;
    this.history = history;
  }

  @action
  setFocusId = async (id) => {
    this.focusId = id;
    console.log('===>>setFocusId:', this.focusId);
  }

  @action
  search = async (contract, state, offset, limit) => {
    console.log('===>>search:', contract, state, offset, limit);
    await this.getData(contract, state, offset, limit);
  }

  @action
  async getData(contract, state, offset, limit) {
    const params = {
      contract, state, offset, limit
    };

    const res = await getFocusList(params);
    console.log('====>>>getFocusList:', params, res);
    if (res.code === 0) {
      this.focusList = res.data;
    }
  }

  @action
  async create(params) {
    const res = await createFocusEvent(params);
    if (res.code === 0) {
      console.log('ok');
    }
  }

  @action
  async update(params) {
    const res = await updateFocusEvent(params);
    if (res.code === 0) {
      console.log('ok');
    }
    return res;
  }

  @action
  async cancel(id) {
    const params = { id };
    const res = await cancelFocusEvent(params);
    if (res.code === 0) {
      console.log('ok');
    }
  }
}
