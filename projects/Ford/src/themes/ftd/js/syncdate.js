/* Update date time on page */
(function(document) {

  //format GMT date to short format: mm:ss yyyy:MM:dd
	// note, the methods to extract the time elements from the Date object 
	// work in local time (not GMT) 
  var formatGMT = function(date){
    var o = function (n){
      return n.toString().length == 1 ? ('0' + n) : n;
    };

    return o(date.getHours())
      + ':' + o(date.getMinutes())
      + ' ' + date.getFullYear()
      + '-' + o(date.getMonth() + 1)
      + '-' + o(date.getDate());
  };
  
  //change the report status datetime format and convert it to local time.
  $(document).ready(function() {
  
    $report = $(".report");
    $cnt = $report.length;
    $i = 0;
    while ($i < $cnt) {
		$val = $report.eq($i);
        var reg = /\d.+/g, date = new Date($val.text().match(reg)[0] + " GMT");
        date.getTime() && $val.html($val.html().replace(reg, formatGMT(date) ));
            
        $i++;
    }
  });

})(document);