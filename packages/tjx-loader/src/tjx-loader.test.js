const tjxLoader = require('./tjx-loader');

const tjxStr = `<section className='container' id='test'>
<ul id='list'>
  <li className='item'>item1</li>
  <li className='item'>item2</li>
  <li className='item'>item3</li>
</ul>
</section>`;

console.log(tjxLoader(tjxStr));