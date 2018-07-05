
//컨텍스트메뉴 : false
function onContextMenuEventHandler() {
	$(document)[0].oncontextmenu = function() {
		return false;
	}
}


/*
 * 문자열관련 함수
 */
//숫자 3자리마다 콤마(,) 입력
function setNumComma(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*
* 라인분할 관련 함수
*/
//주어진 polyline에 대한 분할점을 리턴
function getDividePoint(polyline, index, total, totalDistance)
{
	var halfDistance = totalDistance*(index/total);
	var sumDistance = 0.0;   
	var distance = 0.0;   
	var i;
	                   
	for(i = 0; i < polyline.paths[0].length - 1; i++)   
	{       
	   distance = getDistance(polyline.getPoint(0, i), polyline.getPoint(0, i+1));
	   if((sumDistance + distance) < halfDistance) 
	   {
	      sumDistance += distance;       
	   }
	   else
	   {
	      break;  
	   }
	}
	                   
	distance = halfDistance - sumDistance;                     
	return getCoordinate(polyline.getPoint(0, i), polyline.getPoint(0, i+1), distance);		
}

//주어진 거리에 해당하는 좌표점 리턴
function getCoordinate(startPoint, endPoint, queryDistance)
{
	var angle;
	var distance = getDistance(startPoint, endPoint);
	var coordX;
	var coordY;
	
  if((endPoint.x - startPoint.x >= 0) && (endPoint.y - startPoint.y >= 0))
  {
     angle = Math.asin((endPoint.y - startPoint.y) / distance);                            
     coordX = queryDistance * Math.cos(angle) + startPoint.x;
     coordY = queryDistance * Math.sin(angle) + startPoint.y; 
  }   
  else if((endPoint.x - startPoint.x < 0) && (endPoint.y - startPoint.y >= 0))
  {
     angle = Math.asin((startPoint.x - endPoint.x) / distance);                                                                
     coordX = startPoint.x - queryDistance * Math.sin(angle);
     coordY = queryDistance * Math.cos(angle) + startPoint.y; 
  }   
  else if((endPoint.x - startPoint.x <= 0) && (endPoint.y - startPoint.y < 0))
  {
     angle = Math.asin((startPoint.y - endPoint.y) / distance);                                  
     coordX = startPoint.x - queryDistance * Math.cos(angle);
     coordY = startPoint.y - queryDistance * Math.sin(angle); 
  }  
  else if((endPoint.x - startPoint.x > 0) && (endPoint.y - startPoint.y < 0)) 
  {
     angle = Math.asin((endPoint.x - startPoint.x) / distance);                                                                
     coordX = queryDistance * Math.sin(angle) + startPoint.x;
     coordY = startPoint.y - queryDistance * Math.cos(angle); 
  }
  
  return new esri.geometry.Point(coordX, coordY, startPoint.spatialReference); 
}

//주어진 점들을 통해 각도를 계산하여 리턴(isGeo가 true 지리적각도, false 수학적각도)
function getAngle(startPoint, endPoint, isGeo)
{	
	var	run = endPoint.x - startPoint.x;
	
	var rise =  endPoint.y - startPoint.y;
	
	var	angle = (180/Math.PI) * Math.atan2(run, rise);
	
	if(isGeo)
		angle = (180/Math.PI) * Math.atan2(run, rise);
	else
	{
		if(angle >= 0 && angle <= 90)
			angle = 90 - angle;
		else if(angle > 90 && angle <= 180)
			angle = 360-(angle-90);
		else
			angle = 90 - angle;
	}
		
	return angle;	
}


//polyline에 대한 전체길이를 리턴
function getPolylinePathLength(polyline)
{		
	var distance = 0.0; 

	for(var i = 0; i < polyline.paths[0].length - 1; i++)   
	{       
	   distance += getDistance(polyline.getPoint(0, i), polyline.getPoint(0, i + 1));   
	}                       
	return distance;
}

//주어진 점사이의 거리를 리턴
function getDistance(point1, point2)
{
  return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) + 
                   (point2.y - point1.y) * (point2.y - point1.y));                   
} 

//x, y좌표점의 차이를 매개변수로 해서 이동된 폴리곤 생성
function createMovePolygon(polygon, diffX, diffY)
{
	var rings = polygon.rings;
	var newRings = new Array();
	
	//특정값만큼 x, y축으로 이동 
	for(var i = 0; i < rings.length; i++)
	{
		newRings[i] =  new Array();
		
		for(var j = 0; j < rings[i].length; j++)
		{
			newRings[i][j] = new Array(2);
			
			newRings[i][j][0] = rings[i][j][0] + diffX;
			newRings[i][j][1] = rings[i][j][1] + diffY;			
		}                				
	}	
	
	var newPolygon = new esri.geometry.Polygon();
	newPolygon.addRing(newRings[0]);
	
	return newPolygon;
}

