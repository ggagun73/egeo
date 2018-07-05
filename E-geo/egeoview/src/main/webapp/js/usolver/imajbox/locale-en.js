(function(jQuery) {
	jQuery.imajnet = {
		"oldSiteMessage" : "Due to Google decision to stop Google Maps v2 services, we are not able to give you access to the app.imajnet.net application.\nWe suggest that you migrate to the most recent application on web.imajnet.net.\nThis new app has been validated on many browsers, however, if you experience any problem, please report it at support.imajnet@imajing.fr with your problem description and the exact browser version you are using.\n\nWe wish you a good navigation,\n\nImajing team",
		"noFullAccessMessage" : " Your imajnet subscription type does not allow you to access this application. A full subscription is required.",
		"imajnetNotAvailable" : "Imajnet not available",
		"map" : {
			"OSM" : "Open Street Map",
			"OSMMapnik" : "OSM Mapnik",
			"OCM" : "Open Cycle Map",
			"OTM" : "Transportation Map",
			"bingRoad" : "Bing road",
			"bingAerial" : "Bing satellite",
			"bingAerialWithLabels" : "Bing hybrid",
			"LRSStart" : "Start",
			"LRSEnd" : "End",
			"LRSLoading" : "Loading LRS...",
			"popupSearchAddress" : {
				"title" : "Search address",
				"longitude" : "Longitude",
				"latitude" : "Latitude",
				"buttonSearchName" : "Search",
				"noResultsFound" : "No results found",
				"error" : "Error searching address",
				"spectrumStreet" : "Street",
				"spectrumCity" : "City",
				"spectrumCountry" : "Country"
			},
			"popupSearchLRS" : {
				"title" : "Search referential",
				"type" : "LRS Type",
				"typeAny" : "Any",
				"typeRoad" : "Road",
				"typeTrain" : "Train",
				"typeBoat" : "Boat",
				"search" : "Search ",
				"roadInputPlaceholder" : "Type road name",
				"moreResults" : "Some results are not showing"
			},
			"surveyTrace" : {
				"distance" : "Distance",
				"meters" : "meters",
				"date" : "Date"
			},
			"position" : {
				"title" : "Position objects",
				"step" : "Step",
				"step1Content" : "Click on the object",
				"step2Content" : "Click again on the same object",
				"step3Content" : "3D positioning done",
				"errorPosition" : "Unable to position object!"
			},
			"measurement" : {
				"title" : "Measure",
				"step" : "Step",
				"step1Content" : "Click at both ends on the object",
				"step2Content" : "Click again at both ends on the same object",
				"step3Content" : "Measurement done",
				"errorMeasurement" : "Unable to measure!"
			},
			"polyligne" : {
				"title" : "Draw polyline",
				"step" : "Step",
				"step1Content" : "Click on the object",
				"step2Content" : "Click again on the same object",
				"step3Content" : "Click me when done",
				"errorPosition" : "Unable to position object!"
			},
			"polygon" : {
				"title" : "Draw polygon",
				"step" : "Step",
				"step1Content" : "Click on the object",
				"step2Content" : "Click again on the same object",
				"step3Content" : "Click me when done",
				"errorPosition" : "Unable to position object!"
			},
			"clipboard" : {
				"titleItem" : {
					"polyligne" : "Polyline",
					"polygon" : "Polygon"
				},
				"notify" : {
					"title" : "Clipboard notification",
					"text" : "Object added to clipboard"
				},
				"enableClipboard" : "Show clipboard",
				"position3D" : "3D Position",
				"meters" : "Meters",
				"comment" : "Comment",
				"deleteItem" : "Delete item",
				"precisionRating" : "Position precision rating",
				"precisionUnknown" : "Position precision unknown",
				"doubleClick" : "Double click to edit comment",
				"imageTag" : "Image Tag",
				"clearButton" : "Clear",
				"exportButton" : "Export",
				"noItems" : "No items to show",
				"popupExport" : {
					"email" : "E-mail",
					"from" : "From",
					"to" : "To",
					"message" : "Message",
					"fileType" : "File type",
					"exportStatus" : "Export status",
					"exportProgress" : "Export in progress...",
					"exportComplete" : "Export complete",
					"exportError" : "Export error",
					"donwloadFile" : "Donwload file",
					"send" : "Send",
					"download" : "Download"
				}
			},
			"poi" : {
				"label" : "POI",
				"optionDefault" : "Choose"
			},
			"errors" : {
				"unableToNavigate" : "Unable to navigate",
				"noImajnetImageAtPosition" : "There are no images in the selected area",
				"noLRS" : "No LRS"
			},
			"customBaseLayers" : {
				"NAV_STREET" : "Naver street",
				"NAV_SATELLITE" : "Naver satellite",
				"NAV_HYBRID" : "Naver hybrid",
				"VWORLD_STREET" : "Vworld street",
				"VWORLD_SATELLITE" : "Vworld satellite",
				"VWORLD_HYBRID" : "Vworld hybrid"
			}
		},
		"timeframe" : {
			"title" : "Timeline",
			"active" : "Active",
			"from" : "From",
			"to" : "To",
			"reset" : "Reset"
		},
		"image" : {
			"zoomButton" : "Zoom",
			"switcher" : {
				"centerButtonTitle" : "Click to enlarge"
			},
			"save" : "Save image"
		},
		"settings" : {
			"settings" : "Settings",
			"LRSSettings" : "LRS settings",
			"display" : {
				"title" : "Display",
				"image" : "Image",
				"carto" : "Map",
				"showRoads" : "Show roads",
				"showPR" : "Show PRs",
				"showLabels" : "Show labels",
				"LRSShowCumulated" : "Show cumulated",
				"addressDisplayType" : {
					"title" : "Address detail level",
					"full" : "Full",
					"city" : "City"
				},
				"addressInLRS" : "Combine LRS and address"
			},
			"imageSectionTitle" : "Image",
			"imageQuality" : "Image quality",
			"imageQualityLow" : "Low",
			"imageQualityMedium" : "Medium",
			"imageQualityHigh" : "High",
			"surveyTrace" : "Survey trace",
			"surveyTraceLow" : "10m",
			"surveyTraceHight" : "100m",
			"imageSwitcher" : "Image  Switcher",
			"imageSwitcherLow" : "0m",
			"imageSwitcherHight" : "20m",
			"imageOptions" : {
				"title" : "Priority/image retrieval options",
				"CLOSEST" : "Closest",
				"NEWEST" : "Newest",
				"BEST" : "Best"
			},
			"mapSectionTitle" : "Map",
			"orientedImages" : "Oriented images",
			"orientedImagesLow" : "10m",
			"orientedImagesHight" : "150m",
			"projectionSectionTitle" : "Projection",
			"projection" : "Visible objects",
			"projectionLow" : "10m",
			"projectionHigh" : "100m",
			"units" : {
				"title" : "Units",
				"unit" : "Unit",
				"m" : "meters",
				"feet" : "Feet"
			},
			"resetDefaultButton" : "Reset to default",
			"saveSettingsButton" : "Save",
			"LRS" : {
				"title" : "Referential",
				"search" : "Search",
				"referential" : "Referential",
				"road" : "Road",
				"train" : "Railway",
				"relativePoint" : {
					"1" : "Milestone",
					"2" : "KM",
					"label" : "Relative point label"
				},
				"relativeAbscisa" : {
					"1" : "Distance",
					"2" : "Relative Dist.",
					"label" : "Relative abscisa label"
				},
				"cumulatedAbscisa" : {
					"1" : "Total distance",
					"2" : "Cumulated dist.",
					"label" : "Cumulated abscisa label"
				}
			}
		},
		"button" : {
			"search" : "Search",
			"ok" : "Ok",
			"close" : "Close",
			"cancel" : "Cancel",
			"yes" : "Yes",
			"no" : "No",
			"nextImage" : "Next image",
			"previousImage" : "Previous image",
			"closestImage" : "Closest image",
			"clickMode" : "Click mode",
			"enableImajnet" : "Imajnet plugin"
		},
		"login" : {
			"title" : "Login",
			"username" : "Username",
			"password" : "Password",
			"rememberMe" : "Don't ask for my password for 2 weeks",
			"error" : {
				"unknown" : "Error",
				"forbidden" : "Not enough permission to see this page",
				"movedTemporarily" : "Moved temporarily",
				"serviceUnavailable" : "Application is down for maintenance. Please check again later.",
				"noInternetConnection" : "No internet connection",
				"unableToConnect" : "Unable to connect to server",
				"sessionExpired" : "Session expired",
				"header" : {
					"unauthenticated" : "Invalid username or password",
					"unauthorized" : "Unauthorized access! Your username/password are currently in use and have reached the maximum number of simultaneous connections.",
					"accountLocked" : "Unauthorized access! Account locked.",
					"accountDisabled" : "Unauthorized access! Account disabled.",
					"accountExpierd" : "Unauthorized access! Account expired.",
					"credentialsExpired" : "Unauthorized access! Credentials expired.",
					"invalidApplicationKey" : "Unauthorized access! This application is not authorized to connect to Imajnet.",
					"invalidSessionType" : "Unauthorized access! An invalid session type was requested to Imajnet.",
					"unauthorizedSessionType" : "Unauthorized access! You are not authorized to open a session of the requested type."
				}
			},
			"button" : "Login",
			"requestAccess" : {
				"title" : "Request access",
				"text" : "Please contact us at info&#64;imajing.eu"
			},
			"forgotPassword" : {
				"title" : "Forgot password"
			}
		},
		"help" : "<h3>Navigation</h3> <b>Map</b> - the position on the map can be changed by clicking different locations. By zooming and panning the map, one can navigate to the desired location.<br/><b>Image</b> - by using the mouse scroll wheel or the integrated buttons, one can move to the next/previous image.<br/><img id=\"helpImajnetTraceImage\" height=\"24\" width=\"24\" align=\"left\" border=\"0\" /><b>Survey trace</b> - jump to the desired image.<br/><h3>Click mode</h3> <img id=\"helpImajnetClosestModeImage\" height=\"24\" width=\"24\" align=\"left\" border=\"0\" /><b>Click to position</b> - in this mode the camera is positioned on the closest image to the clicked coordinates.<br/><img id=\"helpImajnetClickModeImage\" height=\"24\" width=\"24\" align=\"left\" border=\"0\" /><b>Click to view</b> - in this mode, the camera is positioned on the best image that is looking towards the clicked object.<br/>\t\t\t<h3>Search</h3> <b>Address</b> - Search by address.<br/><b>Referential system</b> - LRS Search.<br/><h3>Timeline</h3> Imajnet data is indexed by time. This means that the images and cartographic data can be filtered by time periods.<br/>",
		"downloadDocument" : "Download user guide",
		"aboutImajnet" : "Imajnet is an interactive web service delivering geospatial data and ground level imagery.<br/>Imajnet is available via a web browser, but also in GIS through plugins for ArcGIS, Geomedia and QGIS. Imajnet can also be integrated in existing vertical web or desktop applications ",
		"link" : "www.imajing.eu",
		"version" : "Version",
		"buildDate" : "Build date",
		"productOf" : "Imajnet&#174; is designed and published by imajing s.a.s, France",
		"loading" : "Loading...",
		"menuHelp" : "Help",
		"menuAboutImajnet" : "About",
		"menuNews" : "News",
		"noNews" : "No news",
		"menuSettings" : "Settings",
		"LRSSettings" : "LRS Settings",
		"management" : {
			"title" : "Management",
			"sequenceDetails" : "Sequence details",
			"reimportSequence" : {
				"title" : "Re-import sequence",
				"confirmMessage" : "Are you sure you wish to re-import the sequence?"
			},
			"deleteSequence" : {
				"title" : "Delete sequence",
				"confirmMessage" : "Are you sure you wish to delete the sequence?"
			},
			"createPOI" : "Create POI",
			"groundPlaneDetails" : "Ground plane details"
		},
		"popupSequenceDetails" : {
			"title" : "Sequence details",
			"name" : "Name",
			"project" : "Project",
			"operator" : "Operator",
			"repository" : "Repository",
			"location" : "Location"
		},
		"poi" : {
			"label" : "Points of interest"
		},
		"address" : {
			"label" : "Address"
		},
		"security" : {
			"logout" : "Logout",
			"sessionExpired" : "Your session has expired."
		},
		"dateTime" : {
			"month1" : "january",
			"month2" : "february",
			"month3" : "march",
			"month4" : "april",
			"month5" : "may",
			"month6" : "june",
			"month7" : "july",
			"month8" : "august",
			"month9" : "september",
			"month10" : "october",
			"month11" : "november",
			"month12" : "december",
			"day1Min" : "Su",
			"day2Min" : "Mo",
			"day3Min" : "Tw",
			"day4Min" : "We",
			"day5Min" : "Th",
			"day6Min" : "Fr",
			"day7Min" : "Sa",
			"timeText" : "Time",
			"hourText" : "Hour",
			"minuteText" : "Minute",
			"currentText" : "Now",
			"closeText" : "Ok"
		},
		"units" : {
			"m" : "m",
			"feet" : "feet"
		},
		"locale" : {
			"en" : "English",
			"fr" : "Français",
			"es" : "Español"
		}
	};
})(jQuery);