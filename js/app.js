function mention()
{
	change_card('mention_card');
	load_mention_list();
}

function home()
{
	change_card('home_card');
	load_home_list();
}

function my()
{
	change_card('my_card');
	load_my_list();
}



function logout()
{
	
  CDV.WB.logout(function(response) 
  {
    alert('logged out');
    kremove('owb-token');
    return change_page('index');
  });

}


function load_list( ul , api )
{
	if(kget('owb-token').length < 1 ) change_page('index');
	
    CDV.WB.get("https://api.weibo.com/2/statuses/" + api + ".json", 
    {
      access_token : kget('owb-token'),
    }, 
    function(response)
    {
      var data = $.parseJSON(response);
      
      
      if( data.error_code )
      {
      	kremove('owb-token');
      	return change_page('index');
      }
      	
      
      
      $('#'+ul).html("");
      data.statuses.forEach(function(item) {
        $('#'+ul).append("<li>" +  "<span class='name'>" + item.user.name + "</span>: " + item.text + "<div class='timeline'>" + item.created_at  + "</div></li>");
      });
      
    }, function(response){
      alert('error: ' + response);
    });
}


function load_home_list()
{
	return load_list( 'home_list' , 'home_timeline' );
}

function load_mention_list()
{
	return load_list( 'mention_list' , 'mentions' );
}

function load_my_list()
{
	return load_list( 'my_list' , 'user_timeline' );
}




function index_loaded()
{
	//alert('hello index');
	if( kget('owb-token').length > 5 ) change_page('weibo');
}


function login() 
{
  CDV.WB.login(
  function(access_token, expires_in) 
  {
    console.log("access_token: " + access_token);
    if (access_token && expires_in) 
    {
      //alert('logged in token='+access_token);
      kset('owb-token' , access_token );
      change_page('weibo');  
    }
    else
    {
      alert('not logged in');
    }
  });
}



function initApp( callback ) 
{
  
  if ((typeof cordova == 'undefined')
      && (typeof Cordova == 'undefined'))
    alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
    if (typeof CDV == 'undefined')
      alert('CDV variable does not exist. Check that you have included cdv-plugin-weibo-connect.js correctly');

    try {
      $.ajaxSetup({
        // Disable caching of AJAX responses
        cache : false
      });

      
      CDV.WB.init({
        appKey : "【换成你的加密后的appkey】",
        appSecret : "【换成你的加密后的appsecret】",
        redirectUrl : "【换成你在微博开放平台应用高级信息页面填写的回调地址】"
      }, function(response) {
       
        if( typeof callback == 'function' ) callback();
        
        
      }, function(msg){
        //alert(msg);
      });

      
    } catch (e) {
       alert(e);
    }
}



var phonegapLoaded = function( callback ) 
{
  try
  {
    document.addEventListener(
      'deviceready',
      function() 
      {
        // load weibo plugin
        
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.onload = function() 
        {
          initApp( callback );
        }
        script.src = 'cdv-plugin-wb-connect.js';
        document.head.appendChild(script);
      }, false);
  }catch(e)
  {
    alert(e);
  }
}

function init( callback ) 
{
  try
  {
    setTimeout( function(){ phonegapLoaded(callback); } , 1000);
  }
  catch(e) 
  {
    //alert(e);
  }
}

// ============================
// system
// ============================
function change_page( page )
{
	window.open( page + '.html' ) ;
}

function change_card( cid )
{
	op_change( cid , 'card' );
}

function change_tab( tid )
{
	op_change( tid , 'tab' );
}

function op_change( id , name )
{
	$(".op-"+name).each( function( index , value )
	{
		if($(this).attr('id') == id )
		{
			$(this).addClass('cur');
		}
		else
		{
			$(this).removeClass('cur');
		}
	});

}

function kset( key , value )
{
	window.localStorage.setItem( key , value );
}

function kget( key  )
{
	return window.localStorage.getItem( key );
}

function kremove( key )
{
	window.localStorage.removeItem( key );
}

