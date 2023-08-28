import React, { useEffect, useRef } from 'react';
import Taro, { useReady } from '@tarojs/taro';
import { Canvas } from '@tarojs/components';
import type { CanvasProps, CanvasTouchEvent } from '@tarojs/components';
import { Canvas as F2CanvasClass } from '@antv/f2';
import { my as F2Context } from '@antv/f2-context';

import useEvent from '@/hooks/use-event';

interface IProps extends CanvasProps {
  onInit?: (args: any) => any;
}

const wrapEvent = (e: CanvasTouchEvent) => {
  if (!e) return;
  if (!e.preventDefault) {
    e.preventDefault = function () {};
  }
  return e;
};

const F2Canvas: React.FC<IProps> = ({ id, onInit, children, ...props }) => {
  const canvasEl = useRef<any>();

  const onAlipayCanvas = useEvent(() => {
    const ctx = Taro.createCanvasContext(id!);
    const context = F2Context(ctx);

    const query = Taro.createSelectorQuery();
    query
      .select('#' + id)
      .boundingClientRect()
      .exec((res) => {
        // 获取画布实际宽高
        const { width, height } = res && res[0] ? res[0] : props;
        if (!width || !height) return;
        const pixelRatio = Taro.getSystemInfoSync().pixelRatio;
        // const pixelRatio = 1;

        const config = { context, width, height, pixelRatio, children };
        const canvas = new F2CanvasClass(config);
        if (canvas) {
          canvasEl.current = canvas.canvas.get('el');
        }
      });
  });

  const onWxCanvas = useEvent(() => {
    const query = Taro.createSelectorQuery();
    query
      .select('#' + id)
      .fields({
        node: true,
        size: true,
      })
      .exec((res) => {
        const { node, width, height } = res[0] || {};
        if (!node) return;
        const context = node.getContext('2d');
        const pixelRatio = Taro.getSystemInfoSync().pixelRatio;
        // 高清设置
        node.width = width * pixelRatio;
        node.height = height * pixelRatio;
        const config = { context, width, height, pixelRatio, children };
        const canvas = new F2CanvasClass(config);
        canvas.render();
        canvasEl.current = canvas.canvas.get('el');
      });
  });

  const touchStart = (e: CanvasTouchEvent) => {
    if (canvasEl.current) {
      canvasEl.current.dispatchEvent('touchstart', wrapEvent(e));
    }
  };
  const touchMove = (e: CanvasTouchEvent) => {
    if (canvasEl.current) {
      canvasEl.current.dispatchEvent('touchmove', wrapEvent(e));
    }
  };
  const touchEnd = (e: CanvasTouchEvent) => {
    if (canvasEl.current) {
      canvasEl.current.dispatchEvent('touchend', wrapEvent(e));
    }
  };

  useReady(() => {
    if (process.env.TARO_ENV === 'alipay') {
      onAlipayCanvas();
    }
    if (process.env.TARO_ENV === 'weapp') {
      onWxCanvas();
    }
  });

  return (
    <Canvas
      id={id}
      canvasId={id}
      type='2d'
      onTouchStart={touchStart}
      onTouchMove={touchMove}
      onTouchEnd={touchEnd}
      {...props}
    />
  );
};
export default F2Canvas;