//주어진 폴리곤에 대해 주어진 각도만큼 회전
function rotatePolygon(polygon, rotationAngle)
{
	var rings = polygon.rings; 
	
	//주어진 각도 만큼 회전
	for(var i = 0; i < rings.length; i++)
	{
		for(var j = 0; j < rings[i].length; j++)
		{                    				
			var originX = rings[i][0][0];
			var originY = rings[i][0][1];
			var curX = rings[i][j][0];
			var curY = rings[i][j][1];
						
			var x = originX 
					+ ((curX - originX) * Math.cos(Math.PI/180 * rotationAngle) 
						- (curY - originY) * Math.sin(Math.PI/180 * rotationAngle));

           var y = originY 
           		+ ((curX - originX) * Math.sin(Math.PI/180 * rotationAngle) 
           			+ (curY - originY) * Math.cos(Math.PI/180 * rotationAngle));
           
           rings[i][j][0] = x;
           rings[i][j][1] = y;
		}                				
	}
}

//주어진 점을 기준으로 주어진 각도만큼 회전
function rotatePolygon2(polygon, rotationAngle, point)
{
	var rings = polygon.rings; 
	
	//주어진 각도 만큼 회전
	for(var i = 0; i < rings.length; i++)
	{
		for(var j = 0; j < rings[i].length; j++)
		{                    				
			var originX = point.x;
			var originY = point.y;
			var curX = rings[i][j][0];
			var curY = rings[i][j][1];
						
			var x = originX 
					+ ((curX - originX) * Math.cos(Math.PI/180 * rotationAngle) 
						- (curY - originY) * Math.sin(Math.PI/180 * rotationAngle));

           var y = originY 
           		+ ((curX - originX) * Math.sin(Math.PI/180 * rotationAngle) 
           			+ (curY - originY) * Math.cos(Math.PI/180 * rotationAngle));
           
           rings[i][j][0] = x;
           rings[i][j][1] = y;
		}                				
	}
}

//두 폴리라인간의 intersects
function intersectsPolyline(polyline1, polyline2)
{
	//var isIntersect = false;	
	var line1start = null;
	var line1end = null;
	var line2start = null;
	var line2end = null;
	
	var intersect_point = [];	
	
	
	//debugger;
	for(var i = 0; i < polyline1.paths[0].length - 1; i++)   
	{   
		var path = new Array();
		
		for(var j = 0; j < polyline2.paths[0].length - 1; j++)
		{
			line1start = polyline1.getPoint(0, i);
			line1end = polyline1.getPoint(0, i+1);
			
			line2start = polyline2.getPoint(0, j);
			line2end = polyline2.getPoint(0, j+1);
						
			if(intersectsLine(line1start, line1end, line2start, line2end))			
			{	
				
		        var point1 = new esri.geometry.Point(line1start,line1end);
		        var point2 = new esri.geometry.Point(line2start,line2end);

				//isIntersect = true;
				
				intersect_point.push(point1);
				intersect_point.push(point2);
				 
				return intersect_point;
			}			
		}
	}
	
	return intersect_point;	
}

//주어진 두개의 라인이 intersect되는지 검사
function getArea(PointA, PointB, PointC)
{
    return ((PointA.x * PointB.y) - (PointA.y * PointB.x)
              + (PointB.x * PointC.y) - (PointB.y * PointC.x)
              + (PointC.x * PointA.y) - (PointC.y * PointA.x) ) / 2;
}

function intersectsLine(line1start, line1end, line2start, line2end)
{
	var temp1 = getArea(line1start, line1end, line2start) * getArea(line1start, line1end, line2end);
	var temp2 = getArea(line2start, line2end, line1start) * getArea(line2start, line2end, line1end);
	
	if(temp1 <= 0 && temp2 <= 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

/*
* 날짜관련 함수
*/
//날짜를 문자열로 변환하여 리턴
function toTimeString(date) { 
   var year  = date.getFullYear();
   var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
   var day   = date.getDate();
   var hour  = date.getHours();
   var min   = date.getMinutes();

   if (("" + month).length == 1) { month = "0" + month; }
   if (("" + day).length   == 1) { day   = "0" + day;   }
   if (("" + hour).length  == 1) { hour  = "0" + hour;  }
   if (("" + min).length   == 1) { min   = "0" + min;   }

   return ("" + year + "-" + month + "-" + day + " " + hour + ":" + min);
}

//두날짜사이의기간리턴 edate - sdate  (sdate 보다 edate가 크면1 , 작으면-1 , 같으면0)
function compareIsPastDay(sdate, edate)
{ 
	if(edate - sdate < 0)
		return -1;
	else if(edate - sdate == 0)
		return 0 ;
	else
		return 1; 
} 