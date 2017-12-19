/**
 * Created by lingqiang on 2017/12/19.
 */
//import {msg, Store} from 'iflux';
import Mock, {Random} from 'mockjs';
import Immutable from 'immutable';
import msg from "../util/msg";
import Store from "../util/store";

var appStore = Store({
  data: Immutable.List(),
  columns:[
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'old',
      key: 'old',
    }
  ]
});

export default appStore;

msg.on('main:init', init);


function init() {
  let data = Mock.mock({
    'list|10': [{
      'id|+1': 1,
      'name': Random.name(),
      'old|1-100': 1
    }]
  });
  appStore.cursor().set('data', Immutable.fromJS(data.list));
}
