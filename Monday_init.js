/**
 * Initialise App to get events from Mail
 * Return @param {*} initObj contains the Night Mode, language and font details
 */
window.AppSDK = SigmaSDK.MAIL.init(() => {
    AppSDK.dispatch("drop", {
        isListen: true
    });
    window.appView.populateNotebooks();
    window.appView.populateAppData();
});

let populateMailDetails = function(mailInfo) {
    window.appView.populateCurrentMailDetails(mailInfo);
    window.appView.populateAttachmentDetails(mailInfo);
    if (mailInfo.FROM) {
        $(".search_input").val(mailInfo.FROM);
        $("#contactBtn").click();
    }
    window.appView.populateRelationalData(mailInfo.MSGID);
};

/**
 * Subscribe to Events you need using ZMSDK.app.on()
 */
var ccids = [];
var ccheck = [];
var bccheck = [];

AppSDK.on("mail_preview", function(mailObj) {
    window.apiUtil.getMailDetails(mailObj.MSGID).then(function(mailInfo) {
        // console.log(mailInfo);
        //   console.log("mailInfo ", mailInfo);
        var from = mailInfo.FROM;
        var cc = mailInfo.CC;
        var bcc = mailInfo.BCC;
        console.log("BCC", bcc);
        document.getElementById("allo").style.display = "block";
        document.getElementById("bloc").style.display = "block";
        // create checkbox and span //
        var container = document.getElementById('maildet');
        container.innerHTML = '';
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'fromid';
        checkbox.value = from;
        checkbox.name = 'interest';
        var label = document.createElement('label');
        // label.htmlFor = 'car';
        label.appendChild(document.createTextNode(from));
        var br = document.createElement('br');
        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(br);


        if (cc !== '') {
            var num = 0;

            const emails = cc;
            const array = emails.split(',');
            const newArrey = array.map((email) => email.replace('<', '').replace('>', ''));
            // console.log('array:hgfc', newArrey);
            for (const c in newArrey) {
                num = num + 1;
                var checkbox2 = document.createElement('input');

                checkbox2.type = 'checkbox';
                checkbox2.id = 'cc' + num;
                checkbox2.value = newArrey[c];
                ccheck.push('cc' + num);
                checkbox2.name = 'interest';
                var label2 = document.createElement('label');
                // label.htmlFor = 'car';
                label2.appendChild(document.createTextNode(newArrey[c]));
                label2.setAttribute("id", "select" + num);
                ccids.push("select" + num);
                var br2 = document.createElement('br');
                container.appendChild(checkbox2);
                container.appendChild(label2);
                container.appendChild(br2);
            }


        }
        // Bcc edited//


        //  UI domain supparate //
        var from1 = from.split("@")[1];
        console.log("fromdom ", from1);
        //** create elements
        var container1 = document.getElementById('domain');
        container1.innerHTML = '';
        var checkbox1 = document.createElement('input');
        checkbox1.type = 'checkbox';
        checkbox1.id = 'dfromid';
        checkbox1.value = from1;
        checkbox1.name = 'interest';
        var label1 = document.createElement('label');
        // label.htmlFor = 'car';
        label1.appendChild(document.createTextNode(from1));
        var br1 = document.createElement('br');
        container1.appendChild(checkbox1);
        container1.appendChild(label1);
        container1.appendChild(br1);


        //** cc domains **//
        var ccdomain = [];
        var ccsplit = [];

        if (cc !== '') {

            const emails = cc;
            const array = emails.split(',');
            const newArrey2 = array.map((email) => email.replace('<', '').replace('>', ''));
            for (const c in newArrey2) {

                const split_String = newArrey2[c].split("@");
                // console.log("remove dulicate", split_String);

                ccdomain.push(split_String[1]);
            }

            const ccdomains = [...new Set(ccdomain)];
            ccsplit.push(ccdomains);

            console.log("remove dulicate", ccsplit);



        }


        var number2 = 0;

        for (const j in ccsplit) {
            split_Array = [];

            var ccdomains2 = ccsplit[j];
            // console.log("from1 ",from1);   
            for (const k in ccdomains2) {

                var ccdomains3 = ccdomains2[k];
                if (from1 !== ccdomains3) {
                    number2 = number2 + 1;
                    // console.log("from1 ",from1); 
                    //  console.log("ccids ",ccdomains3);

                    var dcheckbox2 = document.createElement('input');

                    dcheckbox2.type = 'checkbox';
                    dcheckbox2.id = 'dcc' + number2;
                    dcheckbox2.value = ccdomains3;
                    bccheck.push('dcc' + number2);
                    dcheckbox2.name = 'interest';
                    var dlabel2 = document.createElement('label');
                    // label.htmlFor = 'car';
                    dlabel2.appendChild(document.createTextNode(ccdomains3));
                    dlabel2.setAttribute("id", "dselect" + number2);
                    // ccids.push("select" + num);
                    var dbr2 = document.createElement('br');
                    container1.appendChild(dcheckbox2);
                    container1.appendChild(dlabel2);
                    container1.appendChild(dbr2);






                }

            }




        }


        // end Domain //




        populateMailDetails(mailInfo);
    });
});

