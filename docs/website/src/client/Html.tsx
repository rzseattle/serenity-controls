/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
const Html = ({ body, title , menu}: { body: string, title: string, menu: string }) => {





    return `

  
  
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>${title}</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900" rel="stylesheet" />
<link href="css/default.css" rel="stylesheet" type="text/css" media="all" />
<link href="css/fonts.css" rel="stylesheet" type="text/css" media="all" />

<!--[if IE 6]><link href="default_ie6.css" rel="stylesheet" type="text/css" /><![endif]-->

</head>
<body>
<div id="header-wrapper">
  <div id="header" class="container">
    <div id="logo">
      <h1><a href="/">Fontend-lib</a></h1>
</div>
${menu}
    
  </div>
</div>
<div id="header-featured"> </div>

<div id="wrapper">
  <div id="featured-wrapper">
    <div id="featured" class="container">
      <div class="column1"> <span class="icon icon-cogs"></span>
        <div class="title">
          <h2>Builder</h2>
        </div>
        <p>Building envoirment for js aps</p>
      </div>
      <div class="column2"> <span class="icon icon-legal"></span>
        <div class="title">
          <h2>Backoffice panel</h2>
        </div>
        <p>Panel providing routing/context/tools.</p>
      </div>
      <div class="column3"> <span class="icon icon-unlock"></span>
        <div class="title">
          <h2>Controls</h2>
        </div>
        <p>Controlset for any occassion.</p>
      </div>
      <div class="column4"> <span class="icon icon-wrench"></span>
        <div class="title">
          <h2>Develop tools</h2>
        </div>
        <p>Live reloading, code finding, errors debuging.</p>
      </div>
    </div>
  </div>
  <div id="extra" class="container">
    
    </div>

<div id="copyright" class="container">
  <p>&copy; Untitled. All rights reserved. | Photos by <a href="http://fotogrph.com/">Fotogrph</a> | Design by <a href="http://templated.co" rel="nofollow">TEMPLATED</a>.</p>
</div>
<script src="/client.js" ></script>
</body>
</html>

  
`;
};

export default Html;


/*
*
*   <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body style="margin:0">
      <div id="app">${body}xxx 1 asd</div>
    </body>
  </html>
* */