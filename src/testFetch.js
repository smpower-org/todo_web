import React, {Component} from 'react';

class TestFetch extends Component {
  render() {
    return (
      <div className="test-fetch">TestFetch Component</div>
    );
  }

  componentDidMount() {
    // 测试 GET 请求
    fetch('/todo/test/get?name=Olive&sex=female&age=22', 
      {method: 'GET'}
    ).then(res => {
      if (res.status === 200) return res.json();
    }).then(resJson => {
      console.group('测试 GET 请求方式:');
      console.log('后台返回到前台的 JSON 数据:');
      console.log(resJson);
      console.groupEnd();
    }).catch(err => {
      console.log(err);
    });

    // 测试 POST 请求
    fetch('/todo/test/post', {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json;charset=UTF-8'
	// 'Content-Type': 'application/x-www-form-urlencoded'  // 1. 这种方法也是可以的
      },
      body: JSON.stringify({
	name: 'Olive',
	sex: 'female',
	age: 22
      })
      // body: `userName=Olive&password=123&passwordAgain=123`  // 1. 这种方法也是可以的
    }).then(res => {
      if (res.status === 200) return res.json();
    }).then(resJson => {
      console.group('测试 POST 请求方式:');
      console.log('后台返回到前台的 JSON 数据:');
      console.log(resJson);
      console.groupEnd();
    }).catch(err => {
      console.log(err);
    });
  }
}

export default TestFetch;
