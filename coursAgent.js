/**
 * Created by Xuner on 09/06/2016.
 */
var fs=require("fs");
var lineReader = require('n-readlines');
var Regex = require("regex");
var cours=[];
var exist = false;
filenames = fs.readdirSync(__dirname+"/EDT");
// console.log(filenames);
//get all cours
for (i = 1; i < filenames.length; i++) {

    var url = __dirname + "/EDT/" + filenames[i];
     // console.log(url);


    var liner = new lineReader(url);

    var line;
    while (line = liner.next()) {
        if (line != "" && line != " ") {

            Regex=/([A-Z0-9]+.*,S=[A-Z0-9]+)/;
            if (Regex.exec(line)) {
                // console.log(line.toString());
                for (i1 = 0; i1 < cours.length; i1++) {

                    if (cours[i1]== line.toString()) {
                        exist = true;
                    }
                }
                if (!exist) {

                var cour = {};
                cour = line.toString();
                cours.push(cour);

            }

            }
        }
    }

}
 // console.log(cours);
//for each cour ,add login
var lists=[];


for(var i=0;i<cours.length;i++) {
    var j = 1;
    var cour = cours[i];
     // console.log("this is "+i + ": "+cour);
    var list={};
    list.uv=cour.trim();

     for (var i1 = 1; i1 < filenames.length; i1++) {

        var url = __dirname + "/EDT/" + filenames[i1];

        var liner = new lineReader(url);

        var line;
        while (line = liner.next()) {

            if ( line == cour) {
                Regex = /(.*).edt/;
                var login = Regex.exec(filenames[i1])[1];

                list[j]=login;
                j++;

            }
        }

    }
    lists.push(list);
}
console.log(lists);
// var res = JSON.stringify(lists);
// console.log(res);