new Vue({
    el: '#submit',
    delimiters: ["{[", "]}"],

    data() {
        return {
            taskdata :""
        }
    },
    methods: {
        buildJson(taskdata) {
            taskdata = taskdata.replace(/\s*/g,"");
            var regexIP = "(?<=ip:).*?(?=port)";
            var regexPort = "(?<=port:).*";
            var ip = taskdata.match(regexIP);
            var port = taskdata.match(regexPort);
            console.log(ip,port);
            let json = {"ips":ip[0].replace(" ",""),"ports":port[0].replace(" ",""),"speed":100}
            return json;
        },

       submitTask() {
          let data = this.buildJson(this.taskdata)
           axios.post('/api/createPortScanTask', data)
               .then(function (response) {
                   console.log(response.data)
               })
               .catch(function (error) {
                   console.log(error);
               });
          location.href = "/result"
       }
    },
    mounted () {
    }
});