# instagram-api
Instagram API access point



## Stand alone Front End code

Simply construct object and call run();

`
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="instagramapi/instagramapi.js"></script>
<script>
	var instaAPI = new InstaAPI({
		target: 'insta_api1',
		clientId: '',
		userId: '',
		accessToken: '',
		resolution : 'low', //low / standard / thumbnail
		maxContentCount: 5
	});
	instaAPI.run();
		</script>
</head>

<body>
<div class="instagramFeed" id="insta_api1"></div>	

`

## Back End side (Nodejs)

save information in data/auth.json

`
{"clientId":" ","clientSecret":" ","accessToken":" ","redirectUri":" "}
`