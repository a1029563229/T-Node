const tjxLoader = require('./tjx-loader');

const tjxStr = `<section className='container'>
<h1>标题</h1>
<ul id='list'>
  <li className='item'>{userInfo.name}</li>
  <li className='item'>{userInfo.sex}</li>
  <li className='item'>{userInfo.age}</li>
</ul>
</section>`;

console.log(tjxLoader(tjxStr));