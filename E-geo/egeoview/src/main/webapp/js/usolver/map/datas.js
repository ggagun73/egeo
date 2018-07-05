//****************************************************************
// 시연용 데이터 
var heatmapDatas =  [
						{lon:420057.605,lat:225992.087,count:0},
						{lon:411440.816,lat:227737.28,count:50},
						{lon:420132.385,lat:225185.841,count:50},
						{lon:408949.552,lat:230092.919,count:50},
						{lon:419408.605,lat:225697.151,count:50},
						{lon:413522.759,lat:239014.421,count:50},
						{lon:413884.774,lat:230504.222,count:50},
						{lon:419595.769,lat:225280.369,count:50},
						{lon:419597.963,lat:225272.838,count:50},
						{lon:419595.607,lat:225280.926,count:50},
						{lon:413091.491,lat:238308.612,count:50},
						{lon:420524.208,lat:226647.32,count:50},
						{lon:413775.925,lat:240594.433,count:50},
						{lon:414962.546,lat:232305.462,count:50},
						{lon:416350.158,lat:229966.684,count:50},
						{lon:415081.007,lat:231875.309,count:50},
						{lon:415121.768,lat:233035.93,count:50},
						{lon:413484.512,lat:240400.36,count:50},
						{lon:421494.721,lat:237825.309,count:50},
						{lon:414414.582,lat:231926.491,count:50},
						{lon:409602.213,lat:239938.622,count:50},
						{lon:416413.252,lat:230336.558,count:50},
						{lon:421033.521,lat:241007.096,count:50},
						{lon:421201.088,lat:240344.49,count:50},
						{lon:413362.862,lat:238756.486,count:50},
						{lon:409363.873,lat:230213.324,count:50},
						{lon:409766.582,lat:236591.272,count:50},
						{lon:409757.122,lat:236597.325,count:50},
						{lon:416278.696,lat:230091.74,count:50},
						{lon:413609.284,lat:240704.867,count:50},
						{lon:414435.233,lat:233056.778,count:50},
						{lon:412727.404,lat:240476.451,count:50},
						{lon:412313.4788,lat:231569.2642,count:50},
						{lon:411884.4232,lat:232243.4945,count:50},
						{lon:411820.2108,lat:230813.309,count:50},
						{lon:412360.1788,lat:231604.2891,count:50},
						{lon:411204.3555,lat:231551.7517,count:50},
						{lon:410474.669,lat:231262.7959,count:50},
						{lon:410241.1694,lat:231195.6647,count:50},
						{lon:410527.2064,lat:231081.8337,count:50},
						{lon:410214.9007,lat:231837.7888,count:50},
						{lon:411218.9492,lat:232529.5315,count:50},
						{lon:410171.1195,lat:230197.4537,count:50},
						{lon:408583.3218,lat:230903.7902,count:50},
						{lon:409237.1208,lat:231277.3896,count:50},
						{lon:409108.696,lat:228621.331,count:50},
						{lon:410031.0197,lat:228825.6432,count:50},
						{lon:411186.843,lat:229070.8178,count:50},
						{lon:410188.6319,lat:228335.2939,count:50},
						{lon:408273.9347,lat:228778.9433,count:50}
     ];  


