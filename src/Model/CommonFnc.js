exports.setTime = function getTimeStamp(userDate){
  var d = new Date(userDate);
  var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

    return s;
}
function leadingZeros(n, digits){
  var zero = '';
  n = n.toString();

  if(n.length < digits){
    for(let i = 0; i < digits - n.length; i++)
      zero += '0';
  }

  return zero + n;
}

exports.onlyNumber = function onlyNumber(e) {
  e.target.value=e.target.value.replace(/[^0-9]/g,'');
}

exports.setComma = function setComma(value){
  return (value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
