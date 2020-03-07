import Mock from 'mockjs';
Mock.setup({ 'timeout': '100-200' })
Mock.mock('/bardata', {
    'colname': ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    'bardata|12-12': ['@integer(30, 74)']
})
Mock.mock('/piedata', {
    'colname': ["木材", "石材", "水泥", "涂料", "油漆"],
    'piedata': [{ value: '@integer(45000, 75000)', name: '木材' },
    { value: '@integer(45000, 75000)', name: '石材' },
    { value: '@integer(45000, 75000)', name: '水泥' },
    { value: '@integer(45000, 75000)', name: '涂料' },
    { value: '@integer(45000, 75000)', name: '油漆' }]
})
Mock.mock('/newCustomer', {
    name: '@name',
    age: '@integer(20, 35)',
    address: '@county(true)',
})
Mock.mock('/doorItem', {
    "data|107": [
        {
            value: '@integer(1, 100000)',
            label: '@cname' + '@cname' + '@cname' + '@cname' + '@cname',
        },
    ]

})
Mock.mock('/todolist', {
    tododata: [
        {
            text: '整理上午会议记录', time: '@now(yyyy-MM-dd)'
            , active: true, 'id': 1
        },
        { text: '处理库存表', time: '@now(yyyy-MM-dd)', active: false, 'id': 2 }
    ]
})
Mock.mock('/customer', [{
    key: '0',
    name: 'Edward King 0',
    age: '32',
    address: 'London, Park Lane no. 0',
}, {
    key: '1',
    name: 'Edward King 1',
    age: '30',
    address: 'London, Park Lane no. 1',
}])
// Mock.mock({
//     "string|1-10": "★"
//   })