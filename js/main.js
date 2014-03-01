
/* global define, alert, document */

define(function (require, exports, module) {
    var membersContent = require( "text!../content/member.json" ),
        members = JSON.parse( membersContent ),
        Mustache = require("lib/mustache"),
        tileTemplate = require("text!../template/memberTile.html");
    
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
                "name": members[index].name
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
    
    
    displayAllMember();
} );