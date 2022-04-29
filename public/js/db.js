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
db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

function create(data)
{
    var action = data.action

    switch(action) 
    {
        case "permission":
        let setDoc = db.collection('permission')
        .doc(data.name)
        .set(data.dataArray);
        break;

        case "log":

        let setLog = db.collection('logs')
        .doc(data.name)
        .collection('item')
        .add(data.dataArray)

        break;

        case "exam":

            let chcekExam = db.collection("exam")
            .doc(data.name)
            .collection('access')
            .where("contest", "==", data.contest)
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);
                var total_data = querySnapshot.size;
                if(total_data<=0) {
                    let addExam = db.collection('exam')
                    .doc(data.name)
                    .collection('access')
                    .add(data.dataArray)
                }else {
                    querySnapshot.forEach(documentSnapshot => {
                        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().contest);
                        let updateExam = db.collection("exam")
                        .doc(data.name)
                        .collection('access')
                        .doc(documentSnapshot.id)
                        .update({
                            status: data.dataArray.status,
                        })
                        .then(() => {
                            console.log('User updated!');
                        });
                    });
                }
              });

        break;

        case "answer":

            let chcekAnswer = db.collection("exam")
            .doc(data.name)
            .collection('access')
            .where("contest", "==", data.contest)
            .get()
            .then(querySnapshot => { // ตรวจสอบใน Access ว่ามี ไอเทมที่มี contest id ตรงกับข้อมูลที่ส่งมาให้หรือไม่
                // Query Size : querySnapshot.size
                console.log('Total Access: ', querySnapshot.size);
                var total_data = querySnapshot.size;

                querySnapshot.forEach(documentSnapshot => { // วนลูปแสดงข้อมูล Access Item ใน Acccess ทั้งหมด
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().contest);

                    let chcekAnswer2 = db.collection("exam")
                    .doc(data.name)
                    .collection('access')
                    .doc(documentSnapshot.id)
                    .collection('answer')
                    .where("quiz", "==", data.dataArray.quiz)
                    .get()
                    .then(querySnapshot2 => { // ค้นหา item ใน answer เพื่อค้นหาว่ามี quiz id ตรงกับข้อมูลที่ให้มาหรือไม่
                        // Query Size : querySnapshot.size
                        console.log('Total Answer: ', querySnapshot2.size); // ไม่มี เพิ่มใหม่
                        var total_data2 = querySnapshot2.size;
                        if(total_data2<=0) {
                            
                            let chcekAnswer3 = db.collection("exam")
                            .doc(data.name)
                            .collection('access')
                            .doc(documentSnapshot.id)
                            .collection('answer')
                            .add(data.dataArray)
                            .then(() => {
                                console.log('User updated!');
                            });

                        }else {
                            querySnapshot2.forEach(documentSnapshot2 => { // มี อัพเดตคำตอบ
                                console.log('User ID: ', documentSnapshot2.id, documentSnapshot2.data().quiz);
                                let chcekAnswer4 = db.collection("exam")
                                .doc(data.name)
                                .collection('access')
                                .doc(documentSnapshot.id)
                                .collection('answer')
                                .doc(documentSnapshot2.id)
                                .update({
                                    answer: data.dataArray.answer,
                                })
                                .then(() => {
                                    console.log('User updated!');
                                });
                            });
                        }
                    });
                    
                    
                });

              });

        break;

        case "player":

            let chcekPlayer = db.collection("play")
            .doc(data.name)
            .collection('player')
            .where("topic", "==", data.topic)
            .get()
            .then(querySnapshot => {
                // Query Size : querySnapshot.size
                console.log('Total users: ', querySnapshot.size);
                var total_data = querySnapshot.size;
                if(total_data<=0) {
                    let addPlayer = db.collection('play')
                    .doc(data.name)
                    .collection('player')
                    .add(data.dataArray)
                }else {
                    querySnapshot.forEach(documentSnapshot => {
                        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().topic);
                        let updatePlayer = db.collection("play")
                        .doc(data.name)
                        .collection('player')
                        .doc(documentSnapshot.id)
                        .update({
                            counter: data.dataArray.counter,
                        })
                        .then(() => {
                            console.log('User updated!');
                        });
                    });
                }
              });

        break;
    }
}
