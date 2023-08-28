import React from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import Bar from './components/bar';

const Index = () => {
  const handleClick = () => {
    const query = Taro.createSelectorQuery();
    query
      .select('#gfg')
      .boundingClientRect()
      .exec((res) => console.log(res, 'res'));
  };

  return (
    <View>
      11
      <View>
        <Bar />
      </View>
      <View onClick={handleClick}>dian</View>
    </View>
  );
};

export default Index;

definePageConfig({
  navigationBarTitleText: '测试页',
  enableShareAppMessage: true,
});
