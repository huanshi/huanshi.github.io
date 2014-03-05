
/* global define, alert, document */

define(function (require, exports, module) {
    var membersContent = require( "text!../content/member.json" ),
        members = JSON.parse( membersContent ),
        Mustache = require("lib/mustache"),
        tileTemplate = require("text!../template/memberTile.html"),
        waiterTemplate = require( "text!../template/waiterThumb.html" );
    
    /*
     * show all member information
     */
    function displayAllMember() {
        var teamContainer = document.getElementById( "team" ),
            index = 0,
            memberDiv = null,
            leftContainer = null,
            rightContainer = null;
        
        leftContainer = document.createElement( "div" );
        leftContainer.className = "left";
        rightContainer = document.createElement( "div" );
        rightContainer.className = "right";
        
        
        // create member tile with name
        for ( index = 0; index < members.length; index++ ) {
            memberDiv = document.createElement( "div" );
            memberDiv.innerHTML = Mustache.render( tileTemplate, {
                "name": members[index].name,
                "dream": members[index].dream,
                "headImg": members[index].headImg
            } );
            if ( index % 2 === 0 ) {
                leftContainer.appendChild( memberDiv );
            } else {
                rightContainer.appendChild( memberDiv );
            }
        }
        
        teamContainer.appendChild( leftContainer );
        teamContainer.appendChild( rightContainer );
    }
    
    function welcome() {
        var teamContainer = document.getElementById( "team" ),
            displayDiv = document.createElement( "div" ),
            triangleDiv = document.createElement( "div" ),
            waiterDiv = document.createElement( "div" ),
            displayContent = "欢迎进入幻实Family！ 我是今天的接待：小林，很高兴能为展示我们团队！ 团队成立于2012" +
                            "年底，秉承成就幻想，缔造真实的理念，逐步组建成现在的大家庭。家庭成员来自四面八方，" +
                            "不同的专业，不同的学校，但都热衷于技术。更多信息有待你的进一步了解，有什么需要请猛戳我!",
            timer;
        
        displayDiv.className = "welcomeText shadow";
        teamContainer.appendChild( displayDiv );
        
        triangleDiv.className = "triangle dialogBoxTrianglePos";
        teamContainer.appendChild( triangleDiv );
        
        waiterDiv.innerHTML = Mustache.render( waiterTemplate, {
            "url": members[5].headImg
        } )
        teamContainer.appendChild(waiterDiv);
        
//        waiterDiv.getElementsByTagName("img").addEventListener();
        
        timer = setInterval( function () {
            if ( displayDiv.innerHTML.length < displayContent.length ) {
                displayDiv.innerHTML = displayDiv.innerHTML + 
                    displayContent.substr(displayDiv.innerHTML.length, 1);
            } else {
                clearInterval(timer);
            }
        }, 200);
    }
    
    
    welcome();
} );