var chartDatas =  {
	'type': 'FeatureCollection',
	'features': [
{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[420057.605,225992.087]},"properties":{"VAL": 0}},
{"type":"Feature","id":2,"geometry":{"type":"Point","coordinates":[411440.816,227737.28]},"properties":{"VAL": 0}},
{"type":"Feature","id":3,"geometry":{"type":"Point","coordinates":[420132.385,225185.841]},"properties":{"VAL": 0}},
{"type":"Feature","id":4,"geometry":{"type":"Point","coordinates":[408949.552,230092.919]},"properties":{"VAL": 0}},
{"type":"Feature","id":5,"geometry":{"type":"Point","coordinates":[419408.605,225697.151]},"properties":{"VAL": 0}},
{"type":"Feature","id":6,"geometry":{"type":"Point","coordinates":[413522.759,239014.421]},"properties":{"VAL": 0}},
{"type":"Feature","id":7,"geometry":{"type":"Point","coordinates":[413884.774,230504.222]},"properties":{"VAL": 0}},
{"type":"Feature","id":8,"geometry":{"type":"Point","coordinates":[419595.769,225280.369]},"properties":{"VAL": 0}},
{"type":"Feature","id":9,"geometry":{"type":"Point","coordinates":[419597.963,225272.838]},"properties":{"VAL": 0}},
{"type":"Feature","id":10,"geometry":{"type":"Point","coordinates":[419595.607,225280.926]},"properties":{"VAL": 0}},
{"type":"Feature","id":11,"geometry":{"type":"Point","coordinates":[413091.491,238308.612]},"properties":{"VAL": 0}},
{"type":"Feature","id":12,"geometry":{"type":"Point","coordinates":[420524.208,226647.32]},"properties":{"VAL": 0}},
{"type":"Feature","id":13,"geometry":{"type":"Point","coordinates":[413775.925,240594.433]},"properties":{"VAL": 0}},
{"type":"Feature","id":14,"geometry":{"type":"Point","coordinates":[414962.546,232305.462]},"properties":{"VAL": 0}},
{"type":"Feature","id":15,"geometry":{"type":"Point","coordinates":[416350.158,229966.684]},"properties":{"VAL": 0}},
{"type":"Feature","id":16,"geometry":{"type":"Point","coordinates":[415081.007,231875.309]},"properties":{"VAL": 0}},
{"type":"Feature","id":17,"geometry":{"type":"Point","coordinates":[415121.768,233035.93]},"properties":{"VAL": 0}},
{"type":"Feature","id":18,"geometry":{"type":"Point","coordinates":[413484.512,240400.36]},"properties":{"VAL": 0}},
{"type":"Feature","id":19,"geometry":{"type":"Point","coordinates":[421494.721,237825.309]},"properties":{"VAL": 0}},
{"type":"Feature","id":20,"geometry":{"type":"Point","coordinates":[414414.582,231926.491]},"properties":{"VAL": 0}},
{"type":"Feature","id":21,"geometry":{"type":"Point","coordinates":[409602.213,239938.622]},"properties":{"VAL": 0}},
{"type":"Feature","id":22,"geometry":{"type":"Point","coordinates":[416413.252,230336.558]},"properties":{"VAL": 0}},
{"type":"Feature","id":23,"geometry":{"type":"Point","coordinates":[421033.521,241007.096]},"properties":{"VAL": 0}},
{"type":"Feature","id":24,"geometry":{"type":"Point","coordinates":[421201.088,240344.49]},"properties":{"VAL": 0}},
{"type":"Feature","id":25,"geometry":{"type":"Point","coordinates":[413362.862,238756.486]},"properties":{"VAL": 0}},
{"type":"Feature","id":26,"geometry":{"type":"Point","coordinates":[409363.873,230213.324]},"properties":{"VAL": 0}},
{"type":"Feature","id":27,"geometry":{"type":"Point","coordinates":[409766.582,236591.272]},"properties":{"VAL": 0}},
{"type":"Feature","id":28,"geometry":{"type":"Point","coordinates":[409757.122,236597.325]},"properties":{"VAL": 0}},
{"type":"Feature","id":29,"geometry":{"type":"Point","coordinates":[416278.696,230091.74]},"properties":{"VAL": 0}},
{"type":"Feature","id":30,"geometry":{"type":"Point","coordinates":[413609.284,240704.867]},"properties":{"VAL": 0}},
{"type":"Feature","id":31,"geometry":{"type":"Point","coordinates":[414435.233,233056.778]},"properties":{"VAL": 0}},
{"type":"Feature","id":32,"geometry":{"type":"Point","coordinates":[412727.404,240476.451]},"properties":{"VAL": 0}},
{"type":"Feature","id":33,"geometry":{"type":"Point","coordinates":[412313.4788,231569.2642]},"properties":{"VAL": 0}},
{"type":"Feature","id":34,"geometry":{"type":"Point","coordinates":[411884.4232,232243.4945]},"properties":{"VAL": 0}},
{"type":"Feature","id":35,"geometry":{"type":"Point","coordinates":[411820.2108,230813.309]},"properties":{"VAL": 0}},
{"type":"Feature","id":36,"geometry":{"type":"Point","coordinates":[412360.1788,231604.2891]},"properties":{"VAL": 0}},
{"type":"Feature","id":37,"geometry":{"type":"Point","coordinates":[411204.3555,231551.7517]},"properties":{"VAL": 0}},
{"type":"Feature","id":38,"geometry":{"type":"Point","coordinates":[410474.669,231262.7959]},"properties":{"VAL": 0}},
{"type":"Feature","id":39,"geometry":{"type":"Point","coordinates":[410241.1694,231195.6647]},"properties":{"VAL": 0}},
{"type":"Feature","id":40,"geometry":{"type":"Point","coordinates":[410527.2064,231081.8337]},"properties":{"VAL": 0}},
{"type":"Feature","id":41,"geometry":{"type":"Point","coordinates":[410214.9007,231837.7888]},"properties":{"VAL": 0}},
{"type":"Feature","id":42,"geometry":{"type":"Point","coordinates":[411218.9492,232529.5315]},"properties":{"VAL": 0}},
{"type":"Feature","id":43,"geometry":{"type":"Point","coordinates":[410171.1195,230197.4537]},"properties":{"VAL": 0}},
{"type":"Feature","id":44,"geometry":{"type":"Point","coordinates":[408583.3218,230903.7902]},"properties":{"VAL": 0}},
{"type":"Feature","id":45,"geometry":{"type":"Point","coordinates":[409237.1208,231277.3896]},"properties":{"VAL": 0}},
{"type":"Feature","id":46,"geometry":{"type":"Point","coordinates":[409108.696,228621.331]},"properties":{"VAL": 0}},
{"type":"Feature","id":47,"geometry":{"type":"Point","coordinates":[410031.0197,228825.6432]},"properties":{"VAL": 0}},
{"type":"Feature","id":48,"geometry":{"type":"Point","coordinates":[411186.843,229070.8178]},"properties":{"VAL": 0}},
{"type":"Feature","id":49,"geometry":{"type":"Point","coordinates":[410188.6319,228335.2939]},"properties":{"VAL": 0}},
{"type":"Feature","id":50,"geometry":{"type":"Point","coordinates":[408273.9347,228778.9433]},"properties":{"VAL": 0}}
]};

