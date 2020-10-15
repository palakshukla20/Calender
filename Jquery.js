var eventData = [{"date": "2020-10-16", "tittle": "Event", "discription": "Discription"},
                 {"date": "2020-10-17", "tittle": "Event", "discription": "Discription"},
                 {"date": "2019-11-14", "tittle": "Event2", "discription": "Discription"},
                 {"date": "2020-12-14", "tittle": "Event2", "discription": "ssss" },
                 {"date": "2021-09-14", "tittle": "Event2", "discription": "Discription"},
                 {"date": "2020-08-14", "tittle": "Event2", "discription": "Discription"},
                 {"date": "2021-07-10", "tittle": "Event3", "discription": "ssss" },
                 {"date": "2020-11-11", "tittle": "Event4", "discription": "ssss" }]

$(document).ready(function() {
  allEvent();
  $('.dropdown, .year').on('change', allEvent);
  $('.previous, .next').on('click', allEvent);
  
  var template = document.getElementById("template").innerHTML; 
  $("#btn-2").click(function(){
    $("#myModal").modal()
  });

  $(".btn-add").click(function(){
    if ($('#text1').val().length != 0 && $('#text2').val().length != 0) {
      var event = {};
      event["date"] = $('#text1').val();
      event["tittle"] = $('#text2').val();
      event["discription"] = $('#text3').val();
      eventData.push(event);
      showEvent($('#text1').val());
      $('#text1, #text2, #text3').val("");
    } else {
      alert("Please Enter Date and Title");
    }
  });

  function allEvent() {
    for (var x in eventData) {
      var check = eventData[x].date;
      showEvent(check);
    }
  }

  function showEvent(temp) {
    if ($("td").hasClass(temp)) {
      var ele = document.getElementById(temp);
      $(ele).css('visibility', 'visible');
      $(ele).html("  " + totalEvent(temp));
      $(ele).css('font-weight', "bolder");
    }
  }

  $('.body').on('click', 'td', function() { 
    var object = {}
    var result = [];
    var date = $(this).attr('class');
    for (var x in eventData) {
      var check = eventData[x].date;
      if (date == check) {
        var obj = {}
        obj["date"] = eventData[x].date;
        obj["tittle"] = eventData[x].tittle;
        obj["discription"] = eventData[x].discription;
        result.push(obj);
      }
    }
    object["result"] = result;
    var text = Mustache.render(template, object);
    $("#event-display").html(text);
  });
});

function totalEvent(check) {
  var counter = 0;
  for (var obj of eventData) {
    if (obj.date == check) {
      counter++;
    } 
  }
  return(counter)
}
