function get_device_type() {
  if (navigator.userAgent.match(/(Android)\s+([\d.]+)/)
      || navigator.userAgent.match(/Silk-Accelerated/))
    return 'android';
    if (navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/))
      return 'ios';
    if (navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/))
      return 'ios';
    return 'other';
}

device_type = get_device_type();

if (device_type != 'other') {
  try {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.onload = function() {
      //alert("phonegap.android.js loaded");
    };
    script.src = 'phonegap.' + get_device_type() + '.js';
    document.head.appendChild(script);
  }catch(e) {
    alert(e);
  }
}
