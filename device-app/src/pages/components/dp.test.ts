export default {
  status: [
    {
      code: 'switch',
      editable: true,
      name: '开关',
      options: '{}',
      type: 'Boolean',
      value: true,
    },
    {
      code: 'countdown_1',
      editable: true,
      name: '开关1倒计时',
      options: '{"unit":"s","min":0,"max":86400,"scale":0,"step":1}',
      type: 'Integer',
      value: 0,
    },
    {
      code: 'test Enum',
      editable: true,
      name: '测试Enum',
      options: '{"range":["1","2","3","4","5"]}',
      type: 'Enum',
      value: '1',
    },

    {
      code: 'test2',
      editable: true,
      name: '测试1',
      options: '{"maxlen":5}',
      type: 'String',
      value: '1',
    },

    {
      code: 'test2',
      editable: true,
      name: '测试1',
      options: '{"json":255}',
      type: 'Json',
      value: '{"json":255}',
    },
  ],
};