var chartDatas2 =  {
		'type': 'FeatureCollection',
		'features': [
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[413775.9254,240594.4325]},"properties":{"2010": 32,"2000":10,"1995":30,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[414962.5457,232305.4618]},"properties":{"2010": 33,"2000":10,"1995":10,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[416350.1582,229966.6842]},"properties":{"2010": 34,"2000":10,"1995":10,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[415081.0071,231875.3088]},"properties":{"2010": 35,"2000":10,"1995":30,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[415121.7682,233035.9304]},"properties":{"2010": 36,"2000":10,"1995":50,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[413484.5117,240400.3598]},"properties":{"2010": 37,"2000":10,"1995":70,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[421494.7211,237825.3091]},"properties":{"2010": 38,"2000":10,"1995":90,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[414414.5817,231926.4912]},"properties":{"2010": 39,"2000":10,"1995":30,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[409602.2127,239938.6219]},"properties":{"2010": 40,"2000":10,"1995":10,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[416413.2522,230336.5581]},"properties":{"2010": 41,"2000":10,"1995":10,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[421033.5209,241007.0958]},"properties":{"2010": 42,"2000":10,"1995":30,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[421201.0877,240344.4904]},"properties":{"2010": 43,"2000":10,"1995":50,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[413362.8621,238756.4857]},"properties":{"2010": 44,"2000":10,"1995":70,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[409363.8733,230213.3242]},"properties":{"2010": 45,"2000":10,"1995":90,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[409766.5815,236591.2723]},"properties":{"2010": 46,"2000":10,"1995":30,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[409757.1216,236597.3246]},"properties":{"2010": 47,"2000":10,"1995":10,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[416278.6962,230091.7402]},"properties":{"2010": 48,"2000":10,"1995":10,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[413609.2836,240704.8672]},"properties":{"2010": 49,"2000":10,"1995":30,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[414435.2329,233056.7781]},"properties":{"2010": 50,"2000":10,"1995":50,"1990":20}},
	{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[412727.4039,240476.4512]},"properties":{"2010": 51,"2000":10,"1995":70,"1990":20}}
	]};



