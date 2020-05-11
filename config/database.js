if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://vidjot:vidjot2020@ds263927.mlab.com:63927/vidjot-prod'}
}else{
  module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}