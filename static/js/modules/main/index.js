/**
 * Created by lingqiang on 2017/3/30.
 *
 */
import React, {Component} from 'react';
import appStore from './store';
import {msg, connectToStore} from 'iflux';
import {Table} from 'antd';


class Main extends Component {
  componentDidMount() {
    msg.emit('main:init');
  }

  render() {
    let data = appStore.data().get('data');
    let columns = appStore.data().get('columns');
    return (
      <div>
        <Table columns={columns.toJS()} scroll={{ x: 1300}} dataSource={data.toJS()} bordered/>
      </div>
    );
  }
}

export default connectToStore(appStore, true)(Main);