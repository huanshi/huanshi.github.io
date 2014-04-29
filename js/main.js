
/* global define, alert, document, setInterval, clearInterval */

define(function (require, exports, module) {
    var membersContent = require( "text!../content/member.json" ),
        members = JSON.parse( membersContent ),
        activityContent = require( "text!../content/activity.json" ),
        activities = JSON.parse( activityContent ),
        Mustache = require("lib/mustache"),
        tileTemplate = require("text!../template/memberTile.html"),
        waiterTemplate = require( "text!../template/waiterThumb.html" ),
        activityTemplate = require( "text!../template/activity.html" ),
        Q = require( "lib/q.min" ),
        waiterDiv = null;
    
    /*
     * show all member information
     */
    function displayAllMember() {
        var teamContainer = document.getElementById( "team" ),
            index = 0,
            memberDiv = null;
        
        // create member tile with name
        for ( index = 0; index < members.length; index++ ) {
            memberDiv = document.createElement( "div" );
            memberDiv.innerHTML = Mustache.render( tileTemplate, {
                name: members[index].name,
                github: members[index].github,
                score: members[index].score,
                detail: members[index].description.join(),
                dream: members[index].dream,
                headImg: members[index].headImg
            } );
            
            if ( members[index].score.trim().length === 0 ) {
                memberDiv.getElementsByClassName( "scoreTag" )[0].style.display = "none";
            }

            var headImgClassName = memberDiv.getElementsByClassName( "headImg" )[0].className;
            if (index % 2 === 1){
                memberDiv.getElementsByClassName( "header" )[0].className = "header right";
            } else {
                memberDiv.getElementsByClassName( "header" )[0].className = "header left";
            }

            teamContainer.appendChild( memberDiv );
        }
    }
    
    /**
     * render all activities
     */
    function renderActivities() {
        var activityContainer = document.getElementById( "activity" ),
            activityDiv = null;
        
        activities = activities.reverse();
        activities.forEach( function( activity, index ) {
            activityDiv = document.createElement( "div" );
            activityDiv.innerHTML = Mustache.render( activityTemplate, {
                dateTime: activity.dateTime,
                AMName: activity.AMName,
                AMDetail: activity.AMDetail,
                PMName: activity.PMName,
                PMDetail: activity.PMDetail
            } );
            
            activityContainer.appendChild(activityDiv);
        } );
    }
    
    function clearTeamContainer() {
        var teamContainer = document.getElementById( "team" );
        while ( teamContainer.firstChild ) {
            teamContainer.removeChild(teamContainer.firstChild);
        }
    }
    
    function welcome() {
        var deferred = Q.defer(),
            teamContainer = document.getElementById( "team" ),
            displayDiv = document.createElement( "div" ),
            triangleDiv = document.createElement( "div" ),
            displayContent = "欢迎进入幻实Family！ 我是今天的接待：小林，很高兴能为展示我们团队！ 团队成立于2012" +
                            "年底，秉承成就幻想，缔造真实的理念，逐步组建成现在的大家庭。家庭成员来自四面八方，" +
                            "不同的专业，不同的学校，但都热衷于技术。更多信息有待你的进一步了解，有什么需要请猛戳我!",
            timer;
        
        waiterDiv = document.createElement( "div" );
        displayDiv.className = "welcomeText shadow";
        teamContainer.appendChild( displayDiv );

        triangleDiv.className = "triangle dialogBoxTrianglePos";
        teamContainer.appendChild( triangleDiv );

        waiterDiv.innerHTML = Mustache.render( waiterTemplate, {
            url: members[5].headImg
        } );
        teamContainer.appendChild(waiterDiv);


        timer = setInterval( function () {
            if ( displayDiv.innerHTML.length < displayContent.length ) {
                displayDiv.innerHTML = displayDiv.innerHTML + 
                    displayContent.substr(displayDiv.innerHTML.length, 1);
            } else {
                clearInterval(timer);
                deferred.resolve();
            }
        }, 100);
        
        waiterDiv.getElementsByTagName("img")[0].addEventListener('click', function () {
            clearTeamContainer();
            displayAllMember();
        } );
        
        return deferred.promise;
    }
    
    
    
    // welcome
    welcome().then( function() {
    } );
    
    renderActivities();
} );