// emails in whitelist
function fun() {

    orgid = [];
    var emails = [];
    // cc mails

    for (const ccheckbox in ccheck) {


        var check = document.getElementById(ccheck[ccheckbox]).checked;
        console.log("checked", check);
        if (check === true) {

            var ccemails = document.getElementById(ccheck[ccheckbox]).value;
            // console.log(ccemails);
            // org=orgid.zoid
            emails.push(ccemails);

        }


    }


    // from mails
    var ff = document.getElementById("fromid").checked;
    if (ff === true) {
        var femail = document.getElementById("fromid").value;
        emails.push(femail);

    }

    //  var ee= JSON.stringify(emails, null, "  ");
    const trimedemails = emails.map(emails => emails.trim());
    //console.log(ee);
    console.log("trimedemails", trimedemails);
    //console.log(ee);
    //** apicall **//

    //** domain gets **//
    var domains = [];
    for (const dcheckbox in bccheck) {

        var Dcheck = document.getElementById(bccheck[dcheckbox]).checked;
        console.log("Dcc_checked", Dcheck);
        if (Dcheck === true) {

            var dccemails = document.getElementById(bccheck[dcheckbox]).value;
            console.log("DCC mails:", dccemails);
            domains.push(dccemails);

        }



    }

    // from domain
    var dff = document.getElementById("dfromid").checked;
    if (dff === true) {
        var fdomain = document.getElementById("dfromid").value;
        domains.push(fdomain);

    }

    //** end domains **//





    var succstatus = '';

    AppSDK.dispatch("invokeUrl", {


        xhrObj: {
            "url": "https://mail.zoho.com/api/organization",
            "type": "GET",
            "headers": {
                "Content-Type": "application/json"
            },
            "serviceName": "Maildomain"
        }

    }).then(function(successResponse) { //Get organization id
            var succ = JSON.stringify(successResponse);
            // console.log(succ);
            var res = JSON.parse(succ);
            // console.log(res);
            var respon = res.response;
            let rr = JSON.parse(respon);
            //console.log(respon);
            var data1 = rr.data;
            var zoid = data1.zoid;
            // status == 200
            var status = rr.status;
            var code = status.code;
            console.log("404 code:", code);
            if (code !== 200) {
                document.getElementById("notacess").style.display = "block";
                document.getElementById("Home").style.display = "none";
                document.getElementById("notacess1").textContent = "You do not have developer permission Please contact to your Admin";
            }
            // status end

            var valbl = 0;
            //** add whitelist  email **
            AppSDK.dispatch("invokeUrl", {

                xhrObj: {
                    "url": "https://mail.zoho.com/api/organization/" + zoid,
                    "type": "PUT",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "payload": {
                        "zoid": zoid,
                        "mode": "addSpamCategory",
                        "spamVO": {
                            "spamCategory": "whiteListEmail",
                            "whiteListEmail": trimedemails
                        }
                    },

                    "serviceName": "spanmails"
                }


            }).then(function(successResponse) {
                    // 

                    var suc = JSON.stringify(successResponse);
                    //console.log(suc);
                    var par = JSON.parse(suc);
                    var responce = par.response;
                    let rr1 = JSON.parse(responce);

                    var status1 = rr1.status;
                    var code = status1.code;

                    if (code == 200) {
                        console.log("successResponse", status1);

                        document.getElementById("succ").style.display = "block";
                        document.getElementById("suut").style.display = "block";

                        succstatus = 'Emails Successfully Whitelisted';

                        document.getElementById("suut").textContent = succstatus;
                        document.getElementById("suut").textContent = succstatus;



                    } else {
                        var data = rr1.data;
                        // var erro =data.moreInfo;

                        // console.log("Error code", status1.code, "successResponse", data.moreInfo);
                        var replace1 = data.moreInfo;
                        if (replace1 !== "Invalid Input") {
                            valbl = 1;
                            document.getElementById("suut").textContent = '';
                            document.getElementById("succ").style.display = "block";
                            document.getElementById("error").style.display = "block";

                            if (replace1.indexOf('whitelist') !== -1) {
                                document.getElementById("domalab").style.display = "none";
                                document.getElementById("continu").style.display = "none";
                            } else {
                                document.getElementById("domalab").style.display = "block";
                                document.getElementById("continu").style.display = "block";
                            }

                            let txt = replace1.replace("Data", "Emails").replace("[", "").replace("]", "");
                            // console.log(txt);errorbtn


                            document.getElementById("error").textContent = txt;
                        } else {

                            document.getElementById("suut").textContent = '';
                            document.getElementById("error").textContent = '';

                        }
                    }



                },
                function(errorResponse) {
                    var err = JSON.stringify(errorResponse);
                    console.log("error ", err);

                }
            )


            //**end whitelist email**//

            //add whitelist Domain **//

            AppSDK.dispatch("invokeUrl", {

                xhrObj: {
                    "url": "https://mail.zoho.com/api/organization/" + zoid,
                    "type": "PUT",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "payload": {
                        "zoid": zoid,
                        "mode": "addSpamCategory",
                        "spamVO": {
                            "spamCategory": "whiteListDomain",
                            "whiteListDomain": domains
                        }
                    },

                    "serviceName": "spanmails"
                }


            }).then(function(successResponse2) {
                    // 

                    var suc2 = JSON.stringify(successResponse2);
                    // console.log("suc2",suc2);
                    var par = JSON.parse(suc2);
                    var responce = par.response;
                    let rr1 = JSON.parse(responce);

                    var status1 = rr1.status;
                    var code = status1.code;

                    if (code == 200) {
                        console.log("successResponse", status1);
                        document.getElementById("succ").style.display = "block";
                        document.getElementById("dsuut").style.display = "block";
                        succstatus = 'Domain Successfully Whitelisted';
                        document.getElementById("dsuut").textContent = succstatus;

                    } else {
                        var data = rr1.data;

                        //var replace1 = data.moreInfo;
                        //  let txt = replace1.replace("Data", "Emails").replace("[", "").replace("]", "");
                        // console.log(txt);
                        var replace1 = data.moreInfo;
                        if (replace1 !== "Invalid Input") {


                            document.getElementById("dsuut").textContent = '';
                            document.getElementById("succ").style.display = "block";
                            document.getElementById("dsuut").style.display = "block";

                            if (replace1.indexOf('whitelist') !== -1) {
                                document.getElementById("continu").style.display = "none";
                                document.getElementById("domalab").style.display = "none";
                            } else {
                                document.getElementById("continu").style.display = "block";
                                document.getElementById("domalab").style.display = "block";
                            }




                            let txt = replace1.replace("Data", "Domains").replace("[", "").replace("]", "");
                            //   console.log("txt",txt);

                            document.getElementById("dsuut").textContent = txt;
                        } else {

                            document.getElementById("dsuut").textContent = '';
                            document.getElementById("dsuut").textContent = '';
                        }
                    }



                },
                function(errorResponse2) {
                    var err = JSON.stringify(errorResponse2);
                    console.log("error ", err);

                }
            )






            //end whitelist Domain **//

        },
        function(errorResponse) {
            // console.log(JSON.stringify(errorResponse));
            var resp = JSON.stringify(errorResponse);
            var res = JSON.parse(resp);
            console.log("res", res);
            //unknow error msg 
             if (status == 400) {
                    document.getElementById("connect").style.display = "block";
                    //document.getElementById("Home").style.display = "none";
                    document.getElementById("connect1").textContent = "The status was failure. Unable to authenticate the connector Please go ahead and connect the connector by clicking on click here still If you encounter any problems, please contact Zoho customer service. ";
                }
            //end unknown error msg
            
            //  (Allow button) Connector fail error
            var status = res.status;
            var data = res.data;
            var Error = data.Error;


            if (Error === "Unable to authenticate connector") {
                document.getElementById("connect").style.display = "block";
                //document.getElementById("Home").style.display = "none";
                document.getElementById("connect1").textContent = "The status was failure. Unable to authenticate the connector Please go ahead and connect the connector by clicking on click here ";
                //   another error while executing code
                if (status == 400) {
                    document.getElementById("connect").style.display = "block";
                    //document.getElementById("Home").style.display = "none";
                    document.getElementById("connect1").textContent = "The status was failure. Unable to authenticate the connector Please go ahead and connect the connector by clicking on click here ";
                }
                //   end another error while executing code

                //   end Connector fail error
            }
        }

    );











    }



    // sucss ok fun
    function Wok() {
        document.getElementById("succ").style.display = "none";
        document.getElementById("dsucc").style.display = "none";
    }
    // Block ok
    function Bok() {
        document.getElementById("bsucc").style.display = "none";
    }


    //**cancel function**

    function cancel() {
        document.getElementById("succ").style.display = "none";
        document.getElementById("Home").style.display = "block";

    }


    function Continue() {

        document.getElementById("Home").style.display = "none";
        document.getElementById("succ").style.display = "block";

        orgid = [];
        var emails = [];
        for (const ccheckbox in ccheck) {

            var check = document.getElementById(ccheck[ccheckbox]).checked;
            console.log(check);
            if (check === true) {

                var ccemails = document.getElementById(ccheck[ccheckbox]).value;
                // console.log(ccemails);
                // org=orgid.zoid
                emails.push(ccemails)

            }


        }
        var ff = document.getElementById("fromid").checked;
        if (ff === true) {
            var femail = document.getElementById("fromid").value;
            emails.push(femail)

        }

        //  var ee= JSON.stringify(emails, null, "  ");
        const trimedemails = emails.map(emails => emails.trim());
        //console.log(ee);

        console.log(trimedemails);
        //console.log(ee);


        //** domain gets **//
        var domains = [];
        for (const dcheckbox in bccheck) {

            var Dcheck = document.getElementById(bccheck[dcheckbox]).checked;
            //  console.log("Dcc_checked", Dcheck);
            if (Dcheck === true) {

                var dccemails = document.getElementById(bccheck[dcheckbox]).value;
                // console.log("DCC mails:", dccemails);
                domains.push(dccemails);

            }



        }

        // from domain
        var dff = document.getElementById("dfromid").checked;
        if (dff === true) {
            var fdomain = document.getElementById("dfromid").value;
            domains.push(fdomain);

        }

        //** end domains **//






        //** apicall **//

        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization",
                "type": "GET",
                "headers": {
                    "Content-Type": "application/json"
                },
                "serviceName": "Maildomain"
            }

        }).then(function(successResponse) { //Get organization id
                var succ = JSON.stringify(successResponse);
                // console.log(succ);
                var res = JSON.parse(succ);
                // console.log(res);
                var respon = res.response;
                let rr = JSON.parse(respon);
                //console.log(respon);
                var data1 = rr.data;
                var zoid = data1.zoid;
                orgid.push(data1);
                //var data =respon.data;
                console.log(zoid);

                //**  remove emails from blocklist   **
                AppSDK.dispatch("invokeUrl", {

                    xhrObj: {
                        "url": "https://mail.zoho.com/api/organization/" + zoid,
                        "type": "PUT",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "payload": {
                            "zoid": zoid,
                            "mode": "removeSpamCategory",
                            "spamVO": {
                                "spamCategory": "blackListEmail",
                                "blackListEmail": trimedemails
                            }
                        },

                        "serviceName": "spanmails"
                    }


                }).then(function(successResponse) {
                        // 

                        var suc = JSON.stringify(successResponse);
                        // console.log("remove block ",suc);
                        var par = JSON.parse(suc);
                        var responce = par.response;
                        let rr1 = JSON.parse(responce);
                        console.log(rr1)
                        console.log(status1)
                        var status1 = rr1.status;
                        var code = status1.code;

                        if (code == 200) {
                            console.log("remove blocks", status1);

                            //** add email in whitelist **//

                            AppSDK.dispatch("invokeUrl", {

                                xhrObj: {
                                    "url": "https://mail.zoho.com/api/organization/" + zoid,
                                    "type": "PUT",
                                    "headers": {
                                        "Content-Type": "application/json"
                                    },
                                    "payload": {
                                        "zoid": zoid,
                                        "mode": "addSpamCategory",
                                        "spamVO": {
                                            "spamCategory": "whiteListEmail",
                                            "whiteListEmail": trimedemails
                                        }
                                    },

                                    "serviceName": "spanmails"
                                }


                            }).then(function(successResponse) {
                                    // 

                                    var suc = JSON.stringify(successResponse);
                                    //console.log(suc);
                                    var par = JSON.parse(suc);
                                    var responce = par.response;
                                    let rr1 = JSON.parse(responce);

                                    var status1 = rr1.status;
                                    var code = status1.code;

                                    if (code == 200) {
                                        console.log("successResponse", status1);

                                        document.getElementById("succ").style.display = "block";
                                        document.getElementById("suut").style.display = "block";
                                        document.getElementById("error").style.display = "none";
                                        document.getElementById("emaillab").style.display = "none";
                                        document.getElementById("bdomalab").style.display = "block";
                                        
                                        //   error point for continue button
                                        document.getElementById("continu").style.display = "none";
                                        succstatus = 'Emails Successfully Whitelisted';

                                        document.getElementById("suut").textContent = succstatus;
                                        document.getElementById("domalab").textContent = " ";
                                       

                                    } else {
                                        var data = rr1.data;
                                        var erro = data.moreInfo;
                                        // var replace1 = data.moreInfo;
                                        // var erro = replace1.replace("Data", "Emails").replace("[", "").replace("]", "");

                                        // document.getElementById("error").innerHTML = txt;

                                        //   document.getElementById("err").style.display="block";
                                        //     document.getElementById("succ").style.display="none"
                                        //     console.log("Error code", status1.code, "successResponse", data.moreInfo);

                                        //   document.getElementById("error").textContent=data.moreInfo;
                                    }







                                },
                                function(errorResponse) {
                                    var err = JSON.stringify(errorResponse);
                                    console.log("error ", err);

                                }
                            )

                        } else {
                            var data = rr1.data;
                            var erro = data.moreInfo;
                        }







                    },
                    function(errorResponse) {
                        var err = JSON.stringify(errorResponse);
                        console.log("error ", err);

                    }
                )


                //**

                // ** domain remove from blocklist and add whitelist **//
                AppSDK.dispatch("invokeUrl", {

                    xhrObj: {
                        "url": "https://mail.zoho.com/api/organization/" + zoid,
                        "type": "PUT",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "payload": {
                            "zoid": zoid,
                            "mode": "removeSpamCategory",
                            "spamVO": {
                                "spamCategory": "blackListDomain",
                                "blackListDomain": domains
                            }
                        },

                        "serviceName": "spanmails"
                    }


                }).then(function(successResponse) {
                    // 

                    var suc = JSON.stringify(successResponse);
                    // console.log("remove block ",suc);
                    var par = JSON.parse(suc);
                    var responce = par.response;
                    let rr1 = JSON.parse(responce);
                    // status == 200
                    var status = rr.status;
                    var code = status.code;
                    console.log("404 code:", code);
                    if (code !== 200) {
                        document.getElementById("notacess").style.display = "block";
                        document.getElementById("Home").style.display = "none";
                        document.getElementById("notacess1").textContent = "You do not have developer permission Please contact to your Admin";
                    }
                    // status end
                    var status1 = rr1.status;
                    var code = status1.code;
                    if (code == 200) {
                        //add whitelist Domain **//

                        AppSDK.dispatch("invokeUrl", {

                            xhrObj: {
                                "url": "https://mail.zoho.com/api/organization/" + zoid,
                                "type": "PUT",
                                "headers": {
                                    "Content-Type": "application/json"
                                },
                                "payload": {
                                    "zoid": zoid,
                                    "mode": "addSpamCategory",
                                    "spamVO": {
                                        "spamCategory": "whiteListDomain",
                                        "whiteListDomain": domains
                                    }
                                },

                                "serviceName": "spanmails"
                            }


                        }).then(function(successResponse2) {
                                // 

                                var suc2 = JSON.stringify(successResponse2);
                                // console.log("suc2",suc2);
                                var par = JSON.parse(suc2);
                                var responce = par.response;
                                let rr1 = JSON.parse(responce);

                                var status1 = rr1.status;
                                var code = status1.code;

                                if (code == 200) {
                                    console.log("successResponse", status1);
                                    document.getElementById("succ").style.display = "block";
                                    document.getElementById("dsuut").style.display = "block";

                                    document.getElementById("derror").style.display = "none";
                                    document.getElementById("domalab").style.display = "block";
                                    document.getElementById("continu").style.display = "none";


                                    succstatus = 'Domain Successfully Whitelisted';
                                    document.getElementById("dsuut").textContent = succstatus;
                                    document.getElementById("domalab").textContent = "";

                                } else {
                                    var data = rr1.data;


                                }



                            },
                            function(errorResponse2) {
                                var err = JSON.stringify(errorResponse2);
                                console.log("error ", err);

                            }
                        )






                        //end whitelist Domain **//


                    }






                })


                //** end domain remove**//

            },
            function(errorResponse) {
                // console.log(JSON.stringify(errorResponse));


            }
        );








    }



    //** emails and domains in blocklist **//
    function block() {

        orgid = [];
        var emails = [];
        for (const ccheckbox in ccheck) {

            var check = document.getElementById(ccheck[ccheckbox]).checked;
            console.log(check);
            if (check === true) {

                var ccemails = document.getElementById(ccheck[ccheckbox]).value;
                // console.log(ccemails);
                // org=orgid.zoid
                emails.push(ccemails)

            }


        }
        var ff = document.getElementById("fromid").checked;
        if (ff === true) {
            var femail = document.getElementById("fromid").value;
            emails.push(femail)

        }


        //  var ee= JSON.stringify(emails, null, "  ");
        const trimedemails = emails.map(emails => emails.trim());
        //console.log(ee);

        console.log(trimedemails);



        //** domain gets **//
        var domains = [];
        for (const dcheckbox in bccheck) {

            var Dcheck = document.getElementById(bccheck[dcheckbox]).checked;
            console.log("Dcc_checked", Dcheck);
            if (Dcheck === true) {

                var dccemails = document.getElementById(bccheck[dcheckbox]).value;
                console.log("DCC mails:", dccemails);
                domains.push(dccemails);

            }



        }

        // from domain
        var dff = document.getElementById("dfromid").checked;
        if (dff === true) {
            var fdomain = document.getElementById("dfromid").value;
            domains.push(fdomain);

        }

        //** end domains **//



        //console.log(ee);
        //** apicall **//
        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization",
                "type": "GET",
                "headers": {
                    "Content-Type": "application/json"
                },
                "serviceName": "Maildomain"
            }

        }).then(function(successResponse) {
                //Get organization id
                var succ = JSON.stringify(successResponse);
                // console.log("succ",succ);
                var res = JSON.parse(succ);
                // console.log(res);
                var respon = res.response;
                let rr = JSON.parse(respon);
                //console.log(respon);
                var data1 = rr.data;
                var zoid = data1.zoid;
                orgid.push(data1);
                //var data =respon.data;
                console.log(zoid);
                // status == 200
                var status = rr.status;
                var code = status.code;
                // console.log("404 code:", code);
                if (code !== 200) {
                    document.getElementById("notacess").style.display = "block";
                    document.getElementById("Home").style.display = "none";
                    document.getElementById("notacess1").textContent = "You do not have developer permission Please contact to your Admin";
                }
                // status end

                //** emails blocklist**
                AppSDK.dispatch("invokeUrl", {

                    xhrObj: {
                        "url": "https://mail.zoho.com/api/organization/" + zoid,
                        "type": "PUT",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "payload": {
                            "zoid": zoid,
                            "mode": "addSpamCategory",
                            "spamVO": {
                                "spamCategory": "blackListEmail",
                                "blackListEmail": trimedemails
                            }
                        },

                        "serviceName": "spanmails"
                    }


                }).then(function(successResponse) {
                        // 

                        var suc = JSON.stringify(successResponse);
                        //console.log(suc);
                        var par = JSON.parse(suc);
                        var responce = par.response;
                        let rr1 = JSON.parse(responce);

                        var status1 = rr1.status;
                        var code = status1.code;
                        console.log("eblock ", rr1);



                        if (code == 200) {
                            console.log("successResponse", status1);


                            document.getElementById("bsucc").style.display = "block";
                            document.getElementById("bsuut").style.display = "block";
                            document.getElementById("bsuut").textContent = "Emails Successfully Blocklisted";

                        } else {
                            var data = rr1.data;
                            var erro = data.moreInfo;
                            // console.log("sds",code)

                            //continue error    
                            //   if (code == 500) {

                            //         document.getElementById("bcontunue").style.display = "block";
                            //   }
                            var replace1 = data.moreInfo;
                            if (replace1 !== "Invalid Input") {
                                document.getElementById("bsucc").style.display = "block";


                                document.getElementById("berror").style.display = "block";

                                if (replace1.indexOf('blacklist') !== -1) {
                                    document.getElementById("bcontunue").style.display = "none";
                                    document.getElementById("bdomalab").style.display = "none";
                                } else {
                                    document.getElementById("bcontunue").style.display = "block";
                                    document.getElementById("bdomalab").style.display = "block";
                                }



                                let txt = replace1.replace("Data", "Emails").replace("[", "").replace("]", "");
                                // console.log(txt);
                                document.getElementById("berror").innerHTML = txt;
                                //document.getElementById("berror").textContent = data.moreInfo;
                            } else {
                                document.getElementById("bcontunue").style.display = "none";

                                document.getElementById("berror").style.display = "none";
                                document.getElementById("bemaillab").style.display = "none";
                                document.getElementById("berror").innerHTML = '';
                                document.getElementById("bsuut").textContent = '';

                            }
                        }







                    },
                    function(errorResponse) {
                        var err = JSON.stringify(errorResponse);
                        console.log("error ", err);

                    }
                )


                //** end emails blocklist



                //** domains block list **//

                AppSDK.dispatch("invokeUrl", {

                    xhrObj: {
                        "url": "https://mail.zoho.com/api/organization/" + zoid,
                        "type": "PUT",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "payload": {
                            "zoid": zoid,
                            "mode": "addSpamCategory",
                            "spamVO": {
                                "spamCategory": "blackListDomain",
                                "blackListDomain": domains
                            }
                        },

                        "serviceName": "spanmails"
                    }


                }).then(function(successResponse) {
                        // 

                        var suc = JSON.stringify(successResponse);
                        //console.log(suc);
                        var par = JSON.parse(suc);
                        var responce = par.response;
                        let rr1 = JSON.parse(responce);
                        let data = rr1.data;
                        console.log("data: ", data);
                        var status1 = rr1.status;
                        var code = status1.code;
                        console.log("domain error ", rr1);
                        // continue error
                        //  if (code == 500) {
                        //     document.getElementById("bcontunue").style.display = "block";
                        //     }
                        if (code == 200) {
                            console.log("successResponse", status1);

                            document.getElementById("bsucc").style.display = "block"

                            document.getElementById("bdsuut").style.display = "block";
                            document.getElementById("bdsuut").textContent = "Domains Successfully Blocklisted";

                        } else {
                            //document.getElementById("bcontunue").style.display = "block";
                            var data1 = rr1.data;
                            var erro = data1.moreInfo;


                            var replace1 = data1.moreInfo;
                            if (replace1 !== "Invalid Input") {



                                document.getElementById("bsucc").style.display = "block";
                                document.getElementById("bderror").style.display = "block";
                                document.getElementById("bdsuut").textContent = '';

                                if (replace1.indexOf('blacklist') !== -1) {
                                    document.getElementById("bcontunue").style.display = "none";
                                    document.getElementById("bdomalab").style.display = "block";
                                } else {
                                    document.getElementById("bcontunue").style.display = "block";
                                    document.getElementById("bdomalab").style.display = "block";
                                }




                                let txt = replace1.replace("Data", "Domains").replace("[", "").replace("]", "");
                                // console.log(txt);
                                document.getElementById("bderror").innerHTML = txt;


                            } else {
                                document.getElementById("bderror").innerHTML = '';
                                // document.getElementById("bcontunue").style.display = "none";
                                document.getElementById("bdomalab").style.display = "none";
                                document.getElementById("bdsuut").textContent = '';
                                document.getElementById("bsuut").textContent = '';


                            }
                        }







                    },
                    function(errorResponse) {
                        var err = JSON.stringify(errorResponse);
                        console.log("error ", err);

                    }
                )


                //** end block list **//

            },
            function(errorResponse) {
                console.log(JSON.stringify(errorResponse));
                var resp = JSON.stringify(errorResponse);
                var res = JSON.parse(resp);
                console.log("res", res);
                //  (block button) Connector fail error
                var status = res.status;
                var data = res.data;
                var Error = data.Error;
                // console.log("X::::",Error);

                if (Error === "Unable to authenticate connector") {
                    document.getElementById("connect").style.display = "block";
                    //document.getElementById("Home").style.display = "none";
                    document.getElementById("connect1").textContent = "The status was failure. Unable to authenticate the connector Please go ahead and connect the connector by clicking on click here ";
                }
                //   another error while executing code
                if (status == 400) {
                    document.getElementById("connect").style.display = "block";
                    //document.getElementById("Home").style.display = "none";
                    document.getElementById("connect1").textContent = "The status was failure. Unable to authenticate the connector Please go ahead and connect the connector by clicking on click here still If you encounter any problems, please contact Zoho customer service.";
                }
                //   end another error while executing code

                //   end Connector fail error

            }
        );







    }


    function bcancel() {

        document.getElementById("bsucc").style.display = "none";

        document.getElementById("Home").style.display = "block";

    }


    function bContinue() {
        document.getElementById("Home").style.display = "none";
        document.getElementById("bsucc").style.display = "block";

        orgid = [];
        var emails = [];
        for (const ccheckbox in ccheck) {

            var check = document.getElementById(ccheck[ccheckbox]).checked;
            console.log(check);
            if (check === true) {

                var ccemails = document.getElementById(ccheck[ccheckbox]).value;
                // console.log(ccemails);
                // org=orgid.zoid
                emails.push(ccemails)

            }


        }
        var ff = document.getElementById("fromid").checked;
        if (ff === true) {
            var femail = document.getElementById("fromid").value;
            emails.push(femail)

        }


        //  var ee= JSON.stringify(emails, null, "  ");
        const trimedemails = emails.map(emails => emails.trim());
        //console.log(ee);

        console.log(trimedemails);
        //console.log(ee);

        //** domain gets **//
        var domains = [];
        for (const dcheckbox in bccheck) {

            var Dcheck = document.getElementById(bccheck[dcheckbox]).checked;
            console.log("Dcc_checked", Dcheck);
            if (Dcheck === true) {

                var dccemails = document.getElementById(bccheck[dcheckbox]).value;
                console.log("DCC mails:", dccemails);
                domains.push(dccemails);

            }



        }

        // from domain
        var dff = document.getElementById("dfromid").checked;
        if (dff === true) {
            var fdomain = document.getElementById("dfromid").value;
            domains.push(fdomain);

        }

        //** end domains **//




        //** apicall **//
        AppSDK.dispatch("invokeUrl", {

            xhrObj: {
                "url": "https://mail.zoho.com/api/organization",
                "type": "GET",
                "headers": {
                    "Content-Type": "application/json"
                },
                "serviceName": "Maildomain"
            }

        }).then(function(successResponse) { //Get organization id
                var succ = JSON.stringify(successResponse);
                // console.log(succ);
                var res = JSON.parse(succ);
                // console.log(res);
                var respon = res.response;
                let rr = JSON.parse(respon);
                //console.log(respon);
                var data1 = rr.data;
                var zoid = data1.zoid;
                orgid.push(data1);
                //var data =respon.data;
                console.log(zoid);

                //**  remove emails from whitelist   **
                AppSDK.dispatch("invokeUrl", {

                    xhrObj: {
                        "url": "https://mail.zoho.com/api/organization/" + zoid,
                        "type": "PUT",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "payload": {
                            "zoid": zoid,
                            "mode": "removeSpamCategory",
                            "spamVO": {
                                "spamCategory": "whiteListEmail",
                                "whiteListEmail": trimedemails
                            }
                        },

                        "serviceName": "spanmails"
                    }


                }).then(function(successResponse) {
                        // 

                        var suc = JSON.stringify(successResponse);
                        // console.log("remove block ",suc);
                        var par = JSON.parse(suc);
                        var responce = par.response;
                        let rr1 = JSON.parse(responce);

                        var status1 = rr1.status;
                        var code = status1.code;

                        if (code == 200) {
                            console.log("remove blocks", status1);

                            //** add email in blocklist **//

                            AppSDK.dispatch("invokeUrl", {

                                xhrObj: {
                                    "url": "https://mail.zoho.com/api/organization/" + zoid,
                                    "type": "PUT",
                                    "headers": {
                                        "Content-Type": "application/json"
                                    },
                                    "payload": {
                                        "zoid": zoid,
                                        "mode": "addSpamCategory",
                                        "spamVO": {
                                            "spamCategory": "blackListEmail",
                                            "blackListEmail": trimedemails
                                        }
                                    },

                                    "serviceName": "spanmails"
                                }


                            }).then(function(successResponse) {
                                    // 

                                    var suc = JSON.stringify(successResponse);
                                    //console.log(suc);
                                    var par = JSON.parse(suc);
                                    var responce = par.response;
                                    let rr1 = JSON.parse(responce);

                                    var status1 = rr1.status;
                                    var code = status1.code;

                                    if (code == 200 || code == 500) {
                                        console.log("successResponse", status1);

                                        console.log("successResponse", status1);
                                        document.getElementById("berror").style.display = "none";
                                        document.getElementById("bemaillab").style.display = "none";
                                        document.getElementById("bcontunue").style.display = "none";

                                        document.getElementById("bsucc").style.display = "block";
                                        document.getElementById("bsuut").style.display = "block";
                                        //    Occuring an error some times the email succefully blocklisted existed on webpages
                                        document.getElementById("bsuut").textContent = "Email Successfully Blocklisted";
                                        document.getElementById("bdomalab").textContent = '';
                                    } else {
                                        var data = rr1.data;
                                        var erro = data.moreInfo;

                                    }







                                },
                                function(errorResponse) {
                                    var err = JSON.stringify(errorResponse);
                                    console.log("error ", err);

                                }
                            )




                            //** end emails in whitelist **//



                        } else {
                            var data = rr1.data;
                            var erro = data.moreInfo;

                        }







                    },
                    function(errorResponse) {
                        var err = JSON.stringify(errorResponse);
                        console.log("error ", err);

                    }
                )


                //*end remove email from whitelist*//

                //** domains remove from whitelis **//
                //**  remove emails from whitelist   **
                AppSDK.dispatch("invokeUrl", {

                    xhrObj: {
                        "url": "https://mail.zoho.com/api/organization/" + zoid,
                        "type": "PUT",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "payload": {
                            "zoid": zoid,
                            "mode": "removeSpamCategory",
                            "spamVO": {
                                "spamCategory": "whiteListDomain",
                                "whiteListDomain": domains
                            }
                        },

                        "serviceName": "spanmails"
                    }


                }).then(function(successResponse) {
                    // 

                    var suc = JSON.stringify(successResponse);
                    // console.log("remove block ",suc);
                    var par = JSON.parse(suc);
                    var responce = par.response;
                    let rr1 = JSON.parse(responce);

                    var status1 = rr1.status;
                    var code = status1.code;

                    if (code == 200) {



                        //** domains block list **//

                        AppSDK.dispatch("invokeUrl", {

                            xhrObj: {
                                "url": "https://mail.zoho.com/api/organization/" + zoid,
                                "type": "PUT",
                                "headers": {
                                    "Content-Type": "application/json"
                                },
                                "payload": {
                                    "zoid": zoid,
                                    "mode": "addSpamCategory",
                                    "spamVO": {
                                        "spamCategory": "blackListDomain",
                                        "blackListDomain": domains
                                    }
                                },

                                "serviceName": "spanmails"
                            }


                        }).then(function(successResponse) {
                                // 

                                var suc = JSON.stringify(successResponse);
                                //console.log(suc);
                                var par = JSON.parse(suc);
                                var responce = par.response;
                                let rr1 = JSON.parse(responce);

                                var status1 = rr1.status;
                                var code = status1.code;
                                console.log("domain error ", rr1);
                                //   if (code == 500) {

                                //     document.getElementById("bcontunue").style.display = "block";
                                //     }

                                if (code == 200) {
                                    console.log("successResponse", status1);
                                    document.getElementById("bderror").style.display = "none";
                                    document.getElementById("bcontunue").style.display = "none";
                                    document.getElementById("bsuut").style.display = "block";
                                    
                                    document.getElementById("bsuut").textContent = " ";

                                    document.getElementById("bdsuut").style.display = "block";
                                    document.getElementById("bdomalab").style.display = "block";
                                    document.getElementById("bdsuut").textContent = "Successfully Blocklisted";
                                  

                                } else {
                                    var data = rr1.data;
                                      //document.getElementById("bsuut").style.display = "block";

                                }







                            },
                            function(errorResponse) {
                                //var err = JSON.stringify(errorResponse);
                                //console.log("error ", err);

                            }
                        )


                        //** end block list **//





                    }



                })





            },
            function(errorResponse) {
                // console.log(JSON.stringify(errorResponse));


            }
        );








    }


    //** end blocklist

    /**
     *  Event to detect compose window open
     */
    // AppSDK.on("compose_open", () => {
    //     window.apiUtil.getComposeDetails().then((composeInfo) => {
    //         console.log(composeInfo);
    //         window.appView.populateCurrentComposeDetails(composeInfo);
    //     });
    // });

    /**
     *  Event to get saved draft content
     */

    AppSDK.on("draft_save", (draftContent) => {
        console.log(draftContent);
        window.appView.populateSavedDraftDetails(draftContent);
    });

    /**
     * Event to get dragged mail content
     */
    AppSDK.on("drop", function(dropInfo) {
        console.log(dropInfo);
        let data = dropInfo.data && dropInfo.data[0];
        if (dropInfo.type === "mail") {
            populateMailDetails(data);
            return;
        }
        window.appView.populateAttachmentDetails(dropInfo);
        if (!$("#attachmentInfo").find(".cs_accTitle").hasClass("active")) {
            $("#attachmentInfo").find(".cs_accTitle").click();
        }
    });

    /**
     * Event to detect preview mail close
     */
    AppSDK.on("mail_close", function() {
        window.appView.populateCurrentMailDetails({});
        window.appView.populateContactDetails();
        window.appView.populateRelationalData();
    });

    /**
     * Get the Night Mode and Font settings of the inbox, inside your application.
     */

    AppSDK.on("mail_setting", function(mailSettingsData) {
        console.log(mailSettingsData);
    });

    $(document).ready(function() {
        window.appView.bindAppEvents();
        window.appView.bindApiEvents();
    });


    // Connector error code
    function exit() {

        document.getElementById("notacess").style.display = "none";
        document.getElementById("connect").style.display = "none";
    }
    // function exit1() {
    //     location.replace("https://mail.zoho.com/zm/#settings/integrations-settings/DeveloperSpace/connectors")

    //      //document.getElementById("connect").style.display = "none";
    // }

    // Connector error code