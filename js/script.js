// file: script.js
// Initialize Firebase
var config = {
  apiKey: "AIzaSyB0PHHMmoi62nkdpmYV1TzV7zbKwazgK7I",
  authDomain: "academy-infra.firebaseapp.com",
  databaseURL: "https://academy-infra-default-rtdb.firebaseio.com",
  projectId: "academy-infra",
  storageBucket: "academy-infra.appspot.com",
  messagingSenderId: "1097353167819"
};

firebase.initializeApp(config);

//create firebase database reference
var dbconnect   = firebase.database();
var dbplayer    = dbconnect.ref('player');
var parser  = new UAParser();

var userDataRef = firebase.database().ref("data").orderByKey();
userDataRef.once("value").then(function(snapshot) 
{
  snapshot.forEach(function(childSnapshot) 
  {
      var key = childSnapshot.key;
      //console.log(key);
      //var childData = childSnapshot.val();           
      //console.log(childData);
      //var percent = childSnapshot.val().permission.percent;
      //console.log("PMS:" + key + ":" + percent + "%");
  });
});

//load older conatcts as well as any newly added one...
dbplayer.on("child_added", function(snap) 
{
//console.log("added", snap.key, snap.val());
});

function readPermission(sid)
{
var singlePermission = firebase.database().ref('data/' + sid);
//console.log(singlePermission);
return singlePermission;
}

function getPermission()
{
firebase.database().ref('data/4128/').orderByChild("permission").on("child_added", (snap) => {
//console.log(snap.val());
});
}

function getPlayer(sid,topic)
{
firebase.database().ref('data/'+ sid +'/player/').orderByChild("topic").equalTo(topic).on("child_added", (snap) => {
//console.log(snap.val());
});
}

function addPermission(data)
{
firebase.database().ref('data/' + data.sid).update(
{
  permission: {
      id: data.pid,
      code: data.code,
      student: data.student,
      lesson: data.lesson,
      timer: data.timer,
      percent: data.percent,
      adddate: data.adddate,
      expire: data.expire,
      device: parser.getResult().ua,
  }
});
}

function addPlayer(data)
{
firebase.database().ref('data/' + data.sid + '/player/' + data.token).update(
{
  pid: data.token,
  lesson: data.lesson,
  course: data.course,
  topic: data.topic,
  total: data.total,
  timer: data.timer,
  current: data.current,
  date_create: data.date_create,
  date_update: data.date_create,
  countdown: data.countdown,
  counter: data.counter,
  percent: data.percent,
  device: parser.getResult().ua,
});
}

function checkExam(data)
{
firebase.database().ref('data/' + data.sid + '/exam/').orderByChild('contest').equalTo(data.contest).once("value", function(snapshot) 
{
  console.log(snapshot.val());
  snapshot.forEach(function(dataRow) 
  {
      firebase.database().ref('data/' + data.sid + '/exam/' + dataRow.key).once("value", function(snapshot){
        console.log(dataRow.key + " : " + snapshot.val().status);
        if(snapshot.val().status==="accept")
        {
          //firebase.database().ref('data/' + data.sid + '/exam/').child(dataRow.key).remove();
        }
      });
  });
});

var exam = {};
exam['student']   = data.sid;
exam['checkin']   = data.checkin;
exam['checkout']  = data.checkout;
exam['contest']   = data.contest;
exam['status']    = data.status;
addExam(exam);
/*
var ref    = firebase.database().ref('data/' + data.sid + '/exam/');
var query  = ref.orderByChild('contest').equalTo(data.contest);
query.once('value', function(snapshot) {
  console.log(snapshot.val());
  if (!snapshot.exists()) 
  {
      //console.log("Not Exitsts");
      /*
      var exam = {};
      exam['student']   = data.sid;
      exam['checkin']   = data.checkin;
      exam['checkout']  = data.checkout;
      exam['contest']   = data.contest;
      exam['status']    = data.status;
      addExam(exam);
      
  }
  else
  {
      var arr = snapshot.val();
      var arr2 = Object.keys(arr);
      var key = arr2[0];
      
      //addQuestion(key);
      //addAnswer(key);
      //console.log(key) // -KiBBDaj4fBDRmSS3j0r
  }
});
*/
}

function addExam(data)
{
var key = firebase.database().ref('data/'+ data.student +'/exam/').push(
{
checkin: data.checkin,
checkout: data.checkout,
contest: data.contest,
status: data.status,
device: parser.getResult().ua,
})
.then((snapshot) => {
//console.log(snapshot.key);
Cookies.set('__examkey', snapshot.key, {expires:1})
});
}

function addQuestion(key,student,data)
{
firebase.database().ref('data/'+student+'/exam/' + key).update(
{
  question: {
    layout: data,
  }
});
}

function updateExamStatus(key,student,data)
{
firebase.database().ref('data/'+student+'/exam/' + key).update(
{
  status: "denied",
  type: data,
  update_date: Date.now(),
});
}

function addAnswer(qkey,student,data)
{
var ref    = firebase.database().ref('data/'+student+'/exam/'+qkey+'/answer');
var query  = ref.orderByChild('quiz').equalTo(data.quiz);
query.once('value', function(snapshot) {

  if (!snapshot.exists()) 
  {
      //console.log("Not Exitsts");
      firebase.database().ref('data/'+student+'/exam/'+qkey+'/answer/').push(
      {
        quiz: data.quiz,
        answer: data.answer,
        timestamp: Date.now(),
      });
  }
  else
  {
      var arr = snapshot.val();
      var arr2 = Object.keys(arr);
      var key = arr2[0];

      firebase.database().ref('data/'+student+'/exam/'+qkey+'/answer/' + key).update(
      {
        answer: data.answer,
        timestamp: Date.now(),
      });

      //console.log(key)
  }
});
}

function updatePlayer(data)
{
trigger       = data.trigger;
counter       = data.counter;
countdown     = data.countdown;
total         = data.total;
new_counter   = parseInt(counter) + parseInt(data.trigger);
new_countdown = parseInt(countdown) - parseInt(trigger);
percent       = Math.round((new_counter/total)*100);

firebase.database().ref('data/' + data.sid + '/player/' + data.token).update(
{
    countdown: new_countdown,
    counter: new_counter,
    date_update: Date.now(),
    percent: percent
});
}

function addLogs()
{
var student     = Cookies.get('__student');
var student     = JSON.parse(student);
var studentID   = student.permission.student_id;


var page    = $(location).attr('href');

firebase.database().ref('data/'+studentID+'/logs/').push(
{
page: page,
device: parser.getResult().ua,
timestamp: Date.now(),
});
}

function deletePlayer()
{
sid    = $('#sid').val();
token  = $('#token').val();
//firebase.database().ref('data/' + sid + '/player/' + token).remove();
firebase.database().ref().child('data/' + sid + '/player/' + token + '/').remove();
}

function getCount()
{
firebase.database().ref('data').once("value", function(snapshot){
// console.log("Count!", snapshot.numChildren());
$('#counter').val(snapshot.numChildren());
});
}

addLogs();