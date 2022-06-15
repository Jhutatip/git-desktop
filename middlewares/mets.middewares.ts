
export const requestTime = function (req:any, res:any, next:any) {
    console.log('Request Type:', req.method)
    
    next()
  }
  export default exports;