/*
var chartDatas =  {
	'type': 'FeatureCollection',
	'features': [
				{"type":"Feature","id":1,"geometry":{"type":"Point","coordinates":[420547.6379,226790.5001]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3117055000,"HJD_NAM":"전하1동","COUNT":1, "VAL": 0}},
				{"type":"Feature","id":2,"geometry":{"type":"Point","coordinates":[410978.7675,232033.4831]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111054000,"HJD_NAM":"복산1동","COUNT":10, "VAL": 100}},
				{"type":"Feature","id":3,"geometry":{"type":"Point","coordinates":[414096.5089,227675.6401]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114067000,"HJD_NAM":"야음장생포동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":4,"geometry":{"type":"Point","coordinates":[410309.1741,227557.6018]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114063500,"HJD_NAM":"수암동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":5,"geometry":{"type":"Point","coordinates":[411249.0761,232361.6501]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111055000,"HJD_NAM":"복산2동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":6,"geometry":{"type":"Point","coordinates":[390328.8372,228274.4255]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171039000,"HJD_NAM":"삼남면","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":7,"geometry":{"type":"Point","coordinates":[404213.3409,229442.3693]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114059500,"HJD_NAM":"무거동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":8,"geometry":{"type":"Point","coordinates":[394191.43,243373.5411]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171037000,"HJD_NAM":"두서면","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":9,"geometry":{"type":"Point","coordinates":[385580.4226,234456.3147]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171038000,"HJD_NAM":"상북면","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":10,"geometry":{"type":"Point","coordinates":[410237.1751,210183.6417]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171031000,"HJD_NAM":"서생면","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":11,"geometry":{"type":"Point","coordinates":[399294.5589,220565.165]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171034000,"HJD_NAM":"웅촌면","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":12,"geometry":{"type":"Point","coordinates":[404924.4994,215879.8551]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171025600,"HJD_NAM":"온양읍","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":13,"geometry":{"type":"Point","coordinates":[395451.2767,225270.0466]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171040000,"HJD_NAM":"삼동면","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":14,"geometry":{"type":"Point","coordinates":[410384.8152,231007.9377]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111058500,"HJD_NAM":"중앙동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":15,"geometry":{"type":"Point","coordinates":[408083.8762,231708.8443]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111060000,"HJD_NAM":"태화동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":16,"geometry":{"type":"Point","coordinates":[411661.1646,231158.478]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111051000,"HJD_NAM":"학성동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":17,"geometry":{"type":"Point","coordinates":[406102.3425,232693.6636]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111061000,"HJD_NAM":"다운동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":18,"geometry":{"type":"Point","coordinates":[415274.1447,230054.6781]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3120056000,"HJD_NAM":"효문동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":19,"geometry":{"type":"Point","coordinates":[407177.8699,228361.5036]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114060000,"HJD_NAM":"옥동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":20,"geometry":{"type":"Point","coordinates":[412094.6278,231944.2259]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111053000,"HJD_NAM":"반구2동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":21,"geometry":{"type":"Point","coordinates":[412712.483,232413.8649]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111062000,"HJD_NAM":"병영1동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":22,"geometry":{"type":"Point","coordinates":[406110.5173,223996.1253]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171033000,"HJD_NAM":"청량면","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":23,"geometry":{"type":"Point","coordinates":[395167.3075,232656.8482]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171025300,"HJD_NAM":"언양읍","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":24,"geometry":{"type":"Point","coordinates":[412691.596,231204.6729]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111052000,"HJD_NAM":"반구1동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":25,"geometry":{"type":"Point","coordinates":[414631.2143,240470.3773]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3120051000,"HJD_NAM":"농소1동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":26,"geometry":{"type":"Point","coordinates":[413095.0121,242725.3041]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3120052000,"HJD_NAM":"농소2동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":27,"geometry":{"type":"Point","coordinates":[419121.4493,225869.0999]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3117054000,"HJD_NAM":"대송동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":28,"geometry":{"type":"Point","coordinates":[420593.2148,230986.6261]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3117060000,"HJD_NAM":"남목3동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":29,"geometry":{"type":"Point","coordinates":[419586.3442,228298.097]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3117059000,"HJD_NAM":"남목2동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":30,"geometry":{"type":"Point","coordinates":[420753.1091,224221.2015]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3117052000,"HJD_NAM":"일산동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":31,"geometry":{"type":"Point","coordinates":[417503.6982,227520.7076]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3120059000,"HJD_NAM":"염포동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":32,"geometry":{"type":"Point","coordinates":[420002.7629,226335.0392]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3117056000,"HJD_NAM":"전하2동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":33,"geometry":{"type":"Point","coordinates":[406548.5999,230493.7609]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114058500,"HJD_NAM":"삼호동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":34,"geometry":{"type":"Point","coordinates":[403468.3273,235494.3971]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171025900,"HJD_NAM":"범서읍","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":35,"geometry":{"type":"Point","coordinates":[399631.0789,244536.3495]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171036000,"HJD_NAM":"두동면","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":36,"geometry":{"type":"Point","coordinates":[409506.8383,231968.7269]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111059000,"HJD_NAM":"우정동","COUNT":1, "VAL": 100}},				
				{"type":"Feature","id":38,"geometry":{"type":"Point","coordinates":[418874.0394,223311.0981]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3117051000,"HJD_NAM":"방어동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":39,"geometry":{"type":"Point","coordinates":[419545.5915,224677.8024]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3117053000,"HJD_NAM":"화정동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":40,"geometry":{"type":"Point","coordinates":[413106.8719,223971.2295]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114064000,"HJD_NAM":"선암동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":41,"geometry":{"type":"Point","coordinates":[408918.8112,230028.9328]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114051000,"HJD_NAM":"신정1동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":42,"geometry":{"type":"Point","coordinates":[411270.6144,233538.5455]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111064000,"HJD_NAM":"약사동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":43,"geometry":{"type":"Point","coordinates":[419072.4978,229763.0365]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3117058000,"HJD_NAM":"남목1동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":44,"geometry":{"type":"Point","coordinates":[409863.0122,229983.7148]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114053000,"HJD_NAM":"신정3동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":45,"geometry":{"type":"Point","coordinates":[412495.9145,229675.6018]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114057000,"HJD_NAM":"삼산동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":46,"geometry":{"type":"Point","coordinates":[411138.4891,227953.9517]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114062500,"HJD_NAM":"대현동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":47,"geometry":{"type":"Point","coordinates":[408862.8987,228139.2013]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114052000,"HJD_NAM":"신정2동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":48,"geometry":{"type":"Point","coordinates":[410274.6936,239031.6125]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3120053000,"HJD_NAM":"농소3동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":49,"geometry":{"type":"Point","coordinates":[416935.6283,231220.4442]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3120058000,"HJD_NAM":"양정동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":50,"geometry":{"type":"Point","coordinates":[411469.0677,217288.0806]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3171025000,"HJD_NAM":"온산읍","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":51,"geometry":{"type":"Point","coordinates":[419071.3461,237507.0464]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3120054000,"HJD_NAM":"강동동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":52,"geometry":{"type":"Point","coordinates":[415178.4268,236209.8876]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3120057000,"HJD_NAM":"송정동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":53,"geometry":{"type":"Point","coordinates":[411859.5491,234834.2663]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3111063000,"HJD_NAM":"병영2동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":54,"geometry":{"type":"Point","coordinates":[410578.0196,229071.7476]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114056000,"HJD_NAM":"달동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":55,"geometry":{"type":"Point","coordinates":[410032.5274,228174.5919]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114054000,"HJD_NAM":"신정4동","COUNT":1, "VAL": 100}},
				{"type":"Feature","id":56,"geometry":{"type":"Point","coordinates":[410504.784,230057.6051]},"properties":{"FTR_CDE":"UC300","HJD_CDE":3114055000,"HJD_NAM":"신정5동","COUNT":1, "VAL": 100}}
	]
} ;
*/
//****************************************************************

