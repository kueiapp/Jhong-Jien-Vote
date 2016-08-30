// Get area data
	var label = '<div class="row" style="margin-top: 6px"><label class="label label-success">直轄市</label></div>';
    $("div#area div.content").append(label);
    handleArea( getArea('53c0202e-ed38-44bb-8e78-5460acb5b862') );  //直轄市
                                                                    //空字串則回傳選舉類別
    label = '<div class="row" style="margin-top: 6px"><label class="label label-success">縣市長</label></div>';
    $("div#area div.content").append(label);
    handleArea( getArea('53c0202f-cfc8-4ab5-a63b-5460acb5b862') );  //縣市長

// Select an area
    $("div#area div.content a").click(function(){
        console.log("click");
        $("div#area div.content button").removeClass("btn-info").addClass("btn-default");
        $(this).toggleClass("btn-default");
        $(this).toggleClass("btn-info");
        $.cookie("area", $(this).attr("id"));
        $("#areaTitle").text( $(this).text() );
        
        candidates = getCandidates( $.cookie("area") );
        handleCandidates( candidates );
    });
    
    candidates = [];
// Get candidates info. in an area
    $("a#tabCandidate").click(function(){
        candidates = getCandidates( $.cookie("area") );
        handleCandidates( candidates );
    });
    
// Pickup announcements
    $(document).on("click", "div#candidate div.content tr", function(e){
        e.preventDefault();
        //$(this).toggleClass("btn-default");
        $(this).toggleClass("info");

    });
    
    validCandidates = [];
// Compute the results
    $("#tabSubmit").click(function(){
        validCandidates = [];
        for (var i in candidates){
            var obj  = candidates[i].Candidate;
            if (obj.stage === "1"){ //已登記參選
                //console.log(obj.name);
                validCandidates.push({"id": obj.id, "name": obj.name, "links": obj.links, "count": 0, "avg": 0});
            }
        }
    // Check num of selected buttons
        $("div#candidate div.content table tr").each(function(key, val){
            if ( $(val).hasClass("info") ){
                var id = $(val).attr('tabindex');
                for (var i in validCandidates){
                    var obj = validCandidates[i]; 
                    //console.log('id: '+ id, obj.id);                   
                    if ( id == obj.id){
                        var count = parseInt(obj.count);
                        validCandidates[i].count = count+1;
                        //console.log('count: '+ validCandidates[i].count);
                    }
                }
            }
            else{
                console.log(key," not picked up");
            }
        });
        //console.log('validCandidates: '+ JSON.stringify(validCandidates) );
    // Calculation
        var total = 0;
        for (var i in validCandidates){
            var obj = validCandidates[i]; 
            total += obj.count;         
        }
    // Append UI
        for (var i in validCandidates){
            var obj = validCandidates[i];
            //console.log(obj.count+", "+total);
            validCandidates[i].avg = obj.count / total;
            var linksArr = null;
            linksArr = obj.links.split("\\n");
            var theLink = "#";

            if (linksArr !== null){
                var str = $.trim(linksArr[0]);
                var start = str.indexOf("http");
                theLink = str.substring(start, str.length) ;
                
            }
            $("#profile div.content").append('<div class="well col-lg-4 card">\
                <h3>'+ obj.name +' '+ Math.floor( parseFloat(obj.avg)*100) +' %</h3>\
                <h4><a href="'+ theLink +'" target="_blank">競選網站</a></h4>\
                <h4><a href="http://gcis.nat.g0v.tw/name/'+ obj.name +'" target="_blank">投資公司資料</a></h4>\
                <h4><a href="http://sunshine.cy.g0v.tw/people/'+ obj.name +'/property/overview/" target="_blank">財產申報資料</a></h4>\
                <h4><a href="http://foundations.olc.tw/directors/index/'+ obj.name +'" target="_blank">相關法人資料</a></h4></div>');
        }
        
    });

// Startover
    $(document).on("click", "#startOver", function(){      
        $("#profile div.content").empty();
        $("div#candidate div.content").empty();
    });
   