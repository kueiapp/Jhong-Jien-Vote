/**
* author: Kuei App
* date: 2014-11-19
**/

function getArea(id)
{
    id = id || ""; // javascript pre-assign value for parameter 
    
	var arr = [];
	
	$.ajax({
        url: "proxy.php?act=area&typeid="+id,
        type: "GET",
        datatype: "json",
        async: false,
        success: function(response){
            //console.log(response);//DEBUG
            arr = jQuery.parseJSON(response);
            
            
        },
        error: function( jqXHR, textStatus, errorThrown ){
            var arr = jQuery.parseJSON(jqXHR);
            console.log('err: '+arr);
        }
    });
    
    return arr;
}

function handleArea(areaArr)
{
    for (var i in areaArr){
        var obj = areaArr[i].Election;
        var area = areaArr[i].Area;
        var finalLevel = 0;
        if (area.length == 0){
            finalLevel = 0;
        }
        else{
            finalLevel = 1;
        }
        var btn = '<a href="#candidate" id="'+obj.id+'" tabindex="'+finalLevel
        +'" class="btn btn-lg btn-default block tabCandidate" data-toggle="tab" >'+obj.name+'</a>';
        //console.log(btn);
        $("div#area div.content").append(btn);
    }
    //alert(areaArr);
}

function getCandidates(areaid)
{
    var arr = [];
	console.log('get candidates: '+ areaid);
	$.ajax({
        url: "proxy.php?act=men&areaid="+areaid,
        type: "GET",
        datatype: "json",
        async: false,
        success: function(response){
            //console.log(response);//DEBUG
            arr = jQuery.parseJSON(response);
            
            
        },
        error: function( jqXHR, textStatus, errorThrown ){
            var arr = jQuery.parseJSON(jqXHR);
            console.log('err: '+arr);
        }
    });
    
    return arr;
}
function handleCandidates(areaArr)
{
    var alert = '<div class="col-lg-12" style="margin:8px 0;">';
    var table = '<table class="table table-striped table-hover ">'
    for (var i in areaArr){
        var obj = areaArr[i].Candidate;
        //console.log('candidateobj: '+ JSON.stringify(obj));
        if (obj.stage === "1"){ //已登記參選
            //console.log('id: '+ obj.id);
            //console.log('name: '+ obj.name);
            //console.log('announcement: '+ obj.platform);
            var tmpArr = obj.platform.split("\\n");	            
            var tmp2 = []; //deliminate data without values
            for (var i in tmpArr){
                if (tmpArr[i] != "\\n" && tmpArr[i] != ""){
                    tmp2.push(tmpArr[i]);
                    //var btn = '<button tabindex="'+obj.id+'" class="btn btn-lg btn-default block">'+tmpArr[i]+'</button>';
                    table += '<tr tabindex="'+obj.id+'"><td>'+tmpArr[i]+'</td>\
                    <td><img src="images/ic_check_black_24dp.png" />Pickup</td></tr>';
                    //$("div#candidate div.content").append(btn);
                }
            }
            // display num of announcements for a candidate
            var parag = '<label class="label label-success" style="margin: 5px; display:inline-block;">'+obj.name+' '+tmp2.length+' 筆</label>';
            alert += parag;
        }
    }
    alert += "</div>";
    $("div#candidate div.content").prepend(alert);

    $("div#candidate div.content").append(table);
}

