/**
 * 创建promise
 * @param {Number} value 
 */
function makePromise (value) {
	return new Promise((resolve) => {
	  setTimeout(() => {
	    resolve(value);
	  }, Math.random() * 1000)
	})
      }
      /**
       * 打印结果
       * @param {Number} value 
       */
      function print (value) {
	return value
      }
      
      let promises = [1, 3, 4, 5, 6].map((item, index) => {
	return makePromise(item)
      });

      // 串行执行
      let parallelPromises = promises.reduce(
	(total, currentValue) => total.then(() => currentValue.then(print)),Promise.resolve()
      )
      
      parallelPromises
      .then(() => {
	 console.log('done')
      })
      .catch(() => {
	console.log('done')
      })