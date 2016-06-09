//parcour tous les fichier dans un repertoire
var fs=require("fs");
var lineReader = require('n-readlines');
var Regex = require("regex");
var edts=[];

filenames = fs.readdirSync(__dirname+"/EDT");
for (i = 1; i < filenames.length; i++) {

    var url = __dirname + "/EDT/" + filenames[i];
    // console.log(url);
    var edt={};
    var j=0;
    var liner = new lineReader(url);

    var line;
    while (line = liner.next()) {
        if (line != "" && line != " ") {
            Regex = / ([a-z]*)                  ([A-Z0-9]+)/;

            if (Regex.exec(line)) {
                edt.login=Regex.exec(line)[1];
                edt.semestre=Regex.exec(line)[2];
            }
            else  {
                Regex = / ([A-Z0-9]+)       ([A-Z])( .    )([A-Z]+)(\D*)([0-9-:]+),F[12],S=([A-Z0-9]+)/;
                if (Regex.exec(line)) {
                    j++;
                    var cours = {};
                    cours.uv = Regex.exec(line)[1];
                    cours.courtype = Regex.exec(line)[2];
                    cours.group = Regex.exec(line)[3];
                    cours.date = Regex.exec(line)[4];
                    cours.horaire = Regex.exec(line)[6];
                    cours.lieu = Regex.exec(line)[7];
                    edt[j] = cours;
                }

            }


            if (line.indexOf("LE SERVICE des MOYENS d'ENSEIGNEMENT VOUS SOUHAITE BON COURAGE")>-1) {

                edts.push(edt);

            }

        }
    }

}

console.log(edts);

// console.log(edts.length);

// for(i=0;i<edts.length;i++){
//     console.log(edts[i]);
